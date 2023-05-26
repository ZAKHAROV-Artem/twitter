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
    <div>
      {!src ? (
        <div
          className={`flex items-center justify-center rounded-full ${
            !src && "bg-gray-300"
          }   text-white 
      ${size === "sm" && "h-12 w-12"}
      ${size === "md" && "h-16 w-16"} 
      ${size === "lg" && "h-32 w-32"} 
      ${className}`}
        >
          {name && (
            <>
              {name.split(" ").length > 1
                ? name.split(" ")[0][0] + name.split(" ")[1][0]
                : name}
            </>
          )}
        </div>
      ) : (
        <Image
          src={src}
          alt="Profile"
          quality={100}
          className={`rounded-full object-cover  ${
            size === "sm" && "h-12 w-12 text-sm"
          }
          ${size === "md" && "h-16 w-16 text-xl"} 
          ${size === "lg" && "h-32 w-32 text-4xl"}   ${className}`}
          width={1000}
          height={1000}
        />
      )}
    </div>
  );
}
