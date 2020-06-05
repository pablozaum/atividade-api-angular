import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CarrosComponent } from './pages/carros/carros.component';
import { MotosComponent } from './pages/motos/motos.component';

const routes: Routes = [
   { path: 'home', component: HomeComponent },
     { path: 'carros', component: CarrosComponent },
       { path: 'motos', component: MotosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
