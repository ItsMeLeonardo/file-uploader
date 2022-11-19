import create from 'zustand'
import shallow from 'zustand/shallow'
import { mountStoreDevtool } from 'simple-zustand-devtools'

import { nanoid } from 'nanoid'

import { FileUP, FileStatus } from '../entities/File'
import { getFilterFunc } from '../entities/Filter'
import { useFilter } from './filter'

type State = {
  files: FileUP[]
}

type Actions = {
  addFile: (file: FileUP) => void
  removeFile: (id: string) => void
  setFileState: (id: string, status: FileStatus) => void
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
  setFileState: (id: string, status: FileStatus) => {
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
}))

const extractor = (state: FileStore): FileStore => ({
  files: state.files,
  addFile: state.addFile,
  removeFile: state.removeFile,
  setFileState: state.setFileState,
  getFileById: state.getFileById,
  loadFile: state.loadFile,
})

export const useFile = () => {
  //TODO: integrate with service
  const { filter } = useFilter()
  const store = useFileStore(extractor, shallow)

  const files = store.files.filter(({ file }) => {
    const filterFunc = getFilterFunc(filter)
    const fileType = file.type
    return filterFunc(fileType)
  })

  const addFile = (file: File) => {
    const fileUP: FileUP = {
      id: nanoid(),
      file,
      name: file.name,
      status: 'loading',
    }
    store.addFile(fileUP)
  }

  const removeFile = (id: string) => {
    store.removeFile(id)
  }

  const removeCompletedFiles = () => {
    store.files.forEach((file) => {
      if (file.status === 'completed') {
        store.removeFile(file.id)
      }
    })
  }

  const getFileById = (id: string) => {
    return store.getFileById(id)
  }

  const loadFile = (id: string, url: string, thumbnail?: string) => {
    try {
      store.loadFile(id, url, thumbnail)
    } catch (error) {
      store.setFileState(id, 'error')
    }
  }

  return {
    files,
    addFile,
    removeFile,
    getFileById,
    removeCompletedFiles,
    loadFile,
  }
}

if (import.meta.env.DEV) {
  mountStoreDevtool('File', useFileStore)
}
