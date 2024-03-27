import axios from "axios";
import { UsersGetRespose } from "../model/UserModel";
import { PictureGetRanking, PictureGetRankingYesterDay, PictureGetResponse } from "../model/PictureModel";
import { VoteChart7Day, VoteModel } from "../model/VoteModel";

// eslint-disable-next-line react-refresh/only-export-components
const HOST: string = "https://facemash-api-1-kkxs.onrender.com/";

export class Service {

  async getAllUser() {
    const url = HOST + `user`;
    const response = await axios.get(url);
    const users: UsersGetRespose[] = response.data;
    return users;
  }


  async getUserById(id: number) {
    const url = HOST + `user/idx?id=${id}`;
    const response = await axios.get(url);
    const user: UsersGetRespose[] = response.data;
    return user;
  }

  async postPictureOnFireBase(file:FormData) {
    const url = HOST + `image/`;
    const response = await axios.post(url,file);
    const res = response.data
    console.log(res);
    return (res)
  }

  async postUserRegister(body: { name: string | undefined; email: string | undefined; password: string | undefined; picture: string; role: number; }) {
    const url = HOST + `user/`;
    const response = await axios.post(url,body);
    const res = response.data
    console.log(res);
   
  }

  async putUserEdit(body: { name: string | undefined; email: string | undefined; picture: string | undefined },id:number) {
    const url = HOST + `user/edit/${id}`;
    const response = await axios.put(url,body);
    const res = response.data
    console.log(res);
    
  }

  async putUserPassword(body: { password: string | undefined},id:number) {
    const url = HOST + `user/edit/${id}`;
    const response = await axios.put(url,body);
    const res = response.data
    console.log(res);
    
  }

  async getAllPicture() {
    const url = HOST + `picture`;
    const response = await axios.get(url);
    const pictures: PictureGetResponse[] = response.data;
    return pictures;
  }

  async getPictureRanking() {
    const url = HOST + `picture/rankToday`;
    const response = await axios.get(url);
    const pictures: PictureGetRanking[] = response.data;
    return pictures;
  }

  async getPictureRankingYesterday() {
    const url = HOST + `picture/rankYesterday`;
    const response = await axios.get(url);
    const pictures: PictureGetRankingYesterDay[] = response.data;
    return pictures;
  }

  async getPictureRankingYesterdayByPictureId(picture_id:number) {
    const url = HOST + `picture/rankYesterday/${picture_id}`;
    const response = await axios.get(url);
    const pictures: PictureGetRankingYesterDay = response.data;
    return pictures;
  }

  async getPictureById(id: number) {
    const url = HOST + `picture/${id}`;
    const response = await axios.get(url);
    const picture: PictureGetResponse[] = response.data;
    return picture;
  }

  async getPictureByUID(id: number) {
    const url = HOST + `picture/uid/${id}`;
    const response = await axios.get(url);
    const user: PictureGetResponse[] = response.data;
    return user;
  }


  async postPicture(body:{ name:string | undefined; score:number | undefined; user_id:number | undefined; path:string|undefined}) {
    const url = HOST + `picture/`;
    const response = await axios.post(url,body);
    const res = response.data
    console.log(res);
    return (res)
  }

  async deletePictureById(id:number) {
    const url = HOST + `picture/${id}`;
    const response = await axios.delete(url);
    const res = response.data
    console.log(res);
    
  }

  async updatePictureById(body:{ name:string | undefined; score:number | undefined; path:string|undefined},id:number) {
    const url = HOST + `picture/edit/${id}`;
    const response = await axios.put(url,body);
    const res = response.data
    console.log(res);
    
  }

  async getVoteAll() {
    const url = HOST + `vote/`;
    const response = await axios.get(url);
    const vote: VoteModel[] = response.data;
    return vote;
  }

  async getVoteById(id: number) {
    const url = HOST + `vote/${id}`;
    const response = await axios.get(url);
    const user: VoteModel[] = response.data;
    return user;
  }

  async deleteVoteByPictureId(id:number) {
    const url = HOST + `vote/edit/null/${id}`;
    const response = await axios.put(url);
    const res = response.data
    console.log(res);
    
  }

  // async getPictureScore7Day(id: number) {
  //   const url = HOST + `vote/picture/${id}`;
  //   const response = await axios.get(url);
  //   const user: VoteModel[] = response.data;
  //   return user;
  // }

  async getPictureScore7Day(id: number) {

      const url = HOST + `vote/picture/${id}`;
      const response = await axios.get(url);
      const vote7day: VoteChart7Day = response.data;
      return vote7day;
  }


  async postVotePicture(body:{ user_id:number | undefined; picture_id:number | undefined; score:number | undefined}) {
    const url = HOST + `vote/`;
    const response = await axios.post(url,body);
    const res = response.data
    console.log(res);
    return (res)
  }

  async updatePictureScore(body:{ score:number | undefined},id:number) {
    const url = HOST + `picture/edit/${id}`;
    const response = await axios.put(url,body);
    const res = response.data
    console.log(res);
    return (res)
  }

  async deletePictureOnFirebase(path:string) {
    const url = HOST + `image/paths?path=`+path;
    console.log("URL: "+url);
    const response = await axios.delete(url);
    const res = response.data
    console.log(res);
    return (res)
  }
 
}