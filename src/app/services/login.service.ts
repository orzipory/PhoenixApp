import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment';
import { ILoginRequest } from '../interfaces/ILoginRequest';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //#region decleations
  private api: string = "";  
  //#endregion

  constructor(private http: HttpClient) {
    this.api = environment.apiUrl + "Login/"
  }

  Authenticate(loginRequest: ILoginRequest): Observable<any> {
    return this.http.post<any>(this.api + "login", loginRequest);
  }
}