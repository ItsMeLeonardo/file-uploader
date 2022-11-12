import { ReactNode } from 'react'

type Props = {
  children: ReactNode | ReactNode[]
  clearComplete: () => void
}

export default function FilterableFilesTable({ children, clearComplete }: Props) {
  const handleClick = () => {
    clearComplete()
  }

  return (
    <aside className="layout FilterableFiles-content">
      <header className="FilterableFiles-header">
        <span className="FilterableFiles-text">Files</span>
        <button className="btn btn-text" onClick={handleClick}>
          Clear completed
        </button>
      </header>
      {children}
    </aside>
  )
}
