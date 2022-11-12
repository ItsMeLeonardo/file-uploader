export type FileStatus = 'loading' | 'error' | 'completed' | 'cancel'

export type FileUP = {
  id?: number
  file: File
  name: string
  status: FileStatus
  url?: string
}
