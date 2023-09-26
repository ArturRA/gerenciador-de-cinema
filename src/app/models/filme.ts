export class Filme {
  id: number;
  title: string;
  overview: string;
  release_date: string;

  poster_path: string;
  backdrop_path: string;

  vote_count: number;

  genre_ids: number[];
  genres?: string[];

  constructor(id: number, title: string, overview: string, release_date: string, poster_path: string, backdrop_path: string, vote_count: number, genre_ids: number[], genres?: string[]) {
    this.id = id;
    this.title = title;
    this.overview = overview;
    this.release_date = release_date;

    this.poster_path = 'https://image.tmdb.org/t/p/original' + poster_path;
    this.backdrop_path = 'https://image.tmdb.org/t/p/original' + backdrop_path;

    this.vote_count = vote_count;
    this.genre_ids = genre_ids;

    this.genres = genres;
  }
}