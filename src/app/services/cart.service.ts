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
    private authService: AuthService,) { }

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

  placeOrder(theCart: any[]) {
    let confirmationNum: string = Math.random().toString().substring(2);
    let stringCart = "";
    const db = this.firestore;
    console.log(theCart);

    //takes listing data & places in stringCart; sends emails to sellers
    for(let i = 0; i < theCart.length; i++) {
      //console.log(theCart[i].listingTitle);
      //adding item to a string
      stringCart = stringCart + theCart[i].listingTitle + "\n";
      stringCart = stringCart + "\t\tPrice: $" + theCart[i].price + "\n";
      stringCart = stringCart + "\t\tSeller: " + theCart[i].email + "\n";
      stringCart = stringCart + "\t\tExchange Location: " + theCart[i].exchangeLoc + "\n";
      stringCart = stringCart + "\t\tPayment Options: " + theCart[i].paymentOpt + "\n";
      //send email to seller
      db.collection("mail").add({
        to: theCart[i].email,
        message: {
          subject: `📦 Order Placed #${confirmationNum}`,
          text: 
            "Hey there! 👋 \n"+
            "An order has been placed for your listing " + theCart[i].listingTitle + " by " + this.authService.getEmail() + "\n" + 
            "Here's a summary of the listing:\n " + 
            theCart[i].listingTitle + "\n" + 
            "\t\tPrice: $" + theCart[i].price + "\n" + 
            "\t\tBuyer: " + this.authService.getEmail() + "\n" + 
            "\t\tExchange Location: " + theCart[i].exchangeLoc + "\n" + 
            "\t\tPayment Options: " + theCart[i].paymentOpt + "\n" + 
            "Reach out to your buyer to set an date and time for the exchange!\n"+
            "- Your friends at Exchange4Students"
        },
      })
      .then(() => console.log("Queued email for delivery!"))
      .catch((error) => {
        console.error(error);
      });
    }
    //send email to buyer
    db.collection("mail").add({
      to: this.authService.getEmail(),
      message: {
        subject: `📦 Order Confirmation #${confirmationNum}`,
        text: 
          "Hey there! 👋 \n"+
          "Thanks for placing an order! Here's your summary: \n" + 
          stringCart + "\n" + 
          "Your sellers will reach out to you with a date and time to make the exchange!\n" +
          "- Your friends at Exchange4Students"
      },
    })
    .then(() => console.log("Queued email for delivery!"))
    .catch((error) => {
      console.error(error);
    });
    console.log(stringCart);
  }
}
