import FileItem from '../FileItem'
import { useFile } from '../../hooks/useFile'

export default function FileList({ files, deleteFile, setCompleted }) {
  const { saveInService } = useFile()

  return (
    <ul className="Files">
      {files.map((file) => (
        <FileItem
          key={file.name}
          fileItem={file}
          deleteFile={deleteFile}
          setCompleted={setCompleted}
          saveFile={saveInService}
        />
      ))}
    </ul>
  )
}
