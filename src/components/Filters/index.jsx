import FilterItem from '../FilterItem'

const FILTERS = [
  {
    name: 'All',
    filter: () => true,
    isActive: true,
  },
  {
    name: 'Images',
    filter: (file) => file.type.startsWith('image/'),
  },
  {
    name: 'Videos',
    filter: (file) => file.type.startsWith('video/'),
  },
  {
    name: 'Documents',
    filter: (file) => file.type.startsWith('application/'),
  },
  {
    name: 'Others',
    filter: (file) => file.type.includes(['text/', 'audio/', 'video/']),
  },
]

export default function Filters() {
  return (
    <ul className="Filters">
      {FILTERS.map(({ name, isActive }) => (
        <FilterItem key={name} isActive={Boolean(isActive)} name={name} />
      ))}
    </ul>
  )
}
