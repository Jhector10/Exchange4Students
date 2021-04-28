import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from "@angular/fire/firestore";
import firebase from 'firebase/app';
import { ResourceLoader } from '@angular/compiler';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',
})

export class CartService {

  constructor(private firestore: AngularFirestore, 
    private authService: AuthService,
    public router: Router) { }

  addToCart(doc: any) {
    const db = firebase.firestore();
    var userRef = db.collection("carts").doc(this.authService.getUser());
    userRef.get()
      .then((querySnapshot) => {
        var docExists = querySnapshot.exists;
        if (docExists == true) {
          userRef.update({
            cart: firebase.firestore.FieldValue.arrayUnion(doc)
          })
        }
        else {
          userRef.set({
            cart: firebase.firestore.FieldValue.arrayUnion(doc)
          });
        }
      });
    alert("Added to Cart");
  }


  async removeFromCart(doc: any) {
    const db = firebase.firestore();
    var userRef = db.collection("carts").doc(this.authService.getUser());
    var confirm: any = window.confirm("Are you sure you want to delete?");
    if(confirm)
    {
      userRef.update({
        cart: firebase.firestore.FieldValue.arrayRemove(doc)
      });
      await this.delay(1000);
      await location.reload();
    }
    // alert("Deleted from Cart!");

  }

  delay(timeInMillis: number): Promise<void> {
    return new Promise((resolve) => setTimeout(() => resolve(), timeInMillis));
  }

  async placeOrder(theCart: any[]) {
    let confirmationNum: string = Math.random().toString().substring(2);
    let stringCart = "";
    const db = this.firestore;
    const fire = firebase.firestore();
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
      db.collection("email").add({
        to: theCart[i].email,
        message: {
          subject: `📦 Order Placed #${confirmationNum}`,
          text: 
            "Hey there! 👋 \n"+
            "An order has been placed for your listing " + theCart[i].listingTitle + " by " + this.authService.getEmail() + "\n" + 
            "Here's a summary of the listing:\n\n " + 
            theCart[i].listingTitle + "\n" + 
            "\t\tPrice: $" + theCart[i].price + "\n" + 
            "\t\tBuyer: " + this.authService.getEmail() + "\n" + 
            "\t\tExchange Location: " + theCart[i].exchangeLoc + "\n" + 
            "\t\tPayment Options: " + theCart[i].paymentOpt + "\n\n" + 
            "Reach out to your buyer to set an date and time for the exchange!\n\n"+
            "- Your friends at Exchange4Students"
        },
      })
      .then(() => {
        console.log(theCart);
        db.collection('orders').add({
        order : theCart[i],
        purchaser : this.authService.getUser(),
        confirmNum : confirmationNum
        });
        if (theCart[i].docId == undefined) {
          fire.collection(theCart[i].category)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              console.log(doc.id);
              fire.collection(doc.data().category).doc(doc.id).update({
                docId: doc.id
              })

              db.collection(theCart[i].category).doc(doc.id).update({
                itemStatus: 'Sold'
              });
              console.log("Queued email for delivery!");
            })
          })
          
        }
        else {
          db.collection(theCart[i].category).doc(theCart[i].docId).update({
            itemStatus: 'Sold'
          });
          console.log("Queued email for delivery!");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
    //send email to buyer
    db.collection("email").add({
      to: this.authService.getEmail(),
      message: {
        subject: `🛒 Order Confirmation #${confirmationNum}`,
        text: 
          "Hey there! 👋 \n"+
          "Thanks for placing an order! Here's your summary: \n\n" + 
          stringCart + "\n" + 
          "Your sellers will reach out to you with a date and time to make the exchange!\n\n" +
          "- Your friends at Exchange4Students"
      },
    })
    .then(() => {
      console.log("Queued email for delivery!");
      db.collection('carts').doc(this.authService.getUser()).delete();
    })
    .catch((error) => {
      console.error(error);
    });
    console.log(stringCart);
    await alert("Thank you for your order! \n Look out for an email from us! \n - Your Friends at Exchange4Students");
    await this.delay(1000);
    await location.reload();
  }
}
