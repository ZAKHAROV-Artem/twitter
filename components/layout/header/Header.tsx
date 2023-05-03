interface HeaderProps {}
export default function Header({}: HeaderProps) {
  return (
    <div className="sticky left-0 top-0 flex h-16 w-full items-center bg-header backdrop-blur-md">
      <h1 className="mx-5 text-xl font-bold text-white">Home</h1>
    </div>
  );
}
