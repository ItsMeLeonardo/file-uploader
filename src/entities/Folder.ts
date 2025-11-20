export type FolderIcon = 'gallery' | 'video' | 'document' | 'layer'

export type Folder = {
  id: string
  name: string
  tags: string[]
  icon: FolderIcon
  color: string
}
