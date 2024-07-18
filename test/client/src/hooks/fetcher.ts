// hooks/useFetch.ts

import { useState, useCallback } from "react";
import axiosInstance from "../utils/axios";

interface FetchState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

type HttpMethod = "get" | "post" | "delete" | "patch";

const useFetch = <T = unknown, P = unknown>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(
    async (method: HttpMethod, payload?: P, customUrl?: string) => {
      setLoading(true);
      try {
        let response;
        const requestUrl = customUrl || url; // Use custom URL if provided, otherwise use base URL
        switch (method) {
          case "get":
            response = await axiosInstance.get<T>(requestUrl);
            break;
          case "post":
            response = await axiosInstance.post<T>(requestUrl, payload);
            break;
          case "delete":
            response = await axiosInstance.delete<T>(requestUrl);
            break;
          case "patch":
            response = await axiosInstance.patch<T>(requestUrl, payload);
            break;
          default:
            throw new Error("Unsupported HTTP method");
        }
        setData(response.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    },
    [url]
  );

  return { data, error, loading, fetchData };
};

export default useFetch;
