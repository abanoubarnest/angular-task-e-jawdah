import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private firestore: AngularFirestore) { }
  getTotalCollections(name:string) {
    return this.firestore.collection(name).get();
  }
}
