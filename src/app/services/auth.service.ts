import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  //#region declerations
  public loggenIn$ = new BehaviorSubject(false);
  //#endregion

  constructor() { 
    if (this.hasToken()) {
      this.setLoggedIn(true);
    }
    else {
      this.setLoggedIn(false);
    }
  }

  public hasToken(): boolean {

  	//chack user has a token
  	if (localStorage.getItem('token')) {
  		return true;
  	}
    else {
  		return false;
  	}
  }

  public setLoggedIn(value: boolean){
  	//update loggedin status in loggedIn$ stream. 
  	this.loggenIn$.next(value);
  }
}