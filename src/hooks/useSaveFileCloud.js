import { useEffect, useState } from 'react'
import { saveFile } from '../services/filesCloud'
import { useFiles } from './useFiles'

export function useSaveFileCloud({ fileItem }) {
  const { status, file } = fileItem
  const [progressValue, setProgressValue] = useState(status === 'completed' ? 100 : 0)
  const [statusState, setStatusState] = useState(status || 'loading')
  const { addFile } = useFiles()

  useEffect(() => {
    if (typeof file !== 'object') return

    if (status === 'completed' || progressValue >= 100) return

    const fileData = new FormData()
    fileData.append('file', file)
    saveFile(fileData, setProgressValue)?.then(({ id }) => {
      setStatusState('completed')
      addFile({
        ...fileItem,
        id,
        status: 'completed',
      })
    })
  }, [])

  // const cancelUpload = () => {
  //   setStatusState('cancel')
  //   setTimeout(() => {
  //     deleteFile({ name })
  //   }, 1000)
  // }

  return {
    progressValue,
    statusState,
  }
}
