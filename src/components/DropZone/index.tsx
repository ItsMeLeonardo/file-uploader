import { ChangeEvent, DragEvent, FormEvent, useRef, useState, useEffect } from 'react'

type DropZoneProps = {
  onDrop?: (file: File) => void
}

export default function DropZone({ onDrop }: DropZoneProps) {
  const [fileState, setFileState] = useState<File | null>(null)

  const dropZoneRef = useRef<HTMLLabelElement>(null)

  const handleDragEnter = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
  }
  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    if (!dropZoneRef.current) return
    event.dataTransfer.dropEffect = 'move'
    dropZoneRef.current.classList.add('active')
  }
  const handleDragLeave = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    if (!dropZoneRef.current) return
    dropZoneRef.current.classList.remove('active')
  }

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    if (!dropZoneRef.current) return
    const file = event.dataTransfer.files[0]
    dropZoneRef.current.classList.remove('active')
    setFileState(file)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target
    if (!files) return
    const file = files[0]
    setFileState(file)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!fileState) return

    onDrop && onDrop(fileState)
    setFileState(null)
  }

  const preview =
    fileState && fileState.type.includes('image') ? URL.createObjectURL(fileState) : null

  useEffect(() => {
    if (!preview) return
    return () => URL.revokeObjectURL(preview)
  }, [preview])

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
        style={{ background: preview ? `url(${preview}) center/cover no-repeat` : '' }}
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
