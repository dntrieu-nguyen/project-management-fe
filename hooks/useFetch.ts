"use client";
import { AnyARecord } from "dns";
import { useState, useEffect } from "react";

type UseFetchHook<T> = {
  data: T | any;
  loading: boolean;
  error: string | null;
  refetch: () => void;
};

function useFetch<T>(fetchFunction: () => Promise<T>): UseFetchHook<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result: any = await fetchFunction();
      if (result.success) {
        setData(result.data);
      }
    } catch (err: any) {
      err && setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchFunction]);

  return { data, loading, error, refetch: fetchData };
}

export default useFetch;
