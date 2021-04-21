import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from "@angular/fire/firestore";
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private firestore: AngularFirestore, private authService: AuthService) { }

  addToCart(doc: any) {
    const db = firebase.firestore();
    var userRef = db.collection("user").doc(this.authService.getUser());

    userRef.update({
      cart: firebase.firestore.FieldValue.arrayUnion(doc)
    });
  }
}
