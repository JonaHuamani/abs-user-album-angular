import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    }
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  }
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:  HttpClient) { }

  getUsers(){
    return this.http.get<User[]>('https://jsonplaceholder.typicode.com/users');
  }
}
