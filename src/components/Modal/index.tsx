import { ReactNode, MouseEvent } from 'react'

type Props = {
  children: ReactNode | ReactNode[]
  onClick: (event: MouseEvent<HTMLDivElement>) => void
}

function ModalContainer({ children, onClick }: Props) {
  return (
    <section className="Modal-overlay" onClick={onClick}>
      {children}
    </section>
  )
}

export default ModalContainer
