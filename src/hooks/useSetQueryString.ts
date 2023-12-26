import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const useQueryString = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const setQueryString = useCallback(
    (params: Record<string, string | string[]>) => {
      const newSearchParams = new URLSearchParams(searchParams);

      for (const [key, value] of Object.entries(params)) {
        if (value) {
          newSearchParams.set(
            key,
            Array.isArray(value) ? value.join(",") : value,
          );
        } else {
          newSearchParams.delete(key);
        }
      }

      // Update the URL without reloading the page
      router.replace(`${pathname}?${newSearchParams.toString()}`);
    },
    [searchParams, router, pathname],
  );

  return [searchParams, setQueryString] as const;
};

export default useQueryString;
