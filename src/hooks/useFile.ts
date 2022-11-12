import { useState, useCallback } from 'react'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FileUP } from '../entities/File'

import { getFiles, updateService, saveFile, deleteFile } from '../services/files'

export const useFile = () => {
  const [files] = useState([])

  const saveInService = useCallback((file: FileUP) => {
    saveFile(file)
      .then(() => {
        toast.success('File saved successfully')
      })
      .catch(() => {
        toast.error('Error saving file')
      })
  }, [])

  const deleteAllFromService = useCallback(() => {
    updateService()
      .then(() => {
        toast.success('All files deleted successfully')
      })
      .catch(() => {
        toast.error('Error deleting files')
      })
  }, [])

  const deleteFromService = (id: string | number) => {
    if (!id) {
      toast.error('Error deleting file')
      return
    }
    deleteFile(id)
      .then(() => {
        toast.success('File deleted successfully')
      })
      .catch(() => {
        toast.error('Error deleting file')
      })
  }

  return {
    files,
    deleteAllFromService,
    saveInService,
    getFiles,
    deleteFromService,
  }
}
