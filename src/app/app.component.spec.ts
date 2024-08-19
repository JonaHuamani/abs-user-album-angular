import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { AppComponent } from './app.component';
import { UsersService } from './services/users.service';
import { AlbumsService } from './services/albums.service';
import { of } from 'rxjs';
import { Album } from './services/albums.service';
import { User } from './services/users.service';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let usersServiceMock: jasmine.SpyObj<UsersService>;
  let albumsServiceMock: jasmine.SpyObj<AlbumsService>;

  beforeEach(async () => {
    const usersSpy = jasmine.createSpyObj('UsersService', ['getUsers']);
    const albumsSpy = jasmine.createSpyObj('AlbumsService', ['getAlbums']);

    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: UsersService, useValue: usersSpy },
        { provide: AlbumsService, useValue: albumsSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    usersServiceMock = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
    albumsServiceMock = TestBed.inject(AlbumsService) as jasmine.SpyObj<AlbumsService>;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should combine albums with users and update the data', () => {
    const dummyUsers: User[] = [
      { id: 1, name: 'John Doe', username: 'johndoe', email: 'john.doe@example.com', address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } }, phone: '', website: '', company: { name: '', catchPhrase: '', bs: '' } },
      { id: 2, name: 'Jane Doe', username: 'janedoe', email: 'jane.doe@example.com', address: { street: '', suite: '', city: '', zipcode: '', geo: { lat: '', lng: '' } }, phone: '', website: '', company: { name: '', catchPhrase: '', bs: '' } }
    ];

    const dummyAlbums: Album[] = [
      { userId: 1, id: 1, title: 'Album 1' },
      { userId: 2, id: 2, title: 'Album 2' }
    ];

    usersServiceMock.getUsers.and.returnValue(of(dummyUsers));
    albumsServiceMock.getAlbums.and.returnValue(of(dummyAlbums));

    component.ngOnInit();

    expect(component.data.length).toBe(2);
    expect(component.data[0].user).toEqual(dummyUsers[0]);
    expect(component.data[1].user).toEqual(dummyUsers[1]);
  });

  it('should render combined data in the template', fakeAsync(() => {
    const dummyUsers: User[] = [
      { id: 1, name: 'John Doe', username: 'johndoe', email: 'john.doe@example.com', address: { street: '', suite: '', city: 'New York', zipcode: '', geo: { lat: '', lng: '' } }, phone: '', website: '', company: { name: '', catchPhrase: '', bs: '' } },
      { id: 2, name: 'Jane Doe', username: 'janedoe', email: 'jane.doe@example.com', address: { street: '', suite: '', city: 'Los Angeles', zipcode: '', geo: { lat: '', lng: '' } }, phone: '', website: '', company: { name: '', catchPhrase: '', bs: '' } }
    ];

    const dummyAlbums: Album[] = [
      { userId: 1, id: 1, title: 'Album 1' },
      { userId: 2, id: 2, title: 'Album 2' }
    ];

    usersServiceMock.getUsers.and.returnValue(of(dummyUsers));
    albumsServiceMock.getAlbums.and.returnValue(of(dummyAlbums));

    component.ngOnInit();

    tick();

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const tableRows = compiled.querySelectorAll('tbody tr');

    expect(tableRows.length).toBe(2);

    const firstRowColumns = tableRows[0].querySelectorAll('td');
    expect(firstRowColumns[0].textContent).toContain('Album 1');
    expect(firstRowColumns[1].textContent).toContain('johndoe');
    expect(firstRowColumns[2].textContent).toContain('New York');
    expect(firstRowColumns[3].textContent).toContain('john.doe@example.com');
  }));
});
