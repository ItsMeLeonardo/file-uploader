export default function IconClose({ className, color = 'black', size = 20 } = {}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.88661 9.88661L6.11328 6.11328 M6.11328 9.88661L9.88661 6.11328 M7.99992 14.6667C11.6666 14.6667 14.6666 11.6667 14.6666 8.00004C14.6666 4.33337 11.6666 1.33337 7.99992 1.33337C4.33325 1.33337 1.33325 4.33337 1.33325 8.00004C1.33325 11.6667 4.33325 14.6667 7.99992 14.6667Z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
