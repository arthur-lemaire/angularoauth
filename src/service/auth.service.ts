import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private googleAuthProvider : GoogleAuthProvider ) {}

  signInWithGoogle() {
    return this.afAuth.signInWithPopup(this.googleAuthProvider);
  }

  signOut() {
    return this.afAuth.signOut();
  }
}
