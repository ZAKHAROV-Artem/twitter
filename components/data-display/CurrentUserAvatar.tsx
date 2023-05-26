import Avatar from "@/components/data-display/Avatar";
import useCurrentUser from "@/hooks/useCurrentUser";

interface CurrentUserAvatarProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}
export default function CurrentUserAvatar({
  size,
  className,
}: CurrentUserAvatarProps) {
  const { user } = useCurrentUser();
  return (
    <Avatar
      src={user?.profileImage || user?.image || ""}
      name={user?.name || ""}
      size={size}
      className={className}
    />
  );
}
