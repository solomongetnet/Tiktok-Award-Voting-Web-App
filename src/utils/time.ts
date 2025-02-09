export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function calculateTimeLeft(endDate: Date): TimeLeft | null {
  const now = new Date();
  const timeDiff = endDate.getTime() - now.getTime();

  if (timeDiff <= 0) return null; // No time left, event is over

  const days = Math.floor(timeDiff / (1000 * 3600 * 24));
  const hours = Math.floor((timeDiff % (1000 * 3600 * 24)) / (1000 * 3600));
  const minutes = Math.floor((timeDiff % (1000 * 3600)) / (1000 * 60));
  const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}
