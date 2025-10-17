import { useCheckAdminQuery } from "@/store/services/adminApi";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import Spinner from "./ui/spinner";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  // const isAdmin = localStorage.getItem("bookingCabsAdmin") ? true : false;
  const { isLoading, isError } = useCheckAdminQuery(null, {
    skip: false,
  });

  useEffect(() => {
    if (!isLoading) {
      if (authentication && isError) {
        navigate("/login");
      } else if (!authentication && !isError) {
        navigate("/");
      }
    }
  }, [isLoading, isError, authentication, navigate]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center gap-4">
        <Spinner />
      </div>
    );
  }

  // ✅ only render after auth check is done
  if ((authentication && isError) || (!authentication && !isError)) {
    return null; // avoid flash of protected page
  }

  return <>{children}</>;
}
