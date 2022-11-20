import { ChangeEvent, DragEvent, useRef } from 'react'

type DropZoneProps = {
  onDrop?: (files: File[]) => void
}

export default function DropZone({ onDrop }: DropZoneProps) {
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
    const files = Array.from(event.dataTransfer.files)

    dropZoneRef.current.classList.remove('active')

    onDrop && onDrop(files)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return
    const files = Array.from(event.target.files)

    onDrop && onDrop(files)
  }

  return (
    <div>
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
          <h2 className="Drop-text">Drag and drop your files</h2>

          <p className="Drop-divider">
            <span>Or</span>
          </p>

          <input
            type="file"
            name="file"
            id="file"
            hidden
            onChange={handleChange}
            multiple
          />
          <span role="button" className="btn btn-gradient">
            Search file
          </span>
        </div>
      </label>
    </div>
  )
}
