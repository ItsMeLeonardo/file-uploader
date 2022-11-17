import { Filters } from '../../entities/Filter'
import { useFilter } from '../../store/filter'
import FilterItem from '../FilterItem'

const FILTERS: Filters[] = ['All', 'Images', 'Videos', 'Documents', 'Audio', 'Others']

export default function FiltersList() {
  const { filter, setFilter } = useFilter()

  return (
    <ul className="Filters">
      {FILTERS.map((name) => (
        <FilterItem
          key={name}
          isActive={name === filter}
          name={name}
          onClick={() => setFilter(name)}
        />
      ))}
    </ul>
  )
}
