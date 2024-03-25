export interface PictureGetResponse{
    id:number;
    name:string;
    score:number;
    user_id:number;
    path:string;
}

export interface PictureGetRanking{
    ranking:number;
    id:number;
    name:string;
    score:number;
    user_id:number;
    path:string;
}

export interface PictureGetRankingYesterDay{
    id: number,
    vote_at: string,
    user_id: number,
    picture_id: number,
    score: number,
    ranking: number,
    name: string,
    path: string
}