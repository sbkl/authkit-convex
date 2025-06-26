import * as React from "react";

interface CreditCardIconProps extends React.SVGProps<SVGSVGElement> {}

export function CreditCardIcon(props: CreditCardIconProps) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2 3.5C1.72386 3.5 1.5 3.72386 1.5 4V11C1.5 11.2761 1.72386 11.5 2 11.5H13C13.2761 11.5 13.5 11.2761 13.5 11V4C13.5 3.72386 13.2761 3.5 13 3.5H2ZM0.5 4C0.5 3.17157 1.17157 2.5 2 2.5H13C13.8284 2.5 14.5 3.17157 14.5 4V11C14.5 11.8284 13.8284 12.5 13 12.5H2C1.17157 12.5 0.5 11.8284 0.5 11V4ZM2 5.5C2 5.22386 2.22386 5 2.5 5H12.5C12.7761 5 13 5.22386 13 5.5V6.5C13 6.77614 12.7761 7 12.5 7H2.5C2.22386 7 2 6.77614 2 6.5V5.5ZM2.5 9C2.22386 9 2 9.22386 2 9.5C2 9.77614 2.22386 10 2.5 10H4.5C4.77614 10 5 9.77614 5 9.5C5 9.22386 4.77614 9 4.5 9H2.5Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}
