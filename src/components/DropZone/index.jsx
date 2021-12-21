export default function DropZone() {
  return (
    <form className="layout Drop-zone">
      <div className="Drop-content">
        <h2 className="Drop-text">Drag and drop your file here</h2>

        <p className="Drop-divider">
          <span>or</span>
        </p>

        <label htmlFor="file" className="Drop-label btn btn-gradient">
          Browse file
          <input type="file" name="file" id="file" hidden />
        </label>
      </div>
    </form>
  )
}
