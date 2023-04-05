import { useSelector } from "react-redux";

export function useAuth() {
  const auth = useSelector((state) => state.auth);

  if (auth?.accessToken && auth?.user) {
    return true;
  }
  return false;
}

export function useAdmin() {
  const auth = useSelector((state) => state.auth);

  if (auth?.isAdmin) {
    return true;
  }
  return false;
}
