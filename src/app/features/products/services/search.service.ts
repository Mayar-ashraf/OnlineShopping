import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  searchText = new BehaviorSubject<String>('');
  constructor() { }
  setSearchText(text: string){
    return this.searchText.next(text);
  }
  getSearchText(): Observable<String>{
    return this.searchText.asObservable();
  }
}
