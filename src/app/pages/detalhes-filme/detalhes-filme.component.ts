import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Filme } from 'src/app/models/filme';
import { TrailerFilme } from 'src/app/models/trailer-filme';
import { FilmeService } from 'src/app/services/filme.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-detalhes-filme',
  templateUrl: './detalhes-filme.component.html',
  styleUrls: ['./detalhes-filme.component.css']
})
export class DetalhesFilmeComponent {
  idFilme: string;
  filme: Filme;
  trailers: TrailerFilme[] = []

  constructor(
    private filmeService: FilmeService,
    private localStorageService: LocalStorageService,
    private toastrService: ToastrService) {
    this.idFilme = '';
    this.filme = new Filme(0, '', '', '', '', 0, [],);
  }

  ngOnInit(): void {
    const urlAtual = new URL(window.location.href);
    this.idFilme = urlAtual.searchParams.get("id") as string;

    this.filmeService.selecionarPorId(this.idFilme).subscribe((filme) => {
      this.filme = filme;
    });

    this.filmeService.selecionarTrailersFilmePorId(this.idFilme).subscribe((trailer) => {
      this.trailers = trailer;
    });
  }

  atualizarFavoritos() {
    if (!this.filme) {
      return;
    }

    const filmeNoLocalStorage = this.localStorageService.selecionarPorId(this.filme.id);

    if (filmeNoLocalStorage) {
      this.localStorageService.desfavoritar(this.filme.id);
    } else {
      this.localStorageService.favoritar(this.filme);
    }

    const message = filmeNoLocalStorage ? 'removido' : 'adicionado';
    this.toastrService.success(`Filme ${message} dos favoritos.`);
  }

  filmeEstaNosFavoritos(): boolean {
    return this.localStorageService.selecionarPorId(this.filme.id) !== undefined;
  }
}
