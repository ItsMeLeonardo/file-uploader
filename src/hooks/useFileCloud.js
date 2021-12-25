import { useEffect, useState } from 'react'
import { saveFile } from '../services/filesCloud'

export function useFileCloud({ fileItem, setCompleted, deleteFile } = {}) {
  const { name, status, file } = fileItem

  const [progressValue, setProgressValue] = useState(0)
  const [statusState, setStatusState] = useState(status || 'loading')

  useEffect(() => {
    if (typeof file !== 'object') return

    if (status === 'completed' || progressValue >= 100) return

    const fileData = new FormData()
    fileData.append('file', file)

    saveFile(fileData, setProgressValue)?.then(() => {
      setStatusState('completed')
      setCompleted({ name })
    })
  }, [])

  const cancelUpload = () => {
    setStatusState('cancel')
    setTimeout(() => {
      deleteFile({ name })
    }, 1000)
  }

  return {
    progressValue,
    statusState,
    cancelUpload,
  }
}
