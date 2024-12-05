export class ApiError extends Error {
    status: number
    statusText: string
    messages: string

    constructor(status: number, statusText: string, messages: string) {
        super(messages)
        this.status = status
        this.statusText = statusText
        this.messages = messages
    }
}