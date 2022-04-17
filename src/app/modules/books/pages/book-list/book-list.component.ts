import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/modules/categories/services/category.service';
import { Book } from 'src/app/shared/models/book';
import { Category } from 'src/app/shared/models/category';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  categoryList: any[] = [];
  bookList: Book[] = [];
  selectCategory='';
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['name', 'price','stock'];
  items: any;
  dataSource: MatTableDataSource<any>;
  loading = false;
  constructor(private categoryService: CategoryService, private bookService: BookService, private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCategories();
  }
  getCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categoryList = data.map((e: any) => {
        return {
          primaryId: e.payload.doc.id,
          id: e.payload.doc.data()['id'],
          name: e.payload.doc.data()['name'],
        }
      })
    }, error => {
      console.log(error);

    })
  }
  onChange(item: Category) {
    this.getBooks(item.id);
  }
  getBooks(id: any) {
    this.loading = true;
    this.bookService.getBookByCategory(id).subscribe((data: any) => {
      if (data) {
        this.bookList = data;
        this.dataSource = new MatTableDataSource(this.bookList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      this.loading = false;
    }, error => {
      this.loading = false;

      console.log(error);

    })
  }
  bookDetails(item:any){
    this.router.navigate([]).then(result => {  window.open(`/books/details/`+item.docId, '_blank'); });
    
  }
}
