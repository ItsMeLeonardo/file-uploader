import React from 'react'

import IconClose from '../icons/IconClose'
import IconSuccess from '../icons/IconSuccess'
import { useSaveFileCloud } from '../../hooks/useSaveFileCloud'

const classByStatus = {
  loading: '',
  completed: 'completed',
  cancel: 'cancel',
}

function FileItem({ fileItem, seeDetail }) {
  const {
    progressValue,
    statusState,
    cancelUpload: handleCancel,
  } = useSaveFileCloud({ fileItem })

  return (
    <li className={`File-item ${classByStatus[statusState]}`}>
      <div className="File-info">
        <h2 className="File-text">{fileItem.name}</h2>
        <span className="File-progress">{progressValue}%</span>
        <button className="File-detail btn btn-text" onClick={() => seeDetail(fileItem)}>
          Details
        </button>

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
