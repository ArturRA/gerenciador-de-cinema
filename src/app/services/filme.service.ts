import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Filme } from '../models/filme';
import { environment } from 'src/environments/environment.development';
import { LocalStorageService } from './local-storage.service';
import { TrailerFilme } from '../models/trailer-filme';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {
  private apiUrl = 'https://api.themoviedb.org/3/movie/';

  constructor(
    private http: HttpClient,
    private LocalStorage: LocalStorageService
  ) { }

  private obterHeadersAutorizacao = {
    headers: new HttpHeaders({
      'Authorization': environment.API_KEY
    })
  };

  public selecionarPorId(id: string): Observable<Filme> {
    const url = `${this.apiUrl}${id}?language=pt-BR`;

    return this.http
      .get<any>(url, this.obterHeadersAutorizacao)
      .pipe(map((obj: any): Filme => this.mapearFilme(obj)));
  }

  public selecionarTrailersFilmePorId(id: string): Observable<TrailerFilme[]> {
    const url = `${this.apiUrl}${id}/videos?language=pt-BR`;

    return this.http.get<any>(url, this.obterHeadersAutorizacao).pipe(
      map((res: any): any => res.results),
      map((objetos: any[]): TrailerFilme[] => this.mapearTrailersFilme(objetos)));
  }

  private mapearTrailersFilme(data: any[]): TrailerFilme[] {
    return data.map((trailerData: any) => {
      const trailer = new TrailerFilme(
        trailerData.id,
        trailerData.key
      );

      return trailer;
    });
  }

  // public selecionarCreditosFilmePorId(id: number): Observable<CreditosFilme[]> {
  //   const url = `${this.apiUrl}${id}?credits?language=pt-BR`;

  //   return this.http.get<any>(url, this.obterHeadersAutorizacao).pipe();
  //   // map((res: any): any => res.results),
  //   // map((objetos: any[]): CreditosFilme[] => this.mapearTrailersFilme(objetos)));
  // }

  public favoritarFilme(filme: Filme): void {
    this.LocalStorage.favoritar(filme);
  }

  public desfavoritarFilme(filme: Filme): void {
    this.LocalStorage.desfavoritar(filme.id);
  }

  public selecionarFilmesFavoritos(): Filme[] {
    return this.LocalStorage.carregarFavoritos();
  }

  public selecionarFilmesMaisPopulares(pagina: number): Observable<Filme[]> {
    const url = `${this.apiUrl}popular?page=${pagina}&language=pt-BR?`;
    return this.selecionarFilmes(url);
  }

  public selecionarFilmesMaisVotados(pagina: number): Observable<Filme[]> {
    const url = `${this.apiUrl}top_rated?page=${pagina}&language=pt-BR?`;
    return this.selecionarFilmes(url);
  }

  private selecionarFilmes(url: string): Observable<Filme[]> {
    return this.http.get<Filme[]>(url, this.obterHeadersAutorizacao).pipe(
      map((dados: any): any[] => dados.results),
      map((objetos: any[]): Filme[] => this.mapearFilmes(objetos))
    )
  }


  private mapearFilmes(filmesData: any[]): Filme[] {
    return filmesData.map((filmeData: any) => {
      const genreNames = filmeData.genres ? filmeData.genres.map((genre: any) => genre.name) : [];

      const filme = new Filme(
        filmeData.id,
        filmeData.title,
        filmeData.overview,
        filmeData.release_date,
        filmeData.poster_path,
        filmeData.vote_count,
        genreNames
      );

      return filme;
    });
  }

  private mapearFilme(filmeData: any): Filme {
    const genreNames = filmeData.genres ? filmeData.genres.map((genre: any) => genre.name) : [];

    const filme = new Filme(
      filmeData.id,
      filmeData.title,
      filmeData.overview,
      filmeData.release_date,
      filmeData.poster_path,
      filmeData.vote_count,
      genreNames
    );

    return filme;
  }


}