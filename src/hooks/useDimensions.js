import { useState, useCallback, useRef, useEffect } from 'react';

const useDimensions = () => {
  const ref = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const observe = useCallback((node) => {
    ref.current = node;
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setDimensions({ width, height });
    });
    ro.observe(node);
    return () => ro.disconnect();
  }, [ref.current]);

  return { observe, ...dimensions };
};

export default useDimensions;
