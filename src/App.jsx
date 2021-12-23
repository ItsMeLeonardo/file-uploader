import { useCallback, useEffect, useState } from 'react'

import DropZone from './components/DropZone'
import Filters from './components/Filters'
import FileList from './components/FileList'
import FilterableFilesTable from './components/FilterableFilesTable'
import FilterItem from './components/FilterItem'
import { useFile } from './hooks/useFile'

const FILTERS = [
  {
    name: 'All',
    filter: () => true,
  },
  {
    name: 'Images',
    filter: (file) => file.type.startsWith('image/'),
  },
  {
    name: 'Videos',
    filter: (file) => file.type.startsWith('video/'),
  },
  {
    name: 'Documents',
    filter: (file) => file.type.startsWith('application/'),
  },
  {
    name: 'Others',
    filter: (file) => file.type.includes('text/'),
  },
]

function App() {
  const [filter, setFilter] = useState('All')
  const { deleteFromService, getFiles } = useFile()
  const [files, setFiles] = useState([])

  useEffect(() => {
    getFiles().then((files) => setFiles(files))
  }, [])

  const filterFunc = FILTERS.find(({ name }) => name === filter).filter
  const filesToShow = files.filter(filterFunc)

  const deleteFile = useCallback(
    ({ name }) => {
      setFiles(files.filter((file) => file.name !== name))
    },
    [setFiles],
  )

  const addFile = (file) => {
    setFiles([...files, file])
  }

  const clearComplete = useCallback(() => {
    setFiles((prevFiles) =>
      prevFiles.filter(({ status }) => {
        return status !== 'completed'
      }),
    )
    deleteFromService(files)
  }, [])

  const setCompleted = useCallback(({ name }) => {
    setFiles((prevFiles) =>
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

  return (
    <section className="Section-grid">
      <header className="Logo">UpCloud</header>
      <DropZone addFile={addFile} />
      <FilterableFilesTable clearComplete={clearComplete}>
        <Filters>
          {FILTERS.map(({ name }) => (
            <FilterItem
              key={name}
              filterBy={setFilter}
              isActive={name === filter}
              name={name}
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
