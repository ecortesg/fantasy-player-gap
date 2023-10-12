import { AiOutlineLoading } from "react-icons/ai";

export function LoadingSpinner() {
  return (
    <div className="h-screen flex justify-center items-center p-2">
      <AiOutlineLoading className="animate-spin w-16 h-16" />
    </div>
  );
}
