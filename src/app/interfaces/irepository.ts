export interface IResult {
    total: number;
    items: IRepository;
}

export interface IRepository {
    id: number;
    name: string;
    avatar: string;
    isBookmark: boolean;
}