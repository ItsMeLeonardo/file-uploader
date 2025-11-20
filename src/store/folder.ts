import create from 'zustand'
import { nanoid } from 'nanoid'

import { Folder } from '../entities/Folder'

const defaultFolders: Folder[] = [
  {
    id: nanoid(),
    name: 'Other photos',
    tags: ['247 photos', 'Family'],
    icon: 'gallery',
    color: '#d7e5ff',
  },
  {
    id: nanoid(),
    name: 'Projects',
    tags: ['Work', 'Design'],
    icon: 'layer',
    color: '#ffe6f1',
  },
  {
    id: nanoid(),
    name: 'Videos',
    tags: ['18 clips', 'Camera'],
    icon: 'video',
    color: '#fff0d7',
  },
  {
    id: nanoid(),
    name: 'Docs',
    tags: ['PDF', 'Invoices'],
    icon: 'document',
    color: '#e5f8f0',
  },
]

type State = {
  folders: Folder[]
  activeFolderId: string | null
}

type Actions = {
  addFolder: (folder: Folder) => void
  updateFolder: (folder: Folder) => void
  setActiveFolder: (folderId: string | null) => void
}

type FolderStore = State & Actions

const useFolderStore = create<FolderStore>((set) => ({
  folders: defaultFolders,
  activeFolderId: null,
  addFolder: (folder) => set((state) => ({ folders: [folder, ...state.folders] })),
  updateFolder: (folder) =>
    set((state) => ({
      folders: state.folders.map((item) => (item.id === folder.id ? folder : item)),
    })),
  setActiveFolder: (folderId) => set({ activeFolderId: folderId }),
}))

export const useFolder = () => useFolderStore()
