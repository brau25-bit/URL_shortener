export type RequestLog = {
    method: string,
    path: string,
    body?: unknown,
    query?: unknown,
    params?: unknown
}