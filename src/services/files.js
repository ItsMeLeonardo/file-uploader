import { openDB } from 'idb'

const STORE_NAME = 'files'

const dbPromise = openDB('files', 1, {
  upgrade(db) {
    const store = db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true })
    store.createIndex('name', 'name', { unique: true })
  },
})

export const getFiles = async () => {
  const result = (await dbPromise).getAll(STORE_NAME)
  const response = await result
  console.log('getFiles', response)
  return response
}
export const saveFile = async (file) => {
  const result = (await dbPromise).put(STORE_NAME, file)
}
export const updateService = async () => {
  const result = (await dbPromise).clear(STORE_NAME)
  console.log(await result)
}

export const deleteFile = async (id) => {
  const result = (await dbPromise).delete(STORE_NAME, id)
  console.log(await result)
}
