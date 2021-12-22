import React from 'react'

import IconAll from '../icons/IconAll'
import IconGallery from '../icons/IconGallery'
import IconVideo from '../icons/IconVideo'
import IconDocument from '../icons/IconDocument'
import IconLayer from '../icons/IconLayer'

const getIconByFilterName = ({ name, isActive }) => {
  const color = isActive ? 'rgb(255, 142, 60)' : '#2a2a2a'
  const className = 'Filter-icon'
  switch (name) {
    case 'All':
      return <IconAll className={className} color={color} />
    case 'Images':
      return <IconGallery className={className} color={color} />
    case 'Videos':
      return <IconVideo className={className} color={color} />
    case 'Documents':
      return <IconDocument className={className} color={color} />
    case 'Others':
      return <IconLayer className={className} color={color} />
    default:
      return null
  }
}

function FilterItem({ isActive = false, name, filterBy } = {}) {
  const handleClick = () => {
    filterBy(name)
  }

  return (
    <li onClick={handleClick} className={`Filter-item ${isActive ? 'active' : ''}`}>
      {getIconByFilterName({ name, isActive })}
      <span className="Filter-text">{name}</span>
    </li>
  )
}

export default React.memo(FilterItem)
