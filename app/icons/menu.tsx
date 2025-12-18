interface IconProps {
  height?: string | number;
  width?: string | number;
  className?: string;
  fill?: string;
}

export function MenuIcon({
  height = "24",
  width = "24",
  fill = "#d9d9d9",
  className,
}: IconProps) {
  return (
    <svg
      width={width}
      className={className}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_317_3958"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24"
      >
        <rect width={width} height={height} fill={fill} />
      </mask>
      <g mask="url(#mask0_317_3958)">
        <path
          d="M3 7V5H21V7H3ZM3 19V17H21V19H3ZM3 13V11H21V13H3Z"
          fill="white"
        />
      </g>
    </svg>
  );
}
