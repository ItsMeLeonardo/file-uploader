import FolderItem from '../FolderItem'
import { useFolder } from '../../store/folder'

export default function FolderList() {
  const { folders } = useFolder()

  return (
    <section className="layout Folders">
      <header className="Folders-header">
        <div>
          <p className="Folders-title">Folders</p>
          <p className="Folders-subtitle">Group your files by color and tag</p>
        </div>
      </header>
      <ul className="Folders-list">
        {folders.map((folder) => (
          <FolderItem folder={folder} key={folder.id} />
        ))}
      </ul>
    </section>
  )
}
