import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'

import DropZone from './components/DropZone'
import FiltersList from './components/FilterList'
import FileList from './components/FileList'
import FilterableFilesTable from './components/FilterableFilesTable'
import { useFile } from './store/file'

export default function App() {
  const { addFile, setInitialState } = useFile()

  useEffect(() => {
    setInitialState()
  }, [])

  const handleDropZone = (files: File[] | File) => {
    addFile(files)
  }

  return (
    <section className="Section-grid">
      <header className="Logo">UpCloud</header>
      <DropZone onDrop={handleDropZone} />
      <FilterableFilesTable>
        <FiltersList />
        <FileList />
      </FilterableFilesTable>
      <ToastContainer />
    </section>
  )
}
