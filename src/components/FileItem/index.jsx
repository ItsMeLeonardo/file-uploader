import IconClose from '../icons/IconClose'

export default function FileItem({ className }) {
  return (
    <li className={`File-item ${className}`}>
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
  )
}
