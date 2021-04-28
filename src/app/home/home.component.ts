import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from "@angular/fire/firestore";
import {FormGroup,  FormControl} from '@angular/forms';
import 'jquery';
import * as $ from "jquery";
import firebase from 'firebase/app';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private firestore: AngularFirestore, public cart: CartService) { }

  myArray: any[] = []

  searchForm = new FormGroup({
    searchValue: new FormControl('')
  })

  ngOnInit(): void {
    
    this.firestore
    .collection("books")
    .get()
    .subscribe((ss) => {
      ss.docs.forEach((doc) => {
        this.myArray.push(doc.data());
      });
    });

    this.firestore
    .collection("clothing")
    .get()
    .subscribe((ss) => {
      ss.docs.forEach((doc) => {
        this.myArray.push(doc.data());
      });
    });

    this.firestore
    .collection("furniture")
    .get()
    .subscribe((ss) => {
      ss.docs.forEach((doc) => {
        this.myArray.push(doc.data());
      });
    });

    this.firestore
    .collection("electronics")
    .get()
    .subscribe((ss) => {
      ss.docs.forEach((doc) => {
        this.myArray.push(doc.data());
      });
    });

    this.firestore
    .collection("sportsgear")
    .get()
    .subscribe((ss) => {
      ss.docs.forEach((doc) => {
        this.myArray.push(doc.data());
      });
    });
    
    console.log("myArray: ", this.myArray);
    

    $(document).ready(function(){
      $("#category").change(function(){
        $(this).find("option:selected").each(function(){
              let optionValue = $(this).attr("value");
              if(optionValue){
                $(".specific-elements").not("." + optionValue).hide();
                $("." + optionValue).show();
              } else{
                $(".specific-elements").hide();
              }
          });
      }).change();
    });
  }
  
  searchListings()
  {
    this.myArray = [];
    const db = firebase.firestore();
    db.collection('books').where("listingTitleLowerCase", ">=", this.searchForm.value.searchValue.toLowerCase())
    .where("listingTitleLowerCase", "<=", this.searchForm.value.searchValue.toLowerCase() + '\uf8ff')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          this.myArray.push(doc.data());
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    db.collection('clothing').where("listingTitleLowerCase", ">=", this.searchForm.value.searchValue.toLowerCase())
    .where("listingTitleLowerCase", "<=", this.searchForm.value.searchValue.toLowerCase() + '\uf8ff')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          this.myArray.push(doc.data());
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    db.collection('furniture').where("listingTitleLowerCase", ">=", this.searchForm.value.searchValue.toLowerCase())
    .where("listingTitleLowerCase", "<=", this.searchForm.value.searchValue.toLowerCase() + '\uf8ff')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          this.myArray.push(doc.data());
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    db.collection('electronics').where("listingTitleLowerCase", ">=", this.searchForm.value.searchValue.toLowerCase())
    .where("listingTitleLowerCase", "<=", this.searchForm.value.searchValue.toLowerCase() + '\uf8ff')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          this.myArray.push(doc.data());
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
    db.collection('sportsgear').where("listingTitleLowerCase", ">=", this.searchForm.value.searchValue.toLowerCase())
    .where("listingTitleLowerCase", "<=", this.searchForm.value.searchValue.toLowerCase() + '\uf8ff')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          this.myArray.push(doc.data());
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }
}