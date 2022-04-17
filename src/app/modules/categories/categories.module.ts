import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryListComponent } from './pages/category-list/category-list.component';
import { SharedModule } from '../../shared/shared.module';
import { AddAndEditCategoryComponent } from './pages/add-and-edit-category/add-and-edit-category.component';


@NgModule({
  declarations: [
    CategoryListComponent,
    AddAndEditCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule.forRoot(),
  ]
})
export class CategoriesModule { }
