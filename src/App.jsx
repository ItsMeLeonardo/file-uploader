import IconAll from './components/icons/IconAll'
import IconVideo from './components/icons/IconVideo'
import IconClose from './components/icons/IconClose'
import IconSuccess from './components/icons/IconSuccess'

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
            <IconAll className="Filter-icon" color="rgb(255, 142, 60)" />
            <span className="Filter-text">All</span>
          </li>
          <li className="Filter-item">
            <IconVideo className="Filter-icon" color="#2a2a2a" />
            <span className="Filter-text">Videos</span>
          </li>
        </ul>

        <ul className="Files">
          <li className="File-item">
            <div className="File-info">
              <h2 className="File-text">File name</h2>
              <span className="File-progress">80%</span>
              <button className="File-detail btn btn-text">Details</button>
              <IconClose className="File-icon" color="#D9376E" />
            </div>
            <div className="progress-bar">
              <span className="bar" />
            </div>
          </li>
          <li className="File-item completed">
            <div className="File-info">
              <h2 className="File-text">A very large name :D</h2>
              <span className="File-progress">80%</span>
              <button className="File-detail btn btn-text">Details</button>
              <IconSuccess className="File-icon" color="#44D937" />
            </div>
            <div className="progress-bar">
              <span className="bar" />
            </div>
          </li>
          <li className="File-item completed">
            <div className="File-info">
              <h2 className="File-text">A very large name :D</h2>
              <span className="File-progress">80%</span>
              <button className="File-detail btn btn-text">Details</button>
              <IconSuccess className="File-icon" color="#44D937" />
            </div>
            <div className="progress-bar">
              <span className="bar" />
            </div>
          </li>
          <li className="File-item completed">
            <div className="File-info">
              <h2 className="File-text">A very large name :D</h2>
              <span className="File-progress">80%</span>
              <button className="File-detail btn btn-text">Details</button>
              <IconSuccess className="File-icon" color="#44D937" />
            </div>
            <div className="progress-bar">
              <span className="bar" />
            </div>
          </li>

          <li className="File-item completed">
            <div className="File-info">
              <h2 className="File-text">A very large name :D</h2>
              <span className="File-progress">80%</span>
              <button className="File-detail btn btn-text">Details</button>
              <IconSuccess className="File-icon" color="#44D937" />
            </div>
            <div className="progress-bar">
              <span className="bar" />
            </div>
          </li>

          <li className="File-item completed">
            <div className="File-info">
              <h2 className="File-text">A very large name :D</h2>
              <span className="File-progress">80%</span>
              <button className="File-detail btn btn-text">Details</button>
              <IconSuccess className="File-icon" color="#44D937" />
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
