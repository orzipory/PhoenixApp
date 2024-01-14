import { Injectable } from '@angular/core';
import { IRepository } from '../interfaces/irepository';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  //#region declerations
  public key: string = "bookmarkRepositories";
  //#endregion

  constructor() { }

  // get all bookmark repositories from session storage
  public getBookmarks(): IRepository[] {
    let storage: any = localStorage.getItem(this.key)
    if (storage)
      return JSON.parse(storage) as IRepository[];
    else
      return [];
  }

  // update bookmarks to sesion storage
  updateBookmarks(repositories: IRepository[]): void {
    localStorage.setItem(this.key, JSON.stringify(repositories));
  }

  public isToken(): boolean {
    return localStorage.getItem("token")? true : false;
  }

  public getToken(): any {
    return localStorage.getItem("token");
  }

  public setToken(token: string): void {
    localStorage.setItem("token", token);
  }

  public removeToken(): void {
    localStorage.removeItem("token");
  }
}