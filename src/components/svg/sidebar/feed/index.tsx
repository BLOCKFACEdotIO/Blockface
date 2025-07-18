interface FeedIconProps {
  width?: number;
  height?: number;
  color?: string;
  key?: string
}

export const FeedIcon = ({ width = 16, height = 16, color, ...props }: FeedIconProps) => {
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
      className="text-xl text-muted"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M4 11a9 9 0 0 1 9 9"></path>
      <path d="M4 4a16 16 0 0 1 16 16"></path>
      <circle cx="5" cy="19" r="1"></circle>
    </svg>
  );
};
