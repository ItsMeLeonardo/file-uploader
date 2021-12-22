import { useCallback, useState } from 'react'

import DropZone from './components/DropZone'
import Filters from './components/Filters'
import FileList from './components/FileList'
import FilterableFilesTable from './components/FilterableFilesTable'
import FilterItem from './components/FilterItem'

const FILES = [
  {
    name: 'file1.txt',
    type: 'text/plain',
    size: '1.2 MB',
    status: 'completed',
  },
  {
    name: 'file2.png',
    type: 'image/png',
    size: '2.3 MB',
    status: 'completed',
  },
  {
    name: 'file3.mp4',
    type: 'video/mp4',
    size: '3.4 MB',
    status: 'completed',
  },
  {
    name: 'file4.pdf',
    type: 'application/pdf',
    size: '4.5 MB',
    status: 'completed',
  },
  {
    name: 'file5.mp3',
    type: 'audio/mp3',
    size: '5.6 MB',
    status: 'loading',
  },
]
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
    filter: (file) => file.type.includes('audio/'),
  },
]

function App() {
  const [filter, setFilter] = useState('All')
  const [files, setFiles] = useState(FILES)

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

  return (
    <section className="Section-grid">
      <header className="Logo">UpCloud</header>
      <DropZone addFile={addFile} />
      <FilterableFilesTable>
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
        <FileList files={filesToShow} deleteFile={deleteFile} />
      </FilterableFilesTable>
    </section>
  )
}

export default App
