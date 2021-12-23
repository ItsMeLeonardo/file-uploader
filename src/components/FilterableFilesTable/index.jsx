export default function FilterableFilesTable({ children, clearComplete }) {
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
