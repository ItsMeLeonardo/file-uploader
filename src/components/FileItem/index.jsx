import React, { useEffect, useState } from 'react'

import IconClose from '../icons/IconClose'
import IconSuccess from '../icons/IconSuccess'

const classByStatus = {
  loading: '',
  completed: 'completed',
  cancel: 'cancel',
}

function FileItem({ name, status, deleteFile, file, setCompleted }) {
  const [statusState, setStatusState] = useState(status || 'loading')
  const [progressValue, setProgressValue] = useState(status === 'completed' ? 100 : 0)

  useEffect(() => {
    if (typeof file !== 'object') return

    if (status === 'completed') return

    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)

    const getProgressPercent = (event) => {
      const progress = Math.round((event.loaded / event.total) * 100)

      setProgressValue(progress)
      if (progress === 100) {
        setStatusState('completed')
        setCompleted({ name })
      }
    }

    fileReader.addEventListener('progress', getProgressPercent)

    return () => fileReader.removeEventListener('progress', getProgressPercent)
  }, [])

  const handleCancel = () => {
    setStatusState('cancel')
    setTimeout(() => {
      deleteFile({ name })
    }, 1000)
  }

  return (
    <li className={`File-item ${classByStatus[statusState]}`}>
      <div className="File-info">
        <h2 className="File-text">{name}</h2>
        <span className="File-progress">{progressValue}%</span>
        <button className="File-detail btn btn-text">Details</button>

        {statusState === 'completed' ? (
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

export default React.memo(FileItem)
