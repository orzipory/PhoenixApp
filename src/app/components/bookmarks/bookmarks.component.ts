import { Component, OnInit } from '@angular/core';
import { IRepository } from '../../interfaces/irepository';
import { StorageService } from '../../services/storage.service';
import { listAnimation } from '../../animations/list.animations';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css'],
  animations: [listAnimation]
})
export class BookmarksComponent implements OnInit {

  //#region declerations
  public bookmarks: IRepository[] = [];
  //#endregion

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.bookmarks = this.storageService.getBookmarks();
  }

  onRemoveBookmark(repository: IRepository): void {
    this.bookmarks = this.bookmarks.filter((rep: IRepository) => rep.id != repository.id);
    this.storageService.updateBookmarks(this.bookmarks);
  }
}