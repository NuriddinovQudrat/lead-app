export interface UserDetail {
    id: number;
    username: string;
}

export interface AuthTokenProps {
    token: string;
    user?: UserDetail;
}
