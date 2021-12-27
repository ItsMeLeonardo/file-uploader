import { useCallback, useState } from 'react'
import { useToggle } from '../../hooks/useToggle'

import FileItem from '../FileItem'
import ModalContainer from '../Modal'
import ModalDetail from '../ModalDetail'

export default function FileList({ files, deleteFile }) {
  const [modalIsOpen, toggleModal] = useToggle()
  const [fileDetail, setFileDetail] = useState(null)

  const handleSeeDetail = useCallback((file) => {
    toggleModal()
    setFileDetail(file)
  }, [])

  return (
    <>
      <ul className="Files">
        {files.map((file, index) => (
          <FileItem
            key={`${file.name}-${index}-${file.size}`}
            fileItem={file}
            seeDetail={handleSeeDetail}
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
