import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    private firestore: AngularFirestore, 
    private authService: AuthService, 
    public cart: CartService,
    public afAuth: AngularFireAuth, 
    private fun: AngularFireFunctions) { }

  myArray: any[] = []
  totalPrice = 0;
  myCart: any[] = []
  ngOnInit(): void {
    var db = firebase.firestore();
    db.collection("carts").doc(this.authService.getUser())
      .get()
      .then((doc) => {
        //console.log("Document data:", doc.data());
        var data = doc.data();
        //this.myCart.push(data);
        if(data != null)
        {
          this.myArray.push(data.cart)
        }
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
    console.log("myArray: ", this.myArray);
    console.log("myArray slice: ", this.myArray.slice());
    console.log("myArray isArray: ", Array.isArray(this.myArray));
    //console.log("myArray: ", this.myArray);
    //this.myCart = this.myArray[0].cart;
    //console.log("myCart: ", this.myCart);
    //console.log("myCart[0]: ", this.myCart[0]);
    console.log("Array Length: ", this.myArray.length);
    //console.log("myArray[0]: ", this.myArray[0]);
    //this.totalPrice = this.cart.getTotalPrice(this.myArray[0]);
    //console.log("Total Price: ", this.totalPrice);
    //this.getTotalPrice();
    this.myCart = this.myArray;
    console.log("myCart: ", this.myCart);
    var first = this.myArray[0];
    console.log("first: ", first);
    console.log("myCart[0]: ", this.myCart[0]);
  }

  getTotalPrice() {
    for(var i = 0; i < this.myArray.length; i++) {
      this.totalPrice = this.totalPrice + this.myArray[i];
    }
    console.log("Total Price: ", this.totalPrice);
  }

  calculateTotal(price: number) {
    var thePrice: number = +price;
    this.totalPrice = this.totalPrice + thePrice;
    console.log("Total Price: ", this.totalPrice);
    return this.totalPrice;
  }
}
