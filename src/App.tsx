import { ToastContainer } from 'react-toastify'

import DropZone from './components/DropZone'
import FiltersList from './components/FilterList'
import FileList from './components/FileList'
import FilterableFilesTable from './components/FilterableFilesTable'
import { useFile } from './store/file'

export default function App() {
  const { addFile } = useFile()

  const handleDropZone = (files: File[]) => {
    files.forEach((file) => addFile(file))
    // addFile(file)
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
