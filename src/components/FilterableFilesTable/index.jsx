export default function FilterableFilesTable({ children }) {
  return (
    <aside className="layout FilterableFiles-content">
      <header className="FilterableFiles-header">
        <span className="FilterableFiles-text">Files</span>
        <button className="btn btn-text">Cancel all</button>
      </header>
      {children}
    </aside>
  )
}
