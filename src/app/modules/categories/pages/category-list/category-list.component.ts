import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from '../../services/category.service';
import { AddAndEditCategoryComponent } from '../add-and-edit-category/add-and-edit-category.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = ['id', 'name', 'edit'];
  items: any;
  dataSource: MatTableDataSource<any>;
  loading = false;
  constructor(public dialog: MatDialog, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }
  createCatalog(obj: any) {

    this.categoryService.addCategory(obj);
    //this.getCategories();

  }
  editCategory(item: any) {
    this.openDialog(item)
  }
  deleteCategory(item: any) {
    this.categoryService.deleteCategory(item.primaryId);
  }
  getCategories() {
    this.loading = true;
    this.categoryService.getCategories().subscribe(data => {
      this.items = data.map((e: any) => {
        return {
          primaryId: e.payload.doc.id,
          id: e.payload.doc.data()['id'],
          name: e.payload.doc.data()['name'],
        }
      })
      this.dataSource = new MatTableDataSource(this.items);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = false;
    }, error => {
      this.loading = false;
      console.log(error);

    })
  }
  openDialog(row?: any) {
    const dialogRef = this.dialog.open(AddAndEditCategoryComponent, {
      width: '40%',
      height: 'auto',
      panelClass: 'open-dialog',
      data: {
        title: row ? 'Edit Category' : 'Add Category',
        item: row ? JSON.parse(JSON.stringify(row)) : null,
      },
    });
    // after close
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (row) {
       //   row = result;
          this.updateCategory(row.primaryId, result)

        }
        else {
          this.createCatalog(result)
        }
      }
    });
  }
  updateCategory(id: string, item: any) {
    this.categoryService.updateCategory(id, item)
  }

}
