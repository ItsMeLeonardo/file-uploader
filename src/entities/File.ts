export type FileStatus = 'loading' | 'error' | 'completed' | 'cancel'

export type FileUP = {
  id: string
  file: File
  name: string
  status: FileStatus
  url?: string
  thumbnail?: string
}
