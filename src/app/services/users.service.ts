import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:  HttpClient) { }

  getUsers(){
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/users');
  }
}
