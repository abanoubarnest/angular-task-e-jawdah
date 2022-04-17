import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private firestore: AngularFirestore,) { }
  getBookByCategory(catId:any){
    return this.firestore.collection('books', ref => ref.where('catId', '==', catId)).valueChanges({ idField: 'docId' })
    // .pipe(
    //   map((e:any) => {
    //     return {
    //       id: e.payload.doc.id,
    //       catId: e.payload.doc.data()['catId'],
    //       name: e.payload.doc.data()['name'],
    //       price: e.payload.doc.data()['price'],
    //       stock: e.payload.doc.data()['stock'],
          
    //     }
    //   })
    // )
  }
  getBookById(Id:string){
     return this.firestore.collection('books').doc(Id).valueChanges()
  }
}
