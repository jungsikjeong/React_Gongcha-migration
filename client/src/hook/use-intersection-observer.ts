import { RefObject, useEffect, useState } from 'react';

function useIntersectionObserver(
  elementRef: RefObject<Element>,
  { threshold = 0.1, root = null, rootMargin = '0%' }
) {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    // 관찰할 값
    const node = elementRef?.current;
    // 현재 브라우저가 옵저버를 지원하는지 체크
    const hasIOSupport = !!window.IntersectionObserver;

    if (!node || !hasIOSupport) return;

    const obserParams = { threshold, root, rootMargin };
    const observer = new IntersectionObserver(updateEntry, obserParams);

    observer.observe(node);

    return () => observer.disconnect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef?.current, root, rootMargin, JSON.stringify(threshold)]);

  return entry;
}

export default useIntersectionObserver;
