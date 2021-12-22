import { useRef, useState } from 'react'

export default function DropZone({ addFile }) {
  const [fileState, setFileState] = useState(null)

  const dropZoneRef = useRef(null)

  const handleDragEnter = (event) => {
    event.preventDefault()
  }
  const handleDragOver = (event) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
    dropZoneRef.current.classList.add('active')
  }
  const handleDragLeave = (event) => {
    event.preventDefault()
    dropZoneRef.current.classList.remove('active')
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    console.log({ file })
    dropZoneRef.current.classList.remove('active')
    setFileState(file)
  }

  const handleChange = (event) => {
    const file = event.target.files[0]
    console.log({ file })
    setFileState(file)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!fileState) return

    const file = {
      name: fileState.name,
      type: fileState.type,
      size: fileState.size,
      file: fileState,
    }

    addFile(file)
    setFileState(null)
  }

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <label
        htmlFor="file"
        className="layout Drop-zone"
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        ref={dropZoneRef}
      >
        <div className="Drop-content">
          <h2 className="Drop-text">
            {fileState
              ? `Change file: ${fileState.name.slice(0, 30)}...`
              : 'Drop file or click to upload file'}
          </h2>

          <p className="Drop-divider">
            <span>And</span>
          </p>

          <input type="file" name="file" id="file" hidden onChange={handleChange} />
          <button className="btn btn-gradient" disabled={!fileState}>
            Upload file
          </button>
        </div>
      </label>
    </form>
  )
}
