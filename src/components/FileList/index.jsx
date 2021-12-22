import FileItem from '../FileItem'

export default function FileList({ files, deleteFile }) {
  return (
    <ul className="Files">
      {files.map(({ name, progress }) => (
        <FileItem key={name} name={name} progress={progress} deleteFile={deleteFile} />
      ))}
    </ul>
  )
}
