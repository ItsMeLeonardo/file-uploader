import { CSSProperties, DragEvent, ReactNode, useMemo, useState } from 'react'

import { Folder, FolderIcon } from '../../entities/Folder'
import IconGallery from '../icons/IconGallery'
import IconVideo from '../icons/IconVideo'
import IconDocument from '../icons/IconDocument'
import IconLayer from '../icons/IconLayer'

type Props = {
  folder: Folder
  fileCount: number
  isActive: boolean
  onEdit: (folder: Folder) => void
  onSelect: (folderId: string) => void
  onDropFile: (fileId: string) => void
}

const iconByType: Record<FolderIcon, ReactNode> = {
  gallery: <IconGallery />,
  video: <IconVideo />,
  document: <IconDocument />,
  layer: <IconLayer />,
}

export default function FolderItem({
  folder,
  fileCount,
  isActive,
  onEdit,
  onSelect,
  onDropFile,
}: Props) {
  const icon = useMemo(() => iconByType[folder.icon] || iconByType.gallery, [folder.icon])
  const [isDraggingOver, setIsDraggingOver] = useState(false)

  const folderStyle: CSSProperties = {
    ['--folder-color' as string]: folder.color,
  }

  const handleDragOver = (event: DragEvent<HTMLLIElement>) => {
    if (!event.dataTransfer.types.includes('text/x-file-id')) return
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
    setIsDraggingOver(true)
  }

  const handleDrop = (event: DragEvent<HTMLLIElement>) => {
    const fileId = event.dataTransfer.getData('text/x-file-id')
    setIsDraggingOver(false)
    if (!fileId) return
    event.preventDefault()
    onDropFile(fileId)
  }

  const handleDragLeave = () => setIsDraggingOver(false)

  return (
    <li
      className={`Folder-card ${isActive ? 'active' : ''} ${isDraggingOver ? 'drag-over' : ''}`}
      style={folderStyle}
      onClick={() => onSelect(folder.id)}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="Folder-visual">
        <span className="Folder-photo behind" />
        <span className="Folder-photo" />
        <div className="Folder-cover">
          <span className="Folder-tab" />
          <span className="Folder-icon" style={{ color: folder.color }}>
            {icon}
          </span>
        </div>
      </div>
      <div className="Folder-meta">
        <p className="Folder-name">{folder.name}</p>
        <div className="Folder-tags">
          {folder.tags.map((tag) => (
            <span key={tag} className="Folder-tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="Folder-actions">
          <span className="Folder-count">{fileCount} items</span>
          <button
            type="button"
            className="btn btn-text"
            onClick={(event) => {
              event.stopPropagation()
              onEdit(folder)
            }}
          >
            Configure
          </button>
        </div>
      </div>
    </li>
  )
}
