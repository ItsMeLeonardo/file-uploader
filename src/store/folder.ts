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
}

type Actions = {
  addFolder: (folder: Folder) => void
}

type FolderStore = State & Actions

const useFolderStore = create<FolderStore>((set) => ({
  folders: defaultFolders,
  addFolder: (folder) => set((state) => ({ folders: [folder, ...state.folders] })),
}))

export const useFolder = () => useFolderStore()
