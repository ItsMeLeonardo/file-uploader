import { openDB } from 'idb'

const dbPromise = openDB('files', 1, {
  upgrade(db) {
    const store = db.createObjectStore('files', { keyPath: 'id', autoIncrement: true })
    store.createIndex('name', 'name', { unique: true })
  },
})

export const getFiles = async () => {
  const result = (await dbPromise).getAll('files')
  console.log('getFiles', await result)
  return await result
}
export const saveFile = async (file) => {
  const result = (await dbPromise).put('files', file)
}
export const updateService = async () => {
  const result = (await dbPromise).clear('files')
  console.log(await result)
}
