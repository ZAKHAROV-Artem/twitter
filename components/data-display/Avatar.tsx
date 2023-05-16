import Image from "next/image";

interface AvatarProps {
  name?: String;
  size?: "sm" | "md" | "lg";
  className?: string;
  src?: string;
}
export default function Avatar({
  name,
  size = "md",
  className,
  src,
}: AvatarProps) {
  return (
    <div
      className={`flex items-center justify-center rounded-full ${
        !src && "bg-gray-300"
      }   text-white 
      ${size === "sm" && "h-12 w-12 text-sm"}
      ${size === "md" && "h-14 w-14 text-xl"} 
      ${size === "lg" && "h-32 w-32 text-4xl"} 
      ${className}`}
    >
      {!src && name && (
        <>
          {name.split(" ").length > 1
            ? name.split(" ")[0][0] + name.split(" ")[1][0]
            : name}
        </>
      )}
      {src && (
        <Image
          src={src}
          alt="Profile"
          className="h-full w-full rounded-full object-cover"
          width={100}
          height={100}
        />
      )}
    </div>
  );
}
