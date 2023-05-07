interface SpinnerProps {
  size?: "sm" | "md" | "lg";
}
export default function Spinner({ size = "sm" }: SpinnerProps) {
  return (
    <div
      className={`border-top-[5px] ${size === "sm" && "h-10 w-10"} ${
        size === "md" && "h-12 w-12"
      } ${
        size === "lg" && "h-14 w-14"
      } animate-spin rounded-full border-[5px] border-blue-500/20 border-t-blue-500`}
    />
  );
}
