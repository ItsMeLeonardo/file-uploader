import { FileUP } from './File'

export type Filters = 'All' | 'Images' | 'Videos' | 'Documents' | 'Audio' | 'Others'
export type FilterFunc = {
  name: Filters
  filter: (file: FileUP) => boolean
}
