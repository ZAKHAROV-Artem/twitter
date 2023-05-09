interface AvatarProps {
  name: String;
  size?: "sm" | "md" | "lg";
  className?: string;
}
export default function Avatar({ name, size = "md", className }: AvatarProps) {
  return (
    <div
      className={`flex  items-center justify-center rounded-full bg-gray-300  text-white 
      ${size === "sm" && "h-12 w-12 text-sm"}
      ${size === "md" && "h-14 w-14 text-xl"} 
      ${size === "lg" && "h-32 w-32 text-4xl"} 
      ${className}`}
    >
      {name.split(" ").length > 1
        ? name.split(" ")[0][0] + name.split(" ")[1][0]
        : ""}
    </div>
  );
}
