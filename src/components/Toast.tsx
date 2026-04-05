import { useEffect } from "react";

export const Toast = ({ message, show, onClose }: any) => {
  useEffect(() => {
    if (show) {
      setTimeout(onClose, 2000);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed top-5 right-5 bg-teal-500 text-white px-4 py-2 rounded shadow-lg">
      {message}
    </div>
  );
};