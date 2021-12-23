import FileItem from '../FileItem'

export default function FileList({ files, deleteFile, setCompleted }) {
  return (
    <ul className="Files">
      {files.map(({ name, status, file }) => (
        <FileItem
          key={name}
          name={name}
          status={status}
          file={file}
          deleteFile={deleteFile}
          setCompleted={setCompleted}
        />
      ))}
    </ul>
  )
}
