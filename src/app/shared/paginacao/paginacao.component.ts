import { Component } from '@angular/core';
import { FilmeService } from 'src/app/services/filme.service';

@Component({
  selector: 'app-paginacao',
  templateUrl: './paginacao.component.html',
  styleUrls: ['./paginacao.component.css']
})
export class PaginacaoComponent {
  movies: any[] = [];
  currentPage = 1;
  totalPages = 40226;

  constructor(private filmeService: FilmeService) { }

  ngOnInit(): void {
    this.fetchMovies(this.currentPage);
  }

  fetchMovies(page: number) {
    this.filmeService.getMovies(page).subscribe((data: any) => {
      this.movies = data.results;
    });
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.fetchMovies(this.currentPage);
  }
}
