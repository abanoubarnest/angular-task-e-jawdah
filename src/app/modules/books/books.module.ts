import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookListComponent } from './pages/book-list/book-list.component';
import { BookDetailsComponent } from './pages/book-details/book-details.component';
import { HttpClientModule } from '@angular/common/http';
import { BookComponent } from './pages/book/book.component';


@NgModule({
  declarations: [
    BookListComponent,
    BookDetailsComponent,
    BookComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    HttpClientModule,
    SharedModule.forRoot(),
  ]
})
export class BooksModule { }
