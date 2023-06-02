interface HeaderProps {
  text: string;
}
export default function Header({ text }: HeaderProps) {
  return (
    <div className="sticky z-20 left-0 top-0 flex h-16 w-full items-center bg-header backdrop-blur-md">
      <h1 className="mx-5 text-xl font-bold text-white">{text}</h1>
    </div>
  );
}
