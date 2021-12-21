import './App.css'

function App() {
  return (
    <section className="Section-grid">
      <header className="Logo">UpCloud</header>
      <form className="layout Drop-zone">
        <div className="Drop-content">
          <h2 className="Drop-text">Drag and drop your file here</h2>

          <p className="Drop-divider">
            <span>or</span>
          </p>

          <label htmlFor="file" className="Drop-label btn btn-gradient">
            Browse file
            <input type="file" name="file" id="file" hidden />
          </label>
        </div>
      </form>

      <aside className="layout FilterableFiles-content">
        <header className="FilterableFiles-header">
          <span className="FilterableFiles-text">Files</span>
          <button className="btn btn-text">Cancel all</button>
        </header>
        <ul className="Filters">
          <li className="Filter-item active">
            <i className="Filter-icon">icon</i>
            <span className="Filter-text">All</span>
          </li>
          <li className="Filter-item">
            <i className="Filter-icon">icon</i>
            <span className="Filter-text">All</span>
          </li>
        </ul>

        <ul className="Files">
          <li className="File-item">
            <div className="File-info">
              <h2 className="File-text">File name</h2>
              <span className="File-progress">80%</span>
              <button className="File-detail btn btn-text">Details</button>
              <i className="File-icon">icon</i>
            </div>
            <div className="progress-bar">
              <span className="bar" />
            </div>
          </li>
          <li className="File-item completed">
            <div className="File-info">
              <h2 className="File-text">File name</h2>
              <span className="File-progress">80%</span>
              <button className="File-detail btn btn-text">Details</button>
              <i className="File-icon">icon</i>
            </div>
            <div className="progress-bar">
              <span className="bar" />
            </div>
          </li>
        </ul>
      </aside>
    </section>
  )
}

export default App
