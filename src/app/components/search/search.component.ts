import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RepositoryService } from '../../services/repository.service';
import { IRepository } from '../../interfaces/irepository';
import { Root, Item } from '../../interfaces/iroot';
import { Subscription, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { StorageService } from '../../services/storage.service';
import { listAnimation } from '../../animations/list.animations';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [listAnimation]
})
export class SearchComponent implements OnInit, OnDestroy {

  //#region declerations
  public form: FormGroup = {} as FormGroup;
  public repositories: IRepository[] = [];
  public bookmarks: IRepository[] = [];
  public isLoading: boolean = false;
  private sub: Subscription = {} as Subscription;
  //#endregion

  constructor(
    private fb: FormBuilder,
    private repositoryService: RepositoryService,
    private storageService: StorageService
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      repositoryName: ''
    });

    this.bookmarks = this.storageService.getBookmarks();

    // subscribe to form control untill every change of the text (key down) 
    this.sub = this.form.controls['repositoryName'].valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(400),
      switchMap((entry: string) => {
        return of(entry)
      })
    )
    .subscribe((newText: string) => {
      this.repositories = [];
      if (newText != "")
        this.getRepositoryByName(newText);
    });
  }

  // get results by name from server
  getRepositoryByName(name: string): void {
    this.isLoading = true;
    this.repositoryService.getRepositoryByName(name).subscribe({
      next: (resultFromServer: IRepository[]) => {  
        resultFromServer.forEach((value: IRepository) => {
          value.isBookmark = this.bookmarks.some(x => x.id == value.id);
          this.repositories.push(value);
        });
        this.isLoading = false;
      },
      error: () => { },
      complete: () => { }
    });
  }

  onSearchClick(): void {
    this.repositories = [];
    let text: string = this.form.controls["repositoryName"].value;
    if (text)
      this.getRepositoryByName(text);
  }

  onBookmark(repository: IRepository): void {
    this.repositories.find((rep: IRepository) => rep.id == repository.id)!.isBookmark = !repository.isBookmark;
    if (this.bookmarks.some(x => x.id == repository.id)) {
      this.bookmarks = this.bookmarks.filter((rep: IRepository) => rep.id != repository.id);
    }
    else {
      this.bookmarks.push(repository);
      this.storageService.updateBookmarks(this.bookmarks);
    }
  }

  // remove live observable
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}