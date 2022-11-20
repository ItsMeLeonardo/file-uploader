import { openDB } from 'idb'
import { FileUP } from '../entities/File'

const STORE_NAME = 'files'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const dbPromise = openDB('files', 1, {
  upgrade(db) {
    const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true })
    store.createIndex('name', 'name', { unique: true })
  },
})

export const getFiles = async (): Promise<FileUP[]> => {
  const result = (await dbPromise).getAll(STORE_NAME)
  const response = await result

  return response
}
export const saveFile = async (file: FileUP) => {
  const response = (await dbPromise).put(STORE_NAME, file)
  const result = await response
}
export const updateService = async () => {
  const response = (await dbPromise).clear(STORE_NAME)
  const result = await response
}

export const deleteFile = async (id: number | string) => {
  const response = (await dbPromise).delete(STORE_NAME, id)
  const result = await response
}
