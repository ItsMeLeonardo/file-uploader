import DropZone from './components/DropZone'
import Filters from './components/Filters'
import FileList from './components/FileList'
import FilterableFilesTable from './components/FilterableFilesTable'

function App() {
  return (
    <section className="Section-grid">
      <header className="Logo">UpCloud</header>
      <DropZone />
      <FilterableFilesTable>
        <Filters />
        <FileList />
      </FilterableFilesTable>
    </section>
  )
}

export default App
