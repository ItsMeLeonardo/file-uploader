import { useState, useCallback } from 'react'

import { getFiles, updateService, saveFile, deleteFile } from '../services/files'

export const useFilesLocal = () => {
  const [files] = useState([])

  const saveInService = useCallback((file, setProgressValue) => {
    saveFile(file).then().catch(console.log)
  }, [])

  const deleteAllFromService = useCallback(() => {
    updateService().then().then(console.log)
  }, [])

  const deleteFromService = ({ id }) => {
    deleteFile(id).then().then(console.log)
  }

  return {
    files,
    deleteAllFromService,
    saveInService,
    getFiles,
    deleteFromService,
  }
}
