import { Component, Input } from '@angular/core';
import { Filme } from 'src/app/models/filme';

@Component({
  selector: 'app-card-filme',
  templateUrl: './card-filme.component.html',
  styleUrls: ['./card-filme.component.css']
})
export class CardFilmeComponent {
  @Input() filme: Filme = {
    id: 0,
    title: '',
    overview: '',
    poster_path: '',
    release_date: '',
    vote_count: 0,
    genres: [],
  };
}
