import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useSignOut = (setLogoutModal) => {
  const router = useRouter();

  const signOut = () => {
    deleteCookie("userData", { path: "/" });
    deleteCookie("token", { path: "/" });
    setLogoutModal(false);

    router.push("/classroom/signin");

    toast.success("Logged out successfully");
  };
  return {
    signOut,
  };
};
