export type Filters = 'All' | 'Images' | 'Videos' | 'Documents' | 'Audio' | 'Others'

export type FilterFunc = (fileType: string) => boolean

const filtersFunc: { [K in Filters]: FilterFunc } = {
  All: () => true,
  Images: (fileType) => fileType.startsWith('image'),
  Videos: (fileType) => fileType.startsWith('video'),
  Documents: (fileType) => fileType.startsWith('application'),
  Audio: (fileType) => fileType.startsWith('audio'),
  Others: (fileType) =>
    !fileType.startsWith('image') &&
    !fileType.startsWith('video') &&
    !fileType.startsWith('application') &&
    !fileType.startsWith('audio'),
}

export const getFilterFunc = (filter: Filters): FilterFunc => filtersFunc[filter]
