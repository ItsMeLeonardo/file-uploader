import { useEffect, useState } from 'react'

import { formatBytes } from '../../services/formatBytes'
import { cutTextWithEllipsis } from '../../services/cutTextWithEllipsis'

function ModalDetail({ file, closeModal, deleteFile }) {
  const [urlFile, setUrlFile] = useState(file.url || '#')

  const handleClickModalBody = (e) => e.stopPropagation()

  useEffect(() => {
    if (file.url) return
    const url = URL.createObjectURL(file.file)
    setUrlFile(url)
    return () => URL.revokeObjectURL(url)
  }, [])

  const handleError = (event) => {
    const img = event.target.closest('img')
    const picture = img.parentElement
    picture.classList.add('without-preview')
    img.hidden = true
  }

  const handleDelete = () => {
    deleteFile({ id: file.id })
    closeModal()
  }

  return (
    <div className="Modal" onClick={handleClickModalBody}>
      <div className="Modal-body">
        <picture className="Modal-img">
          <img src={urlFile} alt="modal" onError={handleError} />
        </picture>
        <div className="Modal-data">
          <header className="Modal-data-item">
            <h1>{cutTextWithEllipsis({ text: file.name, size: 15 })}</h1>
            <span>{formatBytes(file.size)}</span>
          </header>
          <span className="Modal-data-item">{file.type}</span>
        </div>
      </div>
      <footer className="Modal-footer">
        <a href={urlFile} className="btn btn-gradient" download>
          Download
        </a>
        <button className="btn btn-secondary" onClick={handleDelete}>
          Delete file
        </button>
      </footer>
    </div>
  )
}

export default ModalDetail
