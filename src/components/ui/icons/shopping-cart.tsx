import * as React from "react";

interface ShoppingCartIconProps extends React.SVGProps<SVGSVGElement> {}

export function ShoppingCartIcon(props: ShoppingCartIconProps) {
  return (
    <svg
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.5 3.5h10l2 10h-14l2-10Zm2.5 0v-1.25c0-.5.5-1 2.5-1s2.5.5 2.5 1v1.25"
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
