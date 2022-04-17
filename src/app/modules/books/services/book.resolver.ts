import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { catchError, map, Observable, of, EMPTY } from 'rxjs';
import { BookService } from './book.service';

@Injectable({
  providedIn: 'root'
})
export class BookResolver implements Resolve<any> {
  constructor(private bookService: BookService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
   return of  (this.bookService.getBookById(route.paramMap.get('id')).pipe(
      catchError(() => {
        return ('No data');
      })
    ));
}
}
