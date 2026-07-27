import { ImageResponse } from "next/og";

export const size = 32;
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="32" height="32" rx="8" fill="#0b1326" />
        <circle cx="16" cy="16" r="10" stroke="#8ed5ff" strokeWidth="3" />
        <path
          d="M11 16L14.5 19.5L21 12"
          stroke="#ffc640"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    { width: 32, height: 32 }
  );
}
