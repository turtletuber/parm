import { useState, useCallback, useLayoutEffect, useEffect } from 'react';

export function useDimensions(deps: any[], trackWindowResize = true) {
  const [dimensions, setDimensions] = useState(new DOMRect());
  const [node, setNode] = useState(null as HTMLElement);
  const ref = useCallback(node => {
    setNode(node);
  }, []);
  const captureDimensions = () => node && setDimensions(node.getBoundingClientRect());
  useEffect(() => {
    if (trackWindowResize) {
      window.addEventListener('resize', captureDimensions);
      return () => window.removeEventListener('resize', captureDimensions);
    }
  }, [node, trackWindowResize]);
  useLayoutEffect(() => {
    captureDimensions();
  }, [node, ...deps]);
  return { ref, dimensions };
}