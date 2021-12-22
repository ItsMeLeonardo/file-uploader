import { useState } from 'react'

import IconClose from '../icons/IconClose'
import IconSuccess from '../icons/IconSuccess'

const getStatus = (progress) => {
  if (progress === 100) {
    return 'completed'
  }
  if (progress !== undefined) {
    return 'loading'
  } else {
    return 'cancel'
  }
}

export default function FileItem({ name, progress, deleteFile }) {
  const [status, setStatus] = useState(getStatus(progress))
  const [progressValue, setProgressValue] = useState(progress)

  const classByStatus = {
    loading: '',
    completed: 'completed',
    cancel: 'cancel',
  }

  const handleCancel = () => {
    setStatus('cancel')
    setTimeout(() => {
      deleteFile({ name })
    }, 1000)
  }

  return (
    <li className={`File-item ${classByStatus[status]}`}>
      <div className="File-info">
        <h2 className="File-text">{name}</h2>
        <span className="File-progress">{progressValue}%</span>
        <button className="File-detail btn btn-text">Details</button>

        {status === 'completed' ? (
          <IconSuccess className="File-icon" color="#44D937" />
        ) : (
          <div role="button" onClick={handleCancel}>
            <IconClose className="File-icon" color="#D9376E" />
          </div>
        )}
      </div>
      <div className="progress-bar">
        <span className="bar" style={{ '--progress': `${progressValue}%` }} />
      </div>
    </li>
  )
}
