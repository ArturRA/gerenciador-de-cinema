import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginacao',
  templateUrl: './paginacao.component.html',
  styleUrls: ['./paginacao.component.css']
})
export class PaginacaoComponent {
  @Input() currentPage: number = 1;
  @Output() currentPageChange = new EventEmitter<number>();

  totalPages = 4000;

  updateCurrentPage(newPage: number) {
    this.currentPage = newPage;
    this.currentPageChange.emit(this.currentPage);
  }

}