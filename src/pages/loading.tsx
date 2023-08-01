export default function LoadingPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-screen h-screen grid place-content-center">
      <div className="flex flex-col items-center">
        <h2 className="mt-2 animate-pulse">{children}</h2>
      </div>
    </main>
  );
}
