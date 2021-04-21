import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import firebase from 'firebase/app';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private firestore: AngularFirestore, private authService: AuthService, public cart: CartService) { }

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
    /*
    this.firestore
    .collection("user")
    .doc(this.authService.getUser())
    .get()
    .then()


    .subscribe((ss) => {
      ss.cart.forEach((doc) => {
        this.myArray.push(doc.data());
      });
    });
    */
  }

  /*
  var db = firebase.firestore();
var user = firebase.auth().currentUser;
var usersEmail = user.email;
db.collection("users").where("email", "==", usersEmail)
                    .get()
                    .then(function(querySnapshot) {
                        querySnapshot.forEach(function(doc) {
                            // doc.data() is never undefined for query doc snapshots
                            console.log(doc.id, " => ", doc.data());
                            var firstName = //What do I put here?
                            var lastName = //What do I put here?
                        });
                    })
                    .catch(function(error) {
                        console.log("Error getting documents: ", error);
                    });
  */

}
