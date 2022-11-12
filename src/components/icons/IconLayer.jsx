import React from 'react'

function IconLayer({ className, color = 'black' } = {}) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.8416 2.43335L15.7583 4.61668C17.1749 5.24168 17.1749 6.27502 15.7583 6.90002L10.8416 9.08335C10.2833 9.33335 9.3666 9.33335 8.80827 9.08335L3.8916 6.90002C2.47493 6.27502 2.47493 5.24168 3.8916 4.61668L8.80827 2.43335C9.3666 2.18335 10.2833 2.18335 10.8416 2.43335Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 9.16663C2.5 9.86663 3.025 10.675 3.66667 10.9583L9.325 13.475C9.75833 13.6666 10.25 13.6666 10.675 13.475L16.3333 10.9583C16.975 10.675 17.5 9.86663 17.5 9.16663"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 13.3334C2.5 14.1084 2.95833 14.8084 3.66667 15.125L9.325 17.6417C9.75833 17.8334 10.25 17.8334 10.675 17.6417L16.3333 15.125C17.0417 14.8084 17.5 14.1084 17.5 13.3334"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default React.memo(IconLayer)
