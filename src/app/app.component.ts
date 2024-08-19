import { Component } from '@angular/core';
import {UsersService} from "./services/users.service";
import {AlbumsService} from "./services/albums.service";
import {combineLatestWith, map} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'untitled';

  data: any;

  constructor(
    private usersService: UsersService,
    private albumsService: AlbumsService
  ) { }

  ngOnInit(){
    this.albumsService.getAlbums().pipe(
      combineLatestWith(this.usersService.getUsers()),
      map(([albums, users]) => {
        return albums.map((album: any) => ({
          ...album,
          user: users.find((user: any) => user.id === album.userId),
        }));
      })
    ).subscribe((data) => {
      this.data = data;
    });
  }
}
