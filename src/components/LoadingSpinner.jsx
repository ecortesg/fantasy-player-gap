import { BiLoaderAlt } from "react-icons/bi";

export function LoadingSpinner() {
  return (
    <div className="h-screen flex justify-center items-center p-2">
      <BiLoaderAlt className="animate-spin w-16 h-16" />
    </div>
  );
}
