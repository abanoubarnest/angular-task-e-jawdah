import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './pages/book-details/book-details.component';
import { BookListComponent } from './pages/book-list/book-list.component';
import { BookComponent } from './pages/book/book.component';
import { BookResolver } from './services/book.resolver';

const routes: Routes = [
  {
    path: '',
    component: BookComponent,
    children: [
      {
        path: '',
        component: BookListComponent,
      },
      {
        path: 'details/:id',
        component: BookDetailsComponent,
        resolve: { bookData: BookResolver }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksRoutingModule { }
