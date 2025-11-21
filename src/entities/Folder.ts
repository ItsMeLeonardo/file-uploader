export type FolderIcon = 'gallery' | 'video' | 'document' | 'layer' | 'camera' | 'music' | 'cloud' | 'star'

export type Folder = {
  id: string
  name: string
  tags: string[]
  build: string
  icon: FolderIcon
  color: string
}
