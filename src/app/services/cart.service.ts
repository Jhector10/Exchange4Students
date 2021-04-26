import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from "@angular/fire/firestore";
import firebase from 'firebase/app';
import { ResourceLoader } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private firestore: AngularFirestore, 
    private authService: AuthService) { }

  addToCart(doc: any) {
    const db = firebase.firestore();
    var userRef = db.collection("user").doc(this.authService.getUser());

    userRef.update({
      cart: firebase.firestore.FieldValue.arrayUnion(doc)
    });
    alert("Added to Cart!");
  }

  addToOrder(doc: any) {
    const db = this.firestore;
    db.collection("mail").add({
      to: this.authService.getEmail(),
      message: {
        subject: `Order Confirmation for ${doc.listingTitle}`,
        text: `This is the order that you purchased \n `
      },
    })
    db.collection("mail").add({
      to: doc.email,
      message: {
        subject: `Order Purchased for ${doc.listingTitle}`,
        text: `This is your listing that was purchased \n `
      },
    })
    .then(() => console.log("Queued email for delivery!"))
    .catch((error) => {
      console.error(error);
    });
  }

  deleteFromCart(doc: any) {
    const db = firebase.firestore();
    var userRef = db.collection("user").doc(this.authService.getUser());

    userRef.update({
      cart: firebase.firestore.FieldValue.arrayRemove(doc)
    });
    location.reload();
    alert("Deleted from Cart!");
  }
}
