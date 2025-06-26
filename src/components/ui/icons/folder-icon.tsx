import * as React from "react";

interface FolderIconProps extends React.SVGProps<SVGSVGElement> {
  variant?: "outline" | "filled";
}

export function FolderIcon({ variant = "outline", ...props }: FolderIconProps) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {variant === "outline" ? (
        <path
          d="M2 2.5C1.72386 2.5 1.5 2.72386 1.5 3V12C1.5 12.2761 1.72386 12.5 2 12.5H13C13.2761 12.5 13.5 12.2761 13.5 12V4.5C13.5 4.22386 13.2761 4 13 4H7.81066L6.87132 2.64124C6.76274 2.48398 6.59003 2.5 6.41421 2.5H2ZM0.5 3C0.5 2.17157 1.17157 1.5 2 1.5H6.41421C6.9463 1.5 7.44445 1.75190 7.77678 2.18376L8.40132 3H13C13.8284 3 14.5 3.67157 14.5 4.5V12C14.5 12.8284 13.8284 13.5 13 13.5H2C1.17157 13.5 0.5 12.8284 0.5 12V3Z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      ) : (
        <path
          d="M2 1.5C1.17157 1.5 0.5 2.17157 0.5 3V12C0.5 12.8284 1.17157 13.5 2 13.5H13C13.8284 13.5 14.5 12.8284 14.5 12V4.5C14.5 3.67157 13.8284 3 13 3H8.40132L7.77678 2.18376C7.44445 1.75190 6.9463 1.5 6.41421 1.5H2Z"
          fill="currentColor"
        />
      )}
      {/* <path
        d="M2 2.5C1.72386 2.5 1.5 2.72386 1.5 3V12C1.5 12.2761 1.72386 12.5 2 12.5H13C13.2761 12.5 13.5 12.2761 13.5 12V4.5C13.5 4.22386 13.2761 4 13 4H7.81066L6.87132 2.64124C6.76274 2.48398 6.59003 2.5 6.41421 2.5H2ZM0.5 3C0.5 2.17157 1.17157 1.5 2 1.5H6.41421C6.9463 1.5 7.44445 1.75190 7.77678 2.18376L8.40132 3H13C13.8284 3 14.5 3.67157 14.5 4.5V12C14.5 12.8284 13.8284 13.5 13 13.5H2C1.17157 13.5 0.5 12.8284 0.5 12V3Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      /> */}
    </svg>
  );
}
