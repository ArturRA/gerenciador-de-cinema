export class Filme {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  poster_path: string;
  vote_count: number;
  genres?: string[];

  constructor(id: number, title: string, overview: string, release_date: string, poster_path: string, vote_count: number, genres?: string[]) {
    this.id = id;
    this.title = title;
    this.overview = overview;
    this.release_date = release_date;
    this.poster_path = 'https://image.tmdb.org/t/p/original' + poster_path;
    this.vote_count = vote_count;
    this.genres = genres;
  }
}