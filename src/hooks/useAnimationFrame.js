import { useRef, useEffect, useCallback } from 'react';

/**
 * Runs a callback every animation frame. The callback receives the
 * cumulative elapsed time (in the same units as performance.now()).
 * It does NOT trigger React re-renders — use DOM refs to update visuals.
 */
const useAnimationFrame = (callback) => {
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const callbackRef = useRef(callback);

  callbackRef.current = callback;

  const animate = useCallback((time) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current;
      callbackRef.current(deltaTime, time);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);
};

export default useAnimationFrame;
