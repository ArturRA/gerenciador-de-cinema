import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Filme } from 'src/app/models/filme';
import { FilmeService } from 'src/app/services/filme.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-lista-filme',
  templateUrl: './lista-filme.component.html',
  styleUrls: ['./lista-filme.component.css']
})
export class ListaFilmeComponent implements OnChanges {
  @Input() tabAtual: string = "";
  @Input() paginaAtualLista: number = 1;

  filmes: Filme[] = [];

  constructor(
    private filmeService: FilmeService,
    private localStorageService: LocalStorageService
  ) { }


  ngOnInit() {
    this.carregarFilmes(this.paginaAtualLista);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tabAtual'] && !changes['tabAtual'].firstChange) {
      this.carregarFilmes(this.paginaAtualLista);
    }

    if (changes['paginaAtualLista'] && !changes['paginaAtualLista'].firstChange) {
      console.log("Valor paging na lista:", this.paginaAtualLista);
      this.carregarFilmes(this.paginaAtualLista);
    }
  }

  private carregarFilmes(page: number) {
    this.filmes = [];

    switch (this.tabAtual) {
      case 'Meus favoritos':
        this.filmes = this.localStorageService.carregarFavoritos();
        break;
      case 'Mais populares':
        this.filmeService.selecionarFilmesMaisPopulares(page).subscribe((filmes) => {
          this.filmes = filmes;
        });
        break;
      case 'Mais votados':
        this.filmeService.selecionarFilmesMaisVotados(page).subscribe((filmes) => {
          this.filmes = filmes;
        });
        break;
      default:
        console.error("Erro: tentando carregar uma tab invalida")
        break;
    }
  }
}
