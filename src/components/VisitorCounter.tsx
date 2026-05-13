import { useState, useEffect, useRef } from 'react';

// Time threshold in seconds - user must stay this long for visit to count
const VISIT_THRESHOLD_SECONDS = 10;

// Custom Analytics API configuration
const API_URL = 'http://localhost:3001'; // Change this for production deployment

interface VisitorData {
  ip?: string;
  city?: string;
  region?: string;
  country?: string;
  userAgent?: string;
  browser?: string;
  os?: string;
}

// Helper to check if session was already counted
const isSessionCounted = () => {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem('sessionCounted') === 'true';
};

// Fetch current count without incrementing
const fetchCount = async (): Promise<number> => {
  try {
    const response = await fetch(`${API_URL}/stats`);
    if (!response.ok) throw new Error('API error');
    const data = await response.json();
    const value = data.totalVisits ?? 0;
    localStorage.setItem('visitorCountFallback', value.toString());
    return value;
  } catch {
    const stored = localStorage.getItem('visitorCountFallback');
    return stored ? parseInt(stored, 10) : 0;
  }
};

// Increment and fetch new count
const incrementCount = async (): Promise<number> => {
  try {
    // 1. Get visitor details (IP, location, etc.)
    let visitorData: VisitorData = {};
    try {
      const ipRes = await fetch('https://ipapi.co/json/');
      if (ipRes.ok) {
        const ipData = await ipRes.json();
        visitorData = {
          ip: ipData.ip,
          city: ipData.city,
          region: ipData.region,
          country: ipData.country_name
        };
      }
    } catch (error) {
      console.warn('Could not fetch IP details', error);
    }

    // Add browser/OS info
    visitorData.userAgent = navigator.userAgent;
    // Basic browser detection
    let browser = 'Unknown';
    if (navigator.userAgent.includes('Firefox')) browser = 'Firefox';
    else if (navigator.userAgent.includes('Chrome')) browser = 'Chrome';
    else if (navigator.userAgent.includes('Safari')) browser = 'Safari';
    else if (navigator.userAgent.includes('Edge')) browser = 'Edge';
    visitorData.browser = browser;
    
    // Basic OS detection
    let os = 'Unknown';
    if (navigator.userAgent.includes('Win')) os = 'Windows';
    else if (navigator.userAgent.includes('Mac')) os = 'MacOS';
    else if (navigator.userAgent.includes('Linux')) os = 'Linux';
    else if (navigator.userAgent.includes('Android')) os = 'Android';
    else if (navigator.userAgent.includes('like Mac')) os = 'iOS';
    visitorData.os = os;

    // 2. Send to our API
    await fetch(`${API_URL}/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(visitorData)
    });

    // 3. Fetch new total count
    const statsRes = await fetch(`${API_URL}/stats`);
    const stats = await statsRes.json();
    const count = stats.totalVisits;
    
    localStorage.setItem('visitorCountFallback', count.toString());
    return count;
  } catch (error) {
    console.error('Failed to increment count', error);
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
    fetchCount().then((initialCount) => {
      setCount(initialCount);
      setLoading(false);
    });

    if (counted) return;

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
