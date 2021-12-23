import { useState, useCallback, useEffect } from 'react'

import { getFiles, updateService, saveFile } from '../services/files'

export const useFile = () => {
  const [files, setFiles] = useState([])

  // useEffect(() => {
  //   if (files.length === 0) {
  //     getFiles().then(setFiles)
  //     console.log({ files })
  //   }
  // }, [files])

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
