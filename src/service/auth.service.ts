import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, User } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private googleAuthProvider : GoogleAuthProvider ) {}

  signInWithGoogle() {
    return this.afAuth.signInWithPopup(this.googleAuthProvider).then((result) => {
      // Stocker le token dans le local storage
      this.setTokenInLocalStorage(result.user as User);
    });
  }

  signOut() {
    return this.afAuth.signOut()
      .then(() => {
        // Supprimer le token du local storage lors de la déconnexion
        localStorage.removeItem('userToken');
      });
  }

  private setTokenInLocalStorage(user: User) {
    user.getIdToken().then((token) => {
      // Stocker le token dans le local storage
      localStorage.setItem('userToken', token);
    });
  }

  getToken(): string | null {
    return localStorage.getItem('userToken');
  }
}
