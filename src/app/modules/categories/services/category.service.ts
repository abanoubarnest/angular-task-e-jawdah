import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';
import { Category } from '../../../shared/models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private firestore: AngularFirestore, private toastr: ToastrService,) { }

  getCategories() {
    return this.firestore.collection('/categories').snapshotChanges();
  }
  getID() {
    return this.firestore.collection('categories').get().pipe(
      map(snapshot => snapshot.size)
    )

  }
  addCategory(data: Category) {
    this.getID().subscribe((res: number) => {
      const newId = this.firestore.createId();
      return this.firestore.collection("categories").doc(newId).set({
        name: data.name,
        id: res + 1
      }).then((result: any) => {

        this.toastr.success('Category added successfully');
      }).catch((error) => {
        this.toastr.error(error.message)
      })
    }, error => {
      console.log(error)
    })


  }
  deleteCategory(id: string) {
    this.firestore.collection("categories").doc(id).delete().then((result: any) => {
      this.toastr.success('Category deleted successfully')
    }).catch((error) => {
      this.toastr.error(error.message)
    })
  }
  getSizeBooks(catId: any) {
    return this.firestore.collection('books', ref => ref.where('catId', '==', catId)).get()
      .pipe(
        map(snapshot => snapshot.size)
      )
  }
  updateCategory(id: string, value: any) {
    this.firestore.doc(`categories/${id}`).update({name:value.name}).then((result: any) => {

      this.toastr.success('Category edit successfully');
    }).catch((error) => {
      this.toastr.error(error.message)
    })
  }
}
