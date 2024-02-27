import Navbar from "./_components/navbar";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="min-h-[100vh] p-5 flex flex-col gap-y-10 justify-start pt-36 items-center bg-sky-600">
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
