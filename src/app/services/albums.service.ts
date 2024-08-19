import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  constructor(private http: HttpClient) { }

  getAlbums(){
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/albums');
  }
}
