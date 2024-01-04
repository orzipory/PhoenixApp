import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// service
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';

// components
import { LoginComponent } from './components/login/login.component';
import { SearchComponent } from './components/search/search.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';

import { MaterialModule } from './shared/material.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    BookmarksComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [ 
  	AuthService,
  	AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
