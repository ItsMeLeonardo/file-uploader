import { useState } from 'react'
import { FileUP } from '../../entities/File'
import { useFile } from '../../store/file'
import { useToggle } from '../../hooks/useToggle'

import FileItem from '../FileItem'
import ModalContainer from '../Modal'
import ModalDetail from '../ModalDetail'

export default function FileList() {
  const { files, removeFile } = useFile()

  const [modalIsOpen, toggleModal] = useToggle()

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
            seeDetail={() => handleSeeDetail(file)}
          />
        ))}
      </ul>
      {modalIsOpen && fileDetail && (
        <ModalContainer onClick={toggleModal}>
          <ModalDetail
            file={fileDetail}
            closeModal={toggleModal}
            deleteFile={(file) => removeFile(file.id)}
          />
        </ModalContainer>
      )}
    </>
  )
}
