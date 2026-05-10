'use client';

/**
 * HeaderClock is isolated as a Client Component because it uses
 * setInterval to tick — we don't want to make the whole Header
 * a Client Component just for one updating piece of text.
 * This is the "smallest possible client boundary" pattern from the Next.js docs.
 */

import { useEffect, useState } from 'react';

export default function HeaderClock() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    // Format time in Bloomberg style: HH:MM:SS TZ
    const format = () => {
      const now = new Date();
      return now.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
      });
    };

    setTime(format());
    const interval = setInterval(() => setTime(format()), 1000);

    return () => clearInterval(interval);
  }, []);

  // Render nothing on server to avoid hydration mismatch
  if (!time) return null;

  return <span>{time}</span>;
}
