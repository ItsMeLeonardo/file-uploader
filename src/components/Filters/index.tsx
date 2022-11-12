import { ReactNode } from 'react'

type Props = {
  children: ReactNode | ReactNode[]
}

export default function Filters({ children }: Props) {
  return <ul className="Filters">{children}</ul>
}
