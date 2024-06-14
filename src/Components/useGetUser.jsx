import { useState, useEffect } from "react";

export function useGetUser() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const userRaw = localStorage.getItem("user");
    const _user = userRaw ? JSON.parse(userRaw) : null;
    setUser(_user);
  }, []);

  return user;
}
