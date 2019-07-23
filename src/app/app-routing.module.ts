import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'create-book', loadChildren: './pages/book-form/book-form.module#BookFormPageModule' },
  { path: 'update-book/:id', loadChildren: './pages/book-form/book-form.module#BookFormPageModule' },
  { path: 'book-details/:id', loadChildren: './pages/book-details/book-details.module#BookDetailsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
