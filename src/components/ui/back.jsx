import { ArrowLeftIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

const Back = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className="group mb-4 flex items-center gap-1 text-sm text-blue-500 hover:underline"
    >
      <ArrowLeftIcon className="inline-block h-4 w-4 transition-transform group-hover:translate-x-[-2px]" />
      Go back
    </button>
  );
};

export default Back;
