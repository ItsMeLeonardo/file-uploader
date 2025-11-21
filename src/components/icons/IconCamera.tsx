import React from 'react'

function IconCamera() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="6.5" width="18" height="12" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M9 6.5L10.2 4.8C10.52 4.35 11.06 4.08 11.64 4.08H12.36C12.94 4.08 13.48 4.35 13.8 4.8L15 6.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12.5" r="3.25" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18" cy="9.5" r="0.75" fill="currentColor" />
    </svg>
  )
}

export default React.memo(IconCamera)
