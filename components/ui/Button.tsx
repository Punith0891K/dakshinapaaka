interface ButtonProps {
  children: React.ReactNode;
}

export default function Button({
  children,
}: ButtonProps) {
  return (
    <button
      className="
      rounded-full
      bg-[#2F6B3D]
      px-8
      py-4
      text-white
      font-semibold
      transition-all
      duration-300
      hover:bg-[#255632]
      hover:scale-105
      "
    >
      {children}
    </button>
  );
}