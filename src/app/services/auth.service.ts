import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from "@angular/router";
import firebase from 'firebase/app';

export interface User {
    uid: string;
    displayName: string;
    email: string;
}

@Injectable({
    providedIn: 'root',
})

export class AuthService {
    user$: Observable<User | null | undefined>;

    constructor(
        public afAuth: AngularFireAuth,
        public afs: AngularFirestore, ) {
        // Get auth data, then get firestore user document || null

        this.user$ = this.afAuth.authState.pipe(
            switchMap((user) => {
                if (user) {
                    return this.afs.doc<User>(`user/${user.uid}`).valueChanges();
                } else {
                    return of(null);
                }
            })
        );
    }

    // Login/Signup

    async googleLogin(): Promise<void> {
        const provider = new firebase.auth.GoogleAuthProvider();
        const credential = await this.afAuth.signInWithPopup(provider);
        if (credential.user) {
            this.updateUserData(credential.user as User);
        }
    }

    async signOut(): Promise<void> {
        return this.afAuth.signOut();
    }

    private updateUserData ({
        uid,
        displayName,
        email, }: User): Promise<void> {
        // Sets user data to firestore on Login
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`user/${uid}`);
        const data = {
            uid,
            displayName,
            email,
        };
        return userRef.set(data, { merge: true });
    }

    public getUser()
    {
        return firebase.auth().currentUser?.uid
    }

    public getEmail()
    {
        return firebase.auth().currentUser?.email
    }
}
