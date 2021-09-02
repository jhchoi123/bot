export interface AbstractResponseData {
    ErrorCode: number,
    ThrottleSeconds: number,
    ErrorStatus: string,
    Message: string,
    MessageData: object,
    DetailedErrorTrace: string
}