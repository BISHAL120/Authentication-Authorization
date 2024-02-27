import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FromSuccessProps {
  message: string | undefined;
}

export const FromSuccess = ({ message }: FromSuccessProps) => {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/15 p-3 rounded-sm text-emerald-500 flex items-center gap-x-3 text-sm">
      <CheckCircledIcon className="h-4 w-4" />
      {message}
    </div>
  );
};
