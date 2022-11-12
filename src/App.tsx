import { useCallback, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { useFile } from './hooks/useFile'

import DropZone from './components/DropZone'
import FiltersList from './components/Filters'
import FileList from './components/FileList'
import FilterableFilesTable from './components/FilterableFilesTable'
import FilterItem from './components/FilterItem'

import type { FilterFunc, Filters } from './entities/Filter'
import type { FileUP, FileStatus } from './entities/File'

const FILTERS: FilterFunc[] = [
  {
    name: 'All',
    filter: () => true,
  },
  {
    name: 'Images',
    filter: ({ file }) => file.type.startsWith('image/'),
  },
  {
    name: 'Videos',
    filter: ({ file }) => file.type.startsWith('video/'),
  },
  {
    name: 'Documents',
    filter: ({ file }) => file.type.startsWith('application/'),
  },
  {
    name: 'Others',
    filter: ({ file }) => file.type.includes('text/'),
  },
]

export default function App() {
  const [filter, setFilter] = useState<Filters>('All')
  const { deleteAllFromService, deleteFromService, getFiles } = useFile()
  const [files, setFiles] = useState<FileUP[]>([])

  useEffect(() => {
    getFiles().then((files: FileUP[]) => setFiles(files))
  }, [])

  const filterFunc = FILTERS.find(({ name }) => name === filter)?.filter
  const filesToShow = filterFunc && filter !== 'All' ? files.filter(filterFunc) : files

  const deleteFile = useCallback(
    ({ name, id }: FileUP) => {
      if (!id) return
      setFiles(files.filter(({ file }) => file.name !== name))
      deleteFromService(id)
    },
    [files],
  )

  const addFile = (file: File) => {
    const fileUP: FileUP = {
      name: file.name,
      file,
      status: 'loading',
    }

    setFiles([...files, fileUP])
  }

  const clearComplete = useCallback(() => {
    setFiles((prevFiles) =>
      prevFiles.filter(({ status }) => {
        return status !== 'completed'
      }),
    )
    deleteAllFromService()
  }, [])

  const setCompleted = useCallback(({ name, url }: FileUP) => {
    setFiles((prevFiles) =>
      prevFiles.map((file) => {
        if (file.name === name) {
          return {
            ...file,
            status: 'completed',
            url,
          }
        }
        return file
      }),
    )
  }, [])

  return (
    <section className="Section-grid">
      <header className="Logo">UpCloud</header>
      <DropZone onDrop={addFile} />
      <FilterableFilesTable clearComplete={clearComplete}>
        <FiltersList>
          {FILTERS.map(({ name }) => (
            <FilterItem
              key={name}
              filterBy={setFilter}
              isActive={name === filter}
              name={name}
            />
          ))}
        </FiltersList>
        <FileList
          files={filesToShow}
          deleteFile={deleteFile}
          setCompleted={setCompleted}
        />
      </FilterableFilesTable>
      <ToastContainer />
    </section>
  )
}
