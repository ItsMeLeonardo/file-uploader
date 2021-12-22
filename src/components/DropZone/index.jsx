export default function DropZone({ addFile }) {
  const handleSubmit = (event) => {
    event.preventDefault()
    const input = event.target.file
    const fileUploaded = input.files[0]

    if (!fileUploaded) return

    const file = {
      name: fileUploaded.name,
      type: fileUploaded.type,
      size: fileUploaded.size,
      progress: 0,
    }

    const fileReader = new FileReader()

    fileReader.readAsDataURL(fileUploaded)

    fileReader.addEventListener('progress', (event) => {
      const progress = Math.round((event.loaded / event.total) * 100)

      console.log({ progress })
    })

    addFile(file)
  }

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <label htmlFor="file" className="layout Drop-zone">
        <div className="Drop-content">
          <h2 className="Drop-text">Drop file or click to upload file</h2>

          <p className="Drop-divider">
            <span>And</span>
          </p>

          <input type="file" name="file" id="file" style={{ display: 'none' }} />
          <button className="btn btn-gradient">Send File</button>
        </div>
      </label>
    </form>
  )
}
