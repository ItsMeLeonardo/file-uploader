import IconAll from '../icons/IconAll'

export default function FilterItem() {
  return (
    <li className="Filter-item active">
      <IconAll className="Filter-icon" color="rgb(255, 142, 60)" />
      <span className="Filter-text">All</span>
    </li>
  )
}
