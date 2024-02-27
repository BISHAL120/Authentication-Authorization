import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FromErrorProps {
  message: string | undefined;
}

export const FromError = ({ message }: FromErrorProps) => {
  if (!message) return null;
  return (
    <div className="bg-destructive/15 p-3 rounded-sm text-destructive flex items-center gap-x-3 text-sm">
      <ExclamationTriangleIcon className="h-4 w-4" />
      {message}
    </div>
  );
};
