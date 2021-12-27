import { useState, useCallback, useEffect } from 'react'

import {
  deleteFile,
  deleteAll,
  getFilesDebounced as getFiles,
} from '../services/filesCloud'

// this is correct ? :/
let firstCallApi = false

export const useFiles = () => {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (firstCallApi) return

    setLoading(true)
    getFiles()
      .then((response) => {
        if (!response.url) return
        setFiles(response.url)
        firstCallApi = true
      })
      .finally(() => setLoading(false))
  }, [])

  const deleteFromService = useCallback(({ id }) => {
    deleteFile({ id }).then(() => {
      setFiles((prevFiles) => prevFiles.filter((prevFile) => prevFile.id !== id))
    })
  }, [])

  const clearFiles = useCallback(() => {
    deleteAll().then(() => {
      setFiles((prevFiles) => prevFiles.filter(({ status }) => status !== 'completed'))
    })
  }, [])

  const addFile = useCallback((file) => {
    setFiles((prevFiles) => [...prevFiles, file])
  }, [])

  return {
    files,
    deleteFromService,
    clearFiles,
    loading,
    addFile,
  }
}
