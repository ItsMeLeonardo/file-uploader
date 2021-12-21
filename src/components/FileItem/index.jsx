import IconClose from '../icons/IconClose'
import IconSuccess from '../icons/IconSuccess'

export default function FileItem({ isCompleted, name, progress }) {
  return (
    <li className={`File-item ${isCompleted ? 'completed' : ''}`}>
      <div className="File-info">
        <h2 className="File-text">{name}</h2>
        <span className="File-progress">{progress}</span>
        <button className="File-detail btn btn-text">Details</button>
        {isCompleted ? (
          <IconSuccess className="File-icon" color="#44D937" />
        ) : (
          <IconClose className="File-icon" color="#D9376E" />
        )}
      </div>
      <div className="progress-bar">
        <span className="bar" style={{ '--progress': progress }} />
      </div>
    </li>
  )
}
