export function formatEndsAt(dateString: string):string {
    const today: Date = new Date()
    const endsAt: Date = new Date(dateString)
    if (isNaN(endsAt.getTime())) {
        throw new Error("invalid date format")
    }

    const difference: number = endsAt.getTime() - today.getTime()

    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor(difference % ((1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))

    return `${days}d ${hours}h ${minutes}min`
}