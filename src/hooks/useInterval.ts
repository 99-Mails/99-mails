import { useEffect, useRef } from "react";

export default function useInterval(callback: any, delay: number) {
  const callbacRef = useRef();

  useEffect(() => {
    callbacRef.current = callback;
  });

  useEffect(() => {
    if (!delay) {
      return () => {};
    }

    const interval = setInterval(() => {
      // @ts-ignore
      callbacRef.current && callbacRef.current();
    }, delay);
    return () => clearInterval(interval);
  }, [delay]);
}
