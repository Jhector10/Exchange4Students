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
  myCart: any[] = []
  ngOnInit(): void {
    var db = firebase.firestore();
    db.collection("user").doc(this.authService.getUser())
      .get()
      .then((doc) => {
        console.log("Document data:", doc.data());
        this.myArray.push(doc.data())
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
    console.log("myArray: ", this.myArray);
    this.myCart = this.myArray[0].cart;
    console.log("myCart: ", this.myCart);
  }

  
}
