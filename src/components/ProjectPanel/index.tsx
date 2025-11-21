import { ChangeEvent, useMemo, useRef, useState } from 'react'

import { useFolder } from '../../store/folder'
import { useFile } from '../../store/file'
import FolderForm from '../FolderForm'
import ModalContainer from '../Modal'
import IconClose from '../icons/IconClose'
import IconUpload from '../icons/IconUpload'

export default function ProjectPanel() {
  const { folders, activeFolderId } = useFolder()
  const { addFileToFolder } = useFile()

  const activeFolder = useMemo(
    () => folders.find((folder) => folder.id === activeFolderId),
    [folders, activeFolderId]
  )

  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!activeFolder) return
    const files = event.target.files
    if (!files?.length) return

    addFileToFolder(Array.from(files), activeFolder.id)
    event.target.value = ''
  }

  if (!activeFolder) {
    return (
      <div className="Project-panel empty">
        <p className="Project-empty-title">Select a project to manage uploads</p>
        <p className="Project-empty-subtitle">
          Choose a folder card to see its build, edit details, and upload files directly into it.
        </p>
      </div>
    )
  }

  return (
    <div className="Project-panel" style={{ ['--project-color' as string]: activeFolder.color }}>
      <div className="Project-panel-header">
        <div>
          <p className="Project-panel-label">Project build</p>
          <div className="Project-panel-title-row">
            <span className="Project-panel-dot" />
            <h3 className="Project-panel-title">{activeFolder.name}</h3>
          </div>
          <p className="Project-panel-build">{activeFolder.build}</p>
          <div className="Project-panel-tags">
            {activeFolder.tags.map((tag) => (
              <span key={tag} className="Project-panel-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="Project-panel-actions">
          <button className="btn btn-secondary" type="button" onClick={() => setIsEditing(true)}>
            Edit project
          </button>
        </div>
      </div>
      <div className="Project-panel-footer">
        <div>
          <p className="Project-panel-footer-title">Upload files to this project</p>
          <p className="Project-panel-footer-subtitle">
            Files dropped here are automatically tied to <strong>{activeFolder.name}</strong>.
          </p>
          <div className="Project-panel-buttons">
            <button className="btn btn-text" type="button" onClick={() => inputRef.current?.click()}>
              <IconUpload />
              Add files
            </button>
            <p className="Project-panel-helper">You can still drag from the list to other folders.</p>
          </div>
        </div>
        <input ref={inputRef} type="file" multiple className="sr-only" onChange={handleUpload} />
      </div>

      {isEditing && (
        <ModalContainer onClick={() => setIsEditing(false)}>
          <div className="Folder-modal" onClick={(event) => event.stopPropagation()}>
            <div className="Folder-modal-header">
              <p className="Folder-modal-title">Edit project</p>
              <button
                className="Folder-modal-close"
                type="button"
                onClick={() => setIsEditing(false)}
                aria-label="Close"
              >
                <IconClose />
              </button>
            </div>
            <FolderForm folder={activeFolder} onSaved={() => setIsEditing(false)} onCancel={() => setIsEditing(false)} />
          </div>
        </ModalContainer>
      )}
    </div>
  )
}
