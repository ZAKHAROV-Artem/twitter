interface AvatarProps {
  name: String;
}
export default function Avatar({ name }: AvatarProps) {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-300 text-xl">
      {name.split(" ")[0][0] + name.split(" ")[1][0]}
    </div>
  );
}
