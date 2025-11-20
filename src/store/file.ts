import create from 'zustand'
import shallow from 'zustand/shallow'
import { mountStoreDevtool } from 'simple-zustand-devtools'

import { nanoid } from 'nanoid'

import { FileUP, FileStatus } from '../entities/File'
import { getFilterFunc } from '../entities/Filter'
import { useFilter } from './filter'
import { useFolder } from './folder'

import * as service from '../services/files'

type State = {
  files: FileUP[]
}

type Actions = {
  setFiles: (files: FileUP[]) => void
  addFile: (file: FileUP) => void
  addMultipleFiles: (files: FileUP[]) => void
  removeFile: (id: string) => void
  setFileStatus: (id: string, status: FileStatus) => void
  setFileFolder: (id: string, folderId: string | null) => void
  loadFile: (id: string, url: string, thumbnail?: string) => void
  getFileById: (id: string) => FileUP | undefined
}

type FileStore = State & Actions

const useFileStore = create<FileStore>((set, get) => ({
  files: [],
  addFile: (file: FileUP) => {
    const { files } = get()
    set({ files: [file, ...files] })
  },
  addMultipleFiles: (files: FileUP[]) => {
    const { files: currentFiles } = get()
    set({ files: [...files, ...currentFiles] })
  },
  setFileStatus: (id: string, status: FileStatus) => {
    const { files } = get()
    const newFiles = files.map((file) => {
      if (file.id === id) {
        return { ...file, status }
      }
      return file
    })
    set({ files: newFiles })
  },
  removeFile: (id) => {
    const { files } = get()
    const newFiles = files.filter((file) => file.id !== id)
    set({ files: newFiles })
  },
  setFileFolder: (id, folderId) => {
    const { files } = get()
    const newFiles = files.map((file) =>
      file.id === id ? { ...file, folderId } : file
    )
    set({ files: newFiles })
  },
  getFileById: (id) => {
    const { files } = get()
    return files.find((file) => file.id === id)
  },
  loadFile: (id, url, thumbnail) => {
    const { files } = get()
    const newFiles = files.map((file) => {
      if (file.id === id) {
        return { ...file, status: 'completed', url, thumbnail } as FileUP
      }
      return file
    })
    set({ files: newFiles })
  },
  setFiles: (files) => {
    set({ files })
  },
}))

const extractor = (state: FileStore): FileStore => ({
  files: state.files,
  addFile: state.addFile,
  addMultipleFiles: state.addMultipleFiles,
  removeFile: state.removeFile,
  setFileStatus: state.setFileStatus,
  setFileFolder: state.setFileFolder,
  getFileById: state.getFileById,
  loadFile: state.loadFile,
  setFiles: state.setFiles,
})

const createFileUP = (file: File): FileUP => {
  const fileUP: FileUP = {
    id: nanoid(),
    file,
    name: file.name,
    status: 'loading',
    folderId: null,
  }
  return fileUP
}

export const useFile = () => {
  const { filter } = useFilter()
  const { activeFolderId } = useFolder()
  const store = useFileStore(extractor, shallow)

  const files = store.files.filter(({ file, folderId }) => {
    const filterFunc = getFilterFunc(filter)
    const fileType = file.type
    const passesFilter = filterFunc(fileType)
    const matchesFolderFilter = activeFolderId ? folderId === activeFolderId : true

    return passesFilter && matchesFolderFilter
  })

  const setInitialState = async () => {
    const files = await service.getFiles()
    const normalizedFiles = files.map((file) => ({
      ...file,
      folderId: file.folderId ?? null,
    }))
    store.setFiles(normalizedFiles)
  }

  const addFile = (file: File[] | File) => {
    if (!Array.isArray(file)) {
      const fileUP = createFileUP(file)
      store.addFile(fileUP)
      return
    }
    if (file.length === 1) {
      const fileUP = createFileUP(file[0])
      store.addFile(fileUP)
      return
    }
    const files = file.map((file) => {
      return createFileUP(file)
    })

    store.addMultipleFiles(files)
  }

  const removeFile = (id: string) => {
    store.removeFile(id)
    service.deleteFile(id)
  }

  const removeCompletedFiles = () => {
    store.files.forEach((file) => {
      if (file.status === 'completed') {
        store.removeFile(file.id)
        service.deleteFile(file.id)
      }
    })
  }

  const getFileById = (id: string) => {
    return store.getFileById(id)
  }

  const loadFile = (id: string, url: string, thumbnail?: string) => {
    try {
      store.loadFile(id, url, thumbnail)
      const file = store.getFileById(id)
      if (file) service.saveFile(file)
    } catch (error) {
      store.setFileStatus(id, 'error')
    }
  }

  const moveFileToFolder = (id: string, folderId: string | null) => {
    store.setFileFolder(id, folderId)
    const file = store.getFileById(id)
    if (file) service.saveFile(file)
  }

  return {
    files,
    allFiles: store.files,
    addFile,
    removeFile,
    getFileById,
    removeCompletedFiles,
    loadFile,
    moveFileToFolder,
    setInitialState,
  }
}

if (import.meta.env.DEV) {
  mountStoreDevtool('File', useFileStore)
}
