import { useEffect, useState } from "react";

export function useAsyncData<T>(loader: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const run = async () => {
      setLoading(true);
      const result = await loader();
      if (active) {
        setData(result);
        setLoading(false);
      }
    };

    void run();

    return () => {
      active = false;
    };
  }, deps);

  return { data, loading };
}
