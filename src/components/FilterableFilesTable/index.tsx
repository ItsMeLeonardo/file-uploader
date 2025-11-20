import { DragEvent, ReactNode, useState } from 'react'

import { useFile } from '../../store/file'

type Props = {
  children: ReactNode | ReactNode[]
}

export default function FilterableFilesTable({ children }: Props) {
  const { removeCompletedFiles, moveFileToFolder } = useFile()
  const [isDropTarget, setIsDropTarget] = useState(false)

  const acceptsDrag = (event: DragEvent) =>
    event.dataTransfer.types.includes('text/x-file-id')

  const handleDragOver = (event: DragEvent<HTMLElement>) => {
    if (!acceptsDrag(event)) return
    event.preventDefault()
    setIsDropTarget(true)
  }

  const handleDrop = (event: DragEvent<HTMLElement>) => {
    const fileId = event.dataTransfer.getData('text/x-file-id')
    if (!fileId) return
    event.preventDefault()
    moveFileToFolder(fileId, null)
    setIsDropTarget(false)
  }

  const handleDragLeave = () => setIsDropTarget(false)

  return (
    <aside
      className={`layout FilterableFiles FilterableFiles-content ${
        isDropTarget ? 'dropping' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <header className="FilterableFiles-header">
        <span className="FilterableFiles-text">Files</span>
        <button className="btn btn-text" onClick={removeCompletedFiles}>
          Clear completed
        </button>
      </header>
      {children}
    </aside>
  )
}
