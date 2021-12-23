import { useState, useCallback } from 'react'

import { getFiles, updateService, saveFile } from '../services/files'

export const useFile = () => {
  const [files] = useState([])

  const saveInService = useCallback((file) => {
    saveFile(file).then().catch(console.log)
  }, [])

  const deleteFromService = useCallback((filesList) => {
    updateService(filesList).then().then(console.log)
  }, [])

  return {
    files,
    deleteFromService,
    saveInService,
    getFiles,
  }
}
