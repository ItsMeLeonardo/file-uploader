import { CSSProperties, ReactNode, useMemo } from 'react'

import { Folder, FolderIcon } from '../../entities/Folder'
import IconGallery from '../icons/IconGallery'
import IconVideo from '../icons/IconVideo'
import IconDocument from '../icons/IconDocument'
import IconLayer from '../icons/IconLayer'

type Props = {
  folder: Folder
}

const iconByType: Record<FolderIcon, ReactNode> = {
  gallery: <IconGallery />,
  video: <IconVideo />,
  document: <IconDocument />,
  layer: <IconLayer />,
}

export default function FolderItem({ folder }: Props) {
  const icon = useMemo(() => iconByType[folder.icon] || iconByType.gallery, [folder.icon])

  const folderStyle: CSSProperties = {
    ['--folder-color' as string]: folder.color,
  }

  return (
    <li className="Folder-card" style={folderStyle}>
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
      </div>
    </li>
  )
}
