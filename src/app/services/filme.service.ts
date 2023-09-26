import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {
  private apiUrl = 'https://api.themoviedb.org/3/movie/popular';

  constructor(private http: HttpClient) {}

  getMovies(page: number) {
    const url = `${this.apiUrl}?page=${page}`;
    return this.http.get(url);
  }
}