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
        public afs: AngularFirestore,
        public router: Router ) {
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
        this.router.navigate(['/'])
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

    public getUsername()
    {
        return firebase.auth().currentUser?.displayName
    }

    public deleteAccount() {
        var confirm: any = window.confirm("Are you sure you want to delete your account?");
        // this.googleLogin();
        // var username: any = firebase.auth().currentUser?.email;
        // var password: any = prompt("Confirm your password:");
        if (confirm == true) {
            const db = firebase.firestore();
            db.collection('books').where("uid", "==", firebase.auth().currentUser?.uid)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.data().docId == undefined) {
                        db.collection(doc.data().category).doc(doc.id).update({
                            'docId': doc.id
                        })
                    }
                    db.collection(doc.data().category).doc(doc.id).delete().then(() => {
                        console.log("Document successfully deleted!");
                    })
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
            db.collection('clothing').where("uid", "==", firebase.auth().currentUser?.uid)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.data().docId == undefined) {
                        db.collection(doc.data().category).doc(doc.id).update({
                            'docId': doc.id
                        })
                    }
                    db.collection(doc.data().category).doc(doc.id).delete().then(() => {
                        console.log("Document successfully deleted!");
                    })
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
            db.collection('furniture').where("uid", "==", firebase.auth().currentUser?.uid)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.data().docId == undefined) {
                        db.collection(doc.data().category).doc(doc.id).update({
                            'docId': doc.id
                        })
                    }
                    db.collection(doc.data().category).doc(doc.id).delete().then(() => {
                        console.log("Document successfully deleted!");
                    })
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
            db.collection('electronics').where("uid", "==", firebase.auth().currentUser?.uid)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.data().docId == undefined) {
                        db.collection(doc.data().category).doc(doc.id).update({
                            'docId': doc.id
                        })
                    }
                    db.collection(doc.data().category).doc(doc.id).delete().then(() => {
                        console.log("Document successfully deleted!");
                    })
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
            db.collection('sportsgear').where("uid", "==", firebase.auth().currentUser?.uid)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    if (doc.data().docId == undefined) {
                        db.collection(doc.data().category).doc(doc.id).update({
                            'docId': doc.id
                        })
                    }
                    db.collection(doc.data().category).doc(doc.id).delete().then(() => {
                        console.log("Document successfully deleted!");
                    })
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });

            // db.collection('users').doc(firebase.auth().currentUser?.uid).delete().then(() => {
            //     console.log("Account successfully deleted!");
            //     alert('Account deleted');
            //     // window.location.href = '#';
            // })
            // .catch((error) => {
            //     console.error("Error removing document: ", error);
            // });

            // firebase.auth().signInWithEmailAndPassword(username, password);
            firebase.auth().currentUser?.delete().then(() => {
                console.log("Account successfully deleted!");
            })
            .catch((error) => {
                console.log("Error deleting user: ", error);
            });
        }
    }
}
