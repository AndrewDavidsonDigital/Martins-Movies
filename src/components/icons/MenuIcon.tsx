import * as React from "react"
export function MenuIcon(props: any){

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      {...props}
      >
      <path d="M3 6h18" className="line-1" />
      <path d="M3 12h18" className="line-2" />
      <path d="M3 18h18" className="line-3" />
    </svg>
  )
}

