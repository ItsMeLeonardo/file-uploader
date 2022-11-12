import { openDB } from 'idb'
import { FileUP } from '../entities/File'

const STORE_NAME = 'files'

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
  const result = (await dbPromise).put(STORE_NAME, file)
}
export const updateService = async () => {
  const result = (await dbPromise).clear(STORE_NAME)
  console.log(await result)
}

export const deleteFile = async (id: number | string) => {
  const result = (await dbPromise).delete(STORE_NAME, id)
  console.log(await result)
}
