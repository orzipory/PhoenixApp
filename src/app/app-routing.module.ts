import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './services/auth.guard';

import { LoginComponent } from './components/login/login.component';
import { SearchComponent } from './components/search/search.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';

const routes: Routes = [
  { path: '' , redirectTo: 'search' , pathMatch: 'full' },
  { path: 'login' , component: LoginComponent },
  { path: 'search' , component: SearchComponent , canActivate:[AuthGuard] },
  { path: 'bookmarks' , component: BookmarksComponent , canActivate:[AuthGuard] },
  { path: '**' , redirectTo: 'search' , pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
