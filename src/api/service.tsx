import axios from "axios";
import { UsersGetRespose } from "../model/UserModel";
import { PictureGetResponse } from "../model/PictureModel";

// eslint-disable-next-line react-refresh/only-export-components
const HOST: string = "http://localhost:3000/";

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

  async getAllPicture() {
    const url = HOST + `picture`;
    const response = await axios.get(url);
    const pictures: PictureGetResponse[] = response.data;
    return pictures;
  }

  async getPictureById(id: number) {
    const url = HOST + `picture/${id}`;
    const response = await axios.get(url);
    const user: PictureGetResponse[] = response.data;
    return user;
  }

 
}