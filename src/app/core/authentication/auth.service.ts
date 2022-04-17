import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, EMPTY, Observable, of } from 'rxjs';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { LoginData } from 'src/app/shared/models/login-data';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
 public userData: any;
  constructor(private router: Router,
    public afs: AngularFirestore, public afAuth: AngularFireAuth, public ngZone: NgZone) { 
     this.currentUser();
   
  }
  isAuthenticated(): boolean {
    const profile: string | null = localStorage.getItem('user');
    return profile ? true : false;
  }
  login({ email, password }: LoginData) {
    // return this.post<{ data: { access_token: string } }>(`auth/login`, {
    //   email,
    //   password,
    // });
     return (this.afAuth.signInWithEmailAndPassword(email, password));
  }
  register({ email, password }: LoginData) {
    return ( this.afAuth.createUserWithEmailAndPassword(email, password))

  }
    /**
   * logout dashboard by removing local storage
   * in development mode and invalidating cookies
   * in production
   */
     logout() {
      window.localStorage.clear();
      return this.afAuth.signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['auth']);
      })
      // this.post('auth/logout', null).subscribe(
      //   () => {
      //     this.router.navigate(['/auth/login']);
      //   },
      //   (err) => {
      //     this.router.navigate(['/auth/login']);
      //   }
      // );
    }

    currentUser(){
      this.afAuth.authState.subscribe(user => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user')|| '');
        } else {
          localStorage.setItem('user', '');
        }
      })
    
    }
    SetUserData(user:any) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
      let userData: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
      }
      return userRef.set(userData, {
        merge: true
      })
    }
    getCurrentUser(): User | null {
      let profile: string | null = localStorage.getItem('user');
      return (profile ? JSON.parse(profile) : null);
    }
}
