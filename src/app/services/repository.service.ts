import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRepository } from '../interfaces/irepository';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  //#region decleations
  private api: string = "";  
  //#endregion

  constructor(private http: HttpClient) {
    this.api = environment.apiUrl + "Repository/"
  }

  getRepositoryByName(name: string): Observable<IRepository[]> {
    return this.http.get<IRepository[]>(this.api + "GetRepositoryByName?text=" + name);
  }
}