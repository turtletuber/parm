import { useState, useCallback, useLayoutEffect, useEffect } from 'react';

export function useDimensions(hash: string, live = true) {
  const [dimensions, setDimensions] = useState(new DOMRect());
  const [node, setNode] = useState(null as HTMLElement);
  const ref = useCallback(node => {
    setNode(node);
  }, []);
  const captureDimensions = () => node && setDimensions(node.getBoundingClientRect());
  useEffect(() => {
    if (live) {
      window.addEventListener('resize', captureDimensions);
      return () => window.removeEventListener('resize', captureDimensions);
    }
  }, [node, live]);
  useLayoutEffect(() => {
    captureDimensions();
  }, [node, hash]);
  return { ref, dimensions };
}