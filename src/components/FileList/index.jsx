import FileItem from '../FileItem'

const FILES = [
  {
    name: 'file1.txt',
    type: 'text/plain',
    size: '1.2 MB',
    progress: '10%',
  },
  {
    name: 'file2.png',
    type: 'image/png',
    size: '2.3 MB',
    progress: '20%',
  },
  {
    name: 'file3.mp4',
    type: 'video/mp4',
    size: '3.4 MB',
    progress: '30%',
  },
  {
    name: 'file4.pdf',
    type: 'application/pdf',
    size: '4.5 MB',
    progress: '40%',
  },
  {
    name: 'file5.mp3',
    type: 'audio/mp3',
    size: '5.6 MB',
    progress: '100%',
  },
]

export default function FileList() {
  return (
    <ul className="Files">
      {FILES.map(({ name, progress }) => (
        <FileItem
          key={name}
          name={name}
          progress={progress}
          isCompleted={progress === '100%'}
        />
      ))}
    </ul>
  )
}
