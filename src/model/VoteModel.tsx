export interface VoteModel{
    id:number;
    create_at:string;
    user_id:number;
    picture_id:number;
    score:number;
}

export interface VoteChart7Day {
    voteChart: Array<VoteChart[]>;
}

export interface VoteChart {
    vote_id:    number;
    date_time:  string;
    user_id:    number;
    picture_id: number;
    score:      number;
}