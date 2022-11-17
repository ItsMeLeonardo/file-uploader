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
  onClick?: (filter: Filters) => void
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

export default function FilterItem({ isActive = false, name, onClick }: Props) {
  const handleClick = () => {
    onClick && onClick(name)
  }

  return (
    <li
      onClick={handleClick}
      className={`Filter-item ${isActive ? 'active' : ''}`}
      role="button"
    >
      {getIconByFilterName(name)}
      <span className="Filter-text">{name}</span>
    </li>
  )
}
