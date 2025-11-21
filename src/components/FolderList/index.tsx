import { useState } from 'react'

import FolderItem from '../FolderItem'
import FolderForm from '../FolderForm'
import { useFolder } from '../../store/folder'
import { useFile } from '../../store/file'
import { Folder } from '../../entities/Folder'
import ModalContainer from '../Modal'
import IconClose from '../icons/IconClose'

export default function FolderList() {
  const { folders, activeFolderId, setActiveFolder } = useFolder()
  const { moveFileToFolder, allFiles } = useFile()
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleSelect = (folderId: string) => {
    setActiveFolder(activeFolderId === folderId ? null : folderId)
  }

  const handleConfigure = (folder: Folder) => {
    setEditingFolder(folder)
    setIsFormOpen(true)
  }

  const handleNewFolder = () => {
    setEditingFolder(null)
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setEditingFolder(null)
  }

  const folderCounts = folders.reduce<Record<string, number>>((acc, folder) => {
    acc[folder.id] = allFiles.filter((file) => file.folderId === folder.id).length
    return acc
  }, {})

  return (
    <section className="layout Folders">
      <header className="Folders-header">
        <div>
          <p className="Folders-title">Folders</p>
          <p className="Folders-subtitle">Group your files by color and tag</p>
        </div>
        <div className="Folders-actions">
          <p className="Folders-hint">Drag files onto a folder to move them</p>
          <button className="btn btn-text" type="button" onClick={handleNewFolder}>
            New folder
          </button>
        </div>
      </header>
      <ul className="Folders-list">
        {folders.map((folder) => (
          <FolderItem
            folder={folder}
            key={folder.id}
            isActive={activeFolderId === folder.id}
            onSelect={handleSelect}
            onEdit={handleConfigure}
            fileCount={folderCounts[folder.id] ?? 0}
            onDropFile={(fileId) => moveFileToFolder(fileId, folder.id)}
          />
        ))}
      </ul>
      {isFormOpen && (
        <ModalContainer onClick={handleCloseForm}>
          <div className="Folder-modal" onClick={(event) => event.stopPropagation()}>
            <div className="Folder-modal-header">
              <p className="Folder-modal-title">{editingFolder ? 'Edit folder' : 'Create a folder'}</p>
              <button className="Folder-modal-close" type="button" onClick={handleCloseForm} aria-label="Close">
                <IconClose />
              </button>
            </div>
            <FolderForm folder={editingFolder} onSaved={handleCloseForm} onCancel={handleCloseForm} />
          </div>
        </ModalContainer>
      )}
    </section>
  )
}
