import { ReactNode } from 'react'
import { useFile } from '../../store/file'

type Props = {
  children: ReactNode | ReactNode[]
}

export default function FilterableFilesTable({ children }: Props) {
  const { removeCompletedFiles } = useFile()

  return (
    <aside className="layout FilterableFiles-content">
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
