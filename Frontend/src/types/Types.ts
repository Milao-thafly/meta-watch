export type ApiResponse<TData> = {
    message: string;
    data: TData;
}


export type User = {
    email: string;
    pseudo: string;
    created_at: string;
}