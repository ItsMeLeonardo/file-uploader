import { useState } from 'react'
import { useFilesLocal } from '../../hooks/useFilesLocal'
import { useToggle } from '../../hooks/useToggle'

import FileItem from '../FileItem'
import ModalContainer from '../Modal'
import ModalDetail from '../ModalDetail'

export default function FileList({ files, deleteFile, setCompleted }) {
  const [modalIsOpen, toggleModal] = useToggle()
  const { saveInService } = useFilesLocal()
  const [fileDetail, setFileDetail] = useState(null)

  const handleSeeDetail = (file) => {
    toggleModal()
    setFileDetail(file)
  }

  return (
    <>
      <ul className="Files">
        {files.map((file, index) => (
          <FileItem
            key={`${file.name}-${index}-${file.size}`}
            fileItem={file}
            deleteFile={deleteFile}
            setCompleted={setCompleted}
            saveFile={saveInService}
            seeDetail={() => handleSeeDetail(file)}
          />
        ))}
      </ul>
      {modalIsOpen && (
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
