import React from 'react'

import IconAll from '../icons/IconAll'
import IconGallery from '../icons/IconGallery'
import IconVideo from '../icons/IconVideo'
import IconDocument from '../icons/IconDocument'
import IconLayer from '../icons/IconLayer'
import { Filters } from '../../entities/Filter'

type Props = {
  name: Filters
  isActive?: boolean
  filterBy: any
}

const getIconByFilterName = (name: Filters) => {
  switch (name) {
    case 'All':
      return <IconAll />
    case 'Images':
      return <IconGallery />
    case 'Videos':
      return <IconVideo />
    case 'Documents':
      return <IconDocument />
    case 'Others':
      return <IconLayer />
    default:
      return null
  }
}

function FilterItem({ isActive = false, name, filterBy }: Props) {
  const handleClick = () => {
    filterBy(name)
  }

  return (
    <li onClick={handleClick} className={`Filter-item ${isActive ? 'active' : ''}`}>
      {getIconByFilterName(name)}
      <span className="Filter-text">{name}</span>
    </li>
  )
}

export default React.memo(FilterItem)
