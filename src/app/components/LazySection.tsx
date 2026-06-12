import type { ReactNode } from "react";
import { useInView } from "react-intersection-observer";

interface LazySectionProps {
  children: ReactNode;
}

export default function LazySection({ children }: LazySectionProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px", 
  });

  return (
    <div ref={ref}>
      {inView ? children : null}
    </div>
  );
}