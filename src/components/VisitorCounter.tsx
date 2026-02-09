// import process from 'process';
import { useState, useEffect, useRef } from 'react';

// Time threshold in seconds - user must stay this long for visit to count
const VISIT_THRESHOLD_SECONDS = 10;

// CounterAPI.dev configuration
const COUNTER_NAME = import.meta.env.VITE_COUNTER_NAME ;

// Helper to check if session was already counted
const isSessionCounted = () => {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem('sessionCounted') === 'true';
};

// Fetch current count without incrementing
const fetchCount = async (): Promise<number> => {
  try {
    const response = await fetch(
      `https://api.counterapi.dev/v1/${COUNTER_NAME}/visitors/`
    );
    const data = await response.json();
    const value = data.count ?? 0;
    // Cache real value for offline fallback
    localStorage.setItem('visitorCountFallback', value.toString());
    return value;
  } catch {
    // Fallback to last known real value from localStorage
    const stored = localStorage.getItem('visitorCountFallback');
    return stored ? parseInt(stored, 10) : 0;
  }
};

// Increment and fetch new count
const incrementCount = async (): Promise<number> => {
  try {
    const response = await fetch(
      `https://api.counterapi.dev/v1/${COUNTER_NAME}/visitors/up`
    );
    const data = await response.json();
    // Cache real value for offline fallback
    localStorage.setItem('visitorCountFallback', data.count.toString());
    return data.count;
  } catch {
    // If API fails, just return the last known count (don't fake increment)
    const stored = localStorage.getItem('visitorCountFallback');
    return stored ? parseInt(stored, 10) : 0;
  }
};

function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [counted, setCounted] = useState<boolean>(isSessionCounted);
  const [loading, setLoading] = useState<boolean>(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Fetch initial count
    fetchCount().then((initialCount) => {
      setCount(initialCount);
      setLoading(false);
    });

    // If already counted in this session, don't set up timer
    if (counted) return;

    // Set up threshold timer to increment count
    timerRef.current = setTimeout(async () => {
      const newCount = await incrementCount();
      sessionStorage.setItem('sessionCounted', 'true');
      setCount(newCount);
      setCounted(true);
    }, VISIT_THRESHOLD_SECONDS * 1000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [counted]);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mt-4">
        <span className="text-green-400">👁</span>
        <span className="animate-pulse">Loading visitors...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mt-4">
      <span className="text-green-400">👁</span>
      <span>
        Visitors: <span className="text-green-400 font-mono">{count?.toLocaleString() ?? '...'}</span>
      </span>
      {!counted && (
        <span className="text-xs text-gray-600 animate-pulse">
          (counting...)
        </span>
      )}
    </div>
  );
}

export default VisitorCounter;
