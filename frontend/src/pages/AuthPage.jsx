import { useClerk } from "@clerk/react";
import { Button } from "@heroui/react";
import { MessageCircle, Sparkles } from "lucide-react";

export default function AuthPage() {
  const { openSignIn } = useClerk();

  const handleClerk = () => {
    openSignIn({
      fallbackRedirectUrl: "/",
      forceRedirectUrl: "/",
    });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-violet-50 via-white to-purple-100 px-4 dark:from-gray-950 dark:via-gray-900 dark:to-violet-950">
      {/* Decorative background blur circles */}
      <div className="absolute -top-40 left-10 h-72 w-72 rounded-full bg-purple-300/30 blur-3xl dark:bg-purple-800/20" />
      <div className="absolute -bottom-32 right-10 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl dark:bg-indigo-800/20" />

      {/* Content card */}
      <div className="relative z-10 w-full max-w-md space-y-8 rounded-3xl border border-white/20 bg-white/60 p-10 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-gray-900/60">
        <div className="text-center">
          {/* Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 shadow-inner">
            <MessageCircle className="h-8 w-8 text-primary" />
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground">
            Welcome to <span className="text-primary">iChat</span>
          </h1>

          {/* Subheading */}
          <p className="mt-3 text-base text-default-500">
            Your modern messaging web app. Connect, chat, and share instantly.
          </p>
        </div>

        {/* CTA Button */}
        <Button
          onClick={handleClerk}
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg hover:from-purple-600 hover:to-indigo-600 dark:from-purple-600 dark:to-indigo-600 dark:hover:from-purple-700 dark:hover:to-indigo-700"
          size="lg"
          endContent={<Sparkles className="h-4 w-4" />}
        >
          Get Started
        </Button>

        {/* Subtle footer text */}
        <p className="text-center text-xs text-default-400">
          By continuing you agree to our Terms and Privacy Policy
        </p>
      </div>
    </div>
  );
}