import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [{
  path: '',
  redirectTo: 'pages/home',
  pathMatch: 'full',
},
{
  path: 'pages/home',
  component: HomeComponent,
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
