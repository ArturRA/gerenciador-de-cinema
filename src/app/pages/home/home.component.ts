import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  tabAtual: string = 'Meus favoritos';
  paginaAtualHome = 1;

  selectOption(tabSelecionada: string): void {
    this.tabAtual = tabSelecionada;
    this.paginaAtualHome = 1;
  }

  onCurrentPageChange(newPage: number) {
    this.paginaAtualHome = newPage;
    console.log("pagina home:", this.paginaAtualHome);
  }
}
