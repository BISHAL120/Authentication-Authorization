import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default function Home() {
  return (
    <main className="flex min-h-[100vh] flex-col justify-center items-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md",
            font.className
          )}
        >
          🔐 Auth
        </h1>
        <p className="text-white text-lg">A Simple Authentication Server</p>
        <div>
          <LoginButton mode="modal" redirectTo="login" asChild>
            <Button variant="secondary" size="lg">
              Sing in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
