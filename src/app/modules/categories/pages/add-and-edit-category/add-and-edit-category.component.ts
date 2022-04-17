import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/shared/models/category';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-add-and-edit-category',
  templateUrl: './add-and-edit-category.component.html',
  styleUrls: ['./add-and-edit-category.component.scss']
})
export class AddAndEditCategoryComponent implements OnInit {
  categoryModel: Category = new Category();

  constructor(private categoryService: CategoryService, public dialogRef: MatDialogRef<AddAndEditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    if (this.data && this.data.item) {
      this.categoryModel = this.data['item'];
      this.categoryModel['countOfBooks']=0;
      this.getCountBooks()
    }
 
  }
  save() {
    this.dialogRef.close(this.categoryModel);

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  getCountBooks(){
    this.categoryService.getSizeBooks(this.categoryModel.id).subscribe(data => {
      if (data)
        this.categoryModel['countOfBooks'] = data;
    }, error => {

      console.log(error);

    })
  }
}
