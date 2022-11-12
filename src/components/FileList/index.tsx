import { useState } from 'react'
import { FileUP } from '../../entities/File'
import { useFile } from '../../hooks/useFile'
import { useToggle } from '../../hooks/useToggle'

import FileItem from '../FileItem'
import ModalContainer from '../Modal'
import ModalDetail from '../ModalDetail'

type Props = {
  files: FileUP[]
  deleteFile: (file: FileUP) => void
  setCompleted: (file: FileUP) => void
}

export default function FileList({ files, deleteFile, setCompleted }: Props) {
  const [modalIsOpen, toggleModal] = useToggle()
  const { saveInService } = useFile()
  const [fileDetail, setFileDetail] = useState<FileUP | null>(null)

  const handleSeeDetail = (file: FileUP) => {
    toggleModal()
    setFileDetail(file)
  }

  return (
    <>
      <ul className="Files">
        {files.map((file) => (
          <FileItem
            key={file.name}
            fileItem={file}
            deleteFile={deleteFile}
            setCompleted={setCompleted}
            saveFile={saveInService}
            seeDetail={() => handleSeeDetail(file)}
          />
        ))}
      </ul>
      {modalIsOpen && fileDetail && (
        <ModalContainer onClick={toggleModal}>
          <ModalDetail
            file={fileDetail}
            closeModal={toggleModal}
            deleteFile={deleteFile}
          />
        </ModalContainer>
      )}
    </>
  )
}
