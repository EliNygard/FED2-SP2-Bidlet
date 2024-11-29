export function calculateTimeRemaining(dateString: string): string {
  const today: Date = new Date();
  const endsAt: Date = new Date(dateString);
  if (isNaN(endsAt.getTime())) {
    throw new Error("invalid date format");
  }

  const difference: number = endsAt.getTime() - today.getTime();

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  return `${days}d ${hours}h ${minutes}min`;
}

export function formatDate(dateString: string): string {
    const endsAt = dateString
    const date = new Date(endsAt)
    const year = date.getFullYear()
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const monthIndex = date.getMonth()
    const day = date.getDate()
    const month = monthNames[monthIndex]

    return `${day} ${month} ${year}`
}

export function formatDateAndTime(dateString: string): string {
  const value = dateString
  const date = new Date(value)
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const hour = date.getHours()
  const minutes = date.getMinutes()

  return `${day}.${month}.${year} - ${hour}:${minutes}`
}
