import { useCallback, useEffect, useState } from 'react'
import { useFilesLocal } from './hooks/useFilesLocal'

import DropZone from './components/DropZone'
import Filters from './components/Filters'
import FileList from './components/FileList'
import FilterableFilesTable from './components/FilterableFilesTable'
import FilterItem from './components/FilterItem'

const FILTERS = {
  All: () => true,
  Images: (file) => file.type.startsWith('image/'),
  Videos: (file) => file.type.startsWith('video/'),
  Documents: (file) => file.type.startsWith('application/'),
  Others: (file) =>
    !file.type.startsWith('image/') &&
    !file.type.startsWith('video/') &&
    !file.type.startsWith('application/'),
}

function App() {
  const [filter, setFilter] = useState('All')
  const { deleteAllFromService, deleteFromService, getFiles } = useFilesLocal()
  const [files, setFiles] = useState([])

  // fixme: transform this into a hook
  useEffect(() => {
    getFiles().then((files) => setFiles(files))
  }, [])

  const filesToShow = files.filter(FILTERS[filter])

  // REMOVE THIS FROM ====
  const deleteFile = useCallback(
    ({ name, id }) => {
      setFiles(files.filter((file) => file.name !== name))
      deleteFromService({ id }) // remove from indexedDB
    },
    [files],
  )

  const addFile = (file) => {
    setFiles([...files, file]) // add to local state
  }

  const clearComplete = useCallback(() => {
    setFiles((prevFiles) =>
      prevFiles.filter(({ status }) => {
        return status !== 'completed'
      }),
    )
    deleteAllFromService() // delete from indexedDB
  }, [])

  // refactor this
  const setCompleted = useCallback(({ name }) => {
    setFiles(
      (
        prevFiles, // update status only in local state
      ) =>
        prevFiles.map((file) => {
          if (file.name === name) {
            return {
              ...file,
              status: 'completed',
            }
          }
          return file
        }),
    )
  }, [])

  // ======= Here ends the remove part

  return (
    <section className="Section-grid">
      <header className="Logo">UpCloud</header>

      <DropZone addFile={addFile} />

      <FilterableFilesTable clearComplete={clearComplete}>
        <Filters>
          {Object.keys(FILTERS).map((filterName) => (
            <FilterItem
              key={filterName}
              filterBy={setFilter}
              isActive={filterName === filter}
              name={filterName}
            />
          ))}
        </Filters>
        <FileList
          files={filesToShow}
          deleteFile={deleteFile}
          setCompleted={setCompleted}
        />
      </FilterableFilesTable>
    </section>
  )
}

export default App
