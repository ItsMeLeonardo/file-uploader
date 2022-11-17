import React, { useEffect, useState } from 'react'
import { FileUP } from '../../entities/File'
import { useFile } from '../../store/file'
import { generateVideoThumbnail } from '../../utils/video'

import IconClose from '../icons/IconClose'
import IconSuccess from '../icons/IconSuccess'

const classByStatus: any = {
  loading: '',
  completed: 'completed',
  cancel: 'cancel',
}

type Props = {
  fileItem: FileUP
  seeDetail: () => void
}

export default function FileItem({ fileItem, seeDetail }: Props) {
  const { loadFile } = useFile()

  const { name, status, file, id } = fileItem

  const [progressValue, setProgressValue] = useState(status === 'completed' ? 100 : 0)

  useEffect(() => {
    // If the file is already saved in the db, we don't need to do anything

    if (typeof file !== 'object') return

    if (status === 'completed' || progressValue >= 100) return

    const getProgressPercent = (event: ProgressEvent<FileReader>) => {
      const progress = Math.round((event.loaded / event.total) * 100)
      setProgressValue(progress)
    }

    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)

    const handleLoadFile = async () => {
      const url = fileReader.result
      let thumbnail = typeof url === 'string' ? url : undefined
      if (file.type.includes('video')) {
        thumbnail = await generateVideoThumbnail(file)
      }
      if (url && typeof url === 'string') {
        loadFile(id, url, thumbnail)
      }
    }

    fileReader.addEventListener('progress', getProgressPercent)

    fileReader.addEventListener('load', handleLoadFile)

    return () => {
      fileReader.removeEventListener('progress', getProgressPercent)
      fileReader.removeEventListener('load', handleLoadFile)
    }
  }, [])

  const handleCancel = () => {
    console.log('cancel')
  }

  return (
    <li className={`File-item ${classByStatus[status]}`}>
      <div className="File-info">
        <h2 className="File-text">{name}</h2>
        <span className="File-progress">{progressValue}%</span>
        <button className="File-detail btn btn-text" onClick={seeDetail}>
          Details
        </button>

        {status === 'completed' ? (
          <span className="icon-success">
            <IconSuccess />
          </span>
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
