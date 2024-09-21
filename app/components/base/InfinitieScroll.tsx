import { ReactNode, useEffect, useRef } from "react";

interface Props {
  children: ReactNode;
  loadMore: () => void;
  hasNextPage: boolean;
}

export const InfiniteScroll = ({
  children,
  loadMore,
  hasNextPage,
}: Props): React.JSX.Element => {
  const loadingRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const loadingElement = loadingRef.current;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        loadMore();
      }
    });

    if (loadingElement) {
      observer.observe(loadingElement);
    }

    return () => {
      if (loadingElement) {
        observer.unobserve(loadingElement);
      }
    };
  }, [loadMore]);
  return (
    <>
      {children}
      {hasNextPage && <div ref={loadingRef}>...</div>}
    </>
  );
};
