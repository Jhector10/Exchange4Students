import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import * as $ from "jquery";

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
          for(var i = 0; i < this.myArray[0].length; i++) {
            var thePrice: number = +this.myArray[0][i].price;
            this.totalPrice = this.totalPrice + thePrice;
          }
        }

        if(this.myArray[0].length == 0)
        {
          $('.noItems').css('display', 'block');
          $('.yesItems').css('display', 'none');
        }
        else
        {
          $('.noItems').css('display', 'none');
          $('.yesItems').css('display', 'block');
        }
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
    console.log("myArray: ", this.myArray);
    
  }
}
