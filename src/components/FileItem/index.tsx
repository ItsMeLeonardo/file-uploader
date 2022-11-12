import React, { useEffect, useState } from 'react'
import { FileUP } from '../../entities/File'

import IconClose from '../icons/IconClose'
import IconSuccess from '../icons/IconSuccess'

const classByStatus: any = {
  loading: '',
  completed: 'completed',
  cancel: 'cancel',
}

type Props = {
  fileItem: FileUP
  deleteFile: (params: any) => void
  setCompleted: (params: any) => void
  saveFile: (params: any) => void
  seeDetail: () => void
}

function FileItem({ fileItem, deleteFile, setCompleted, saveFile, seeDetail }: Props) {
  const { name, status, file, id } = fileItem

  const [statusState, setStatusState] = useState(status || 'loading')
  const [progressValue, setProgressValue] = useState(status === 'completed' ? 100 : 0)

  useEffect(() => {
    // If the file is already saved in the db, we don't need to do anything
    if (id) return

    if (typeof file !== 'object') return

    if (status === 'completed' || progressValue >= 100) return

    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)

    const getProgressPercent = (event: ProgressEvent<FileReader>) => {
      const progress = Math.round((event.loaded / event.total) * 100)
      setProgressValue(progress)
    }

    const handleLoadFile = () => {
      setStatusState('completed')
      const url = fileReader.result
      setCompleted({ name, url })

      saveFile(fileItem)
    }

    fileReader.addEventListener('progress', getProgressPercent)

    fileReader.addEventListener('load', handleLoadFile)

    return () => {
      fileReader.removeEventListener('progress', getProgressPercent)
      fileReader.removeEventListener('load', handleLoadFile)
    }
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
        <button className="File-detail btn btn-text" onClick={seeDetail}>
          Details
        </button>

        {statusState === 'completed' ? (
          <IconSuccess />
        ) : (
          <div role="button" onClick={handleCancel}>
            <IconClose />
          </div>
        )}
      </div>
      <div className="progress-bar">
        {/* @ts-ignore: Unreachable code */}
        <span className="bar" style={{ '--progress': `${progressValue}%` }} />
      </div>
    </li>
  )
}

export default React.memo(FileItem)