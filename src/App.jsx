import { useState } from 'react'
import { useFiles } from './hooks/useFiles'

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
  const { files, deleteFromService, clearFiles, addFile } = useFiles()

  const filesToShow = files.filter(FILTERS[filter])

  return (
    <section className="Section-grid">
      <header className="Logo">UpCloud</header>

      <DropZone addFile={addFile} />

      <FilterableFilesTable clearComplete={clearFiles}>
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
        <FileList files={filesToShow} deleteFile={deleteFromService} />
      </FilterableFilesTable>
    </section>
  )
}

export default App
