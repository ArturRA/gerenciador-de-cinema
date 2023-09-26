import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaFilmeComponent } from './shared/lista-filme/lista-filme.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { DetalhesFilmeComponent } from './pages/detalhes-filme/detalhes-filme.component';
import { PaginacaoComponent } from './shared/paginacao/paginacao.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardFilmeComponent } from './shared/card-filme/card-filme.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListaFilmeComponent,
    HomeComponent,
    DetalhesFilmeComponent,
    PaginacaoComponent,
    CardFilmeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,

    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
