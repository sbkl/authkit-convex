import * as React from "react";

interface PhoneIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const PhoneIcon = ({ size = 15, ...props }: PhoneIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 2.5C4 2.22386 4.22386 2 4.5 2H10.5C10.7761 2 11 2.22386 11 2.5V12.5C11 12.7761 10.7761 13 10.5 13H4.5C4.22386 13 4 12.7761 4 12.5V2.5ZM4.5 1C3.67157 1 3 1.67157 3 2.5V12.5C3 13.3284 3.67157 14 4.5 14H10.5C11.3284 14 12 13.3284 12 12.5V2.5C12 1.67157 11.3284 1 10.5 1H4.5ZM6 11.65C6 11.2858 6.29848 11 6.66667 11H8.33333C8.70152 11 9 11.2858 9 11.65C9 12.0142 8.70152 12.3 8.33333 12.3H6.66667C6.29848 12.3 6 12.0142 6 11.65Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
};
