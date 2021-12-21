import FileItem from '../FileItem'

export default function FileList() {
  return (
    <ul className="Files">
      <FileItem />
      <FileItem className="completed" />
    </ul>
  )
}
