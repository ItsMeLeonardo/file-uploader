function ModalContainer({ children, onClick }) {
  return (
    <section className="Modal-overlay" onClick={onClick}>
      {children}
    </section>
  )
}

export default ModalContainer
