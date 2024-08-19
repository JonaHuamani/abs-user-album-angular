import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { AlbumsService, Album } from './albums.service';

describe('AlbumsService', () => {
  let service: AlbumsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AlbumsService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });

    service = TestBed.inject(AlbumsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve albums from the API via GET', () => {
    const dummyAlbums: Album[] = [
      { userId: 1, id: 1, title: 'Album 1' },
      { userId: 2, id: 2, title: 'Album 2' },
    ];

    service.getAlbums().subscribe(albums => {
      expect(albums.length).toBe(2);
      expect(albums).toEqual(dummyAlbums);
    });

    const req = httpMock.expectOne('https://jsonplaceholder.typicode.com/albums');
    expect(req.request.method).toBe('GET');
    req.flush(dummyAlbums);
  });
});
