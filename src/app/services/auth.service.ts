import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/user.model';
import { FirebaseService } from './firebase.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firebaseService: FirebaseService,
    private userService: UserService
  ) {
    afAuth.authState.subscribe((state) => {
      if (state) {
        this.firebaseService.getUser(state.email).then((users) => {
          if (users?.length) this.userService.setUser(users[0]);
        });
      } else {
        this.userService.setUser(null);
      }
    });
  }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.afAuth.signOut();
  }

  signUp(user: User, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(user.email, password)
      .then(() => {
        this.firebaseService.postUser(user);
        this.userService.setUser(user);
      });
  }
}
