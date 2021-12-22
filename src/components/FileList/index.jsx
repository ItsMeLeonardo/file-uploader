import FileItem from '../FileItem'

export default function FileList({ files, deleteFile }) {
  return (
    <ul className="Files">
      {files.map(({ name, status, file }) => (
        <FileItem
          key={name}
          name={name}
          status={status}
          file={file}
          deleteFile={deleteFile}
        />
      ))}
    </ul>
  )
}
