import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  //#region declerations
  private _loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loggenIn$: Observable<boolean> = this._loggedIn.asObservable();
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
  	//update loggedin status in _loggedIn stream. 
  	this._loggedIn.next(value);
  }

  public isLoggedIn(): boolean {
    return this._loggedIn.value;
  }
}