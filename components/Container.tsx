type ContainerProps = {
  children: React.ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    <div className="flex flex-col items-center w-full max-w-screen-2xl m-auto px-8 py-4">
      {children}
    </div>
  );
}
