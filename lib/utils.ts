export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDuration(seconds: number): string {
  if (!seconds) return "0s";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
}

export function getIntentColor(intent: string): string {
  const colors: Record<string, string> = {
    appointment: "bg-blue-100 text-blue-800",
    emergency: "bg-red-100 text-red-800",
    booking: "bg-green-100 text-green-800",
    enquiry: "bg-yellow-100 text-yellow-800",
    general: "bg-gray-100 text-gray-800",
  };
  return colors[intent] || colors.general;
}