import { useState } from 'react'

import FolderItem from '../FolderItem'
import FolderForm from '../FolderForm'
import { useFolder } from '../../store/folder'
import { useFile } from '../../store/file'
import { Folder } from '../../entities/Folder'

export default function FolderList() {
  const { folders, activeFolderId, setActiveFolder } = useFolder()
  const { moveFileToFolder, allFiles } = useFile()
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null)

  const handleSelect = (folderId: string) => {
    setActiveFolder(activeFolderId === folderId ? null : folderId)
  }

  const handleConfigure = (folder: Folder) => setEditingFolder(folder)

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
          <button className="btn btn-text" type="button" onClick={() => setEditingFolder(null)}>
            New folder
          </button>
        </div>
      </header>
      <FolderForm folder={editingFolder} onSaved={() => setEditingFolder(null)} />
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
    </section>
  )
}
