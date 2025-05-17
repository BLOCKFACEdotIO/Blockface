interface BountiesIconProps {
  width?: number;
  height?: number;
  color?: string;
  key?: string
}

export const BountiesIcon = ({
  width = 24,
  height = 24,
  color,
  ...props
}: BountiesIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      stroke={color ? color : "#32bd91"}
      fill="none"
      strokeWidth="2"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-xl text-muted w-5 h-5"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
      <path d="M12 18V6"></path>
    </svg>
  );
};
