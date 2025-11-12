// hooks/use-user.ts
"use client";

import { useEffect, useState } from "react";

export interface User {
  id: string;
  nama: string;
  role: string;
  avatar?: string;
}

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ambil user data dari JWT token di cookie
    const getUserFromToken = () => {
      try {
        // Function untuk baca cookie
        const getCookie = (name: string) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop()?.split(";").shift();
          return null;
        };

        const token = getCookie("auth_token");

        if (!token) {
          setUser(null);
          setIsLoading(false);
          return;
        }

        // Decode JWT payload
        const payload = JSON.parse(atob(token.split(".")[1]));

        setUser({
          id: payload.id,
          nama: payload.nama,
          role: payload.role,
        });
      } catch (error) {
        console.error("Error getting user from token:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    getUserFromToken();
  }, []);

  return { user, isLoading };
}
