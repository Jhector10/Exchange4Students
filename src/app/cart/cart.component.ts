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
  //myCart: any[] = []
  ngOnInit(): void {
    var db = firebase.firestore();
    db.collection("carts").doc(this.authService.getUser())
      .get()
      .then((doc) => {
        //console.log("Document data:", doc.data());
        var data = doc.data();
        if(data != null)
        {
          this.myArray.push(data.cart)
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
    //this.myCart = this.myArray[0].cart;
    //console.log("myCart: ", this.myCart);
    console.log(this.myArray[0].length);
    
  }

  
}
