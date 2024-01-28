import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  User,
} from 'firebase/auth';
import {
  BehaviorSubject,
  catchError,
  from,
  Observable,
  switchMap,
  throwError,
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);

  constructor(
    private afAuth: AngularFireAuth,
    private googleAuthProvider: GoogleAuthProvider
  ) {
    this.authStatus();
  }

  signInWithGoogle() {
    return this.afAuth.signInWithRedirect(this.googleAuthProvider);
  }

  signOut() {
    return this.afAuth.signOut().then(() => {
      // Supprimer le token du local storage lors de la déconnexion
      localStorage.removeItem('userToken');
    });
  }

  getToken(): string | null {
    return localStorage.getItem('userToken');
  }

  refreshToken() {
    this.afAuth.currentUser.then((user) => {
      user?.getIdToken(true).then((token) => {
        console.log(token);
        this.setTokenInLocalStorage(token);
      });
    });
  }

  isAuthenticated(): Observable<boolean> {
    return this.userSubject.pipe(
      switchMap((user) => {
        return new Observable<boolean>((observer) => {
          observer.next(!!user);
          observer.complete();
        });
      })
    );
  }

  private authStatus() {
    this.afAuth.authState
      .pipe(
        switchMap((user) => {
          if (user) {
            return user.getIdToken().then((token) => {
              this.setTokenInLocalStorage(token);
              return user;
            });
          } else {
            this.signOut();
            return Promise.resolve(null);
          }
        }),
        catchError((error) => {
          console.error('Error during authentication state change', error);
          return Promise.resolve(null);
        })
      )
      .subscribe((user) => {
        this.userSubject.next(user as User);
      });
  }

  private setTokenInLocalStorage(token: string) {
    // Stocker le token dans le local storage
    localStorage.setItem('userToken', token);
  }
}
