import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroCreateComponent } from './hero-create/hero-create.component';
import { HeroViewComponent } from './hero-view/hero-view.component';
const routes: Routes = [
  { path: '', redirectTo: '/heroes', pathMatch: 'full' },
  { path: 'new', component: HeroCreateComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'view/:id', component: HeroViewComponent },
  { path: 'heroes', component: HeroesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
