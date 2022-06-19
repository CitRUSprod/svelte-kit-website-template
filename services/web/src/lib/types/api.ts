export type ApiOptions<T = undefined> = {
    headers?: Headers
} & (T extends undefined ? object : { data: T })

export interface ApiError {
    statusCode: number
    error: string
    message: string
}

export interface ApiResponseInfo {
    status: number
    statusText: string
    headers: Headers
}

export type ApiResponse<T> =
    | [T, undefined, ApiResponseInfo]
    | [undefined, ApiError, ApiResponseInfo]
