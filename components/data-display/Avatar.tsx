interface AvatarProps {
  name: String;
  size?: "sm" | "md" | "lg";
}
export default function Avatar({ name, size = "md" }: AvatarProps) {
  return (
    <div
      className={`flex ${size === "sm" && "h-12 w-12"} ${
        size === "md" && "h-14 w-14"
      } ${
        size === "lg" && "h-16 w-16"
      } items-center justify-center rounded-full bg-gray-300 text-xl`}
    >
      {name.split(" ").length > 1
        ? name.split(" ")[0][0] + name.split(" ")[1][0]
        : ""}
    </div>
  );
}
