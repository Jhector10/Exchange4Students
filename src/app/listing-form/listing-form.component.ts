
import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import {FormBuilder,  FormControl} from '@angular/forms';
import 'jquery';
import * as $ from "jquery";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import {AngularFireStorage} from '@angular/fire/storage';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-listing-form',
  templateUrl: './listing-form.component.html',
  styleUrls: ['./listing-form.component.css']
})


export class ListingFormComponent {
  //Creating a FormBuilder
  //Creating a FormBuilder
  filePath:String | undefined;
  constructor(private firestore: AngularFirestore, private afStorage: AngularFireStorage, private authService: AuthService) {}

  //Grouping the Listing Form under the same attributes
  listingForm = new FormGroup({
      category: new FormControl(['']),
      title: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(''),
      itemStatus: new FormControl(''),
      exchangeLoc: new FormControl(''),
      paymentOpt: new FormControl(''),
      listingPhotos: new FormControl('', [Validators.required]),
    //Separate FormGroups for specific category elements
    bookElements: new FormGroup ({ //Book elements group
      bookTitle: new FormControl(''),
      edition: new FormControl(''),
      courseNum: new FormControl(''),
  }),

    clothingElements: new FormGroup ({ //Clothing elements group 
      type: new FormControl(''),
      color: new FormControl(''),
      size: new FormControl(''),
  }),

    furnitureElements: new FormGroup ({ //Furniture elements group 
      type: new FormControl(''),
      color: new FormControl(''),
      length: new FormControl(''),
      width: new FormControl(''),
      height: new FormControl(''),
      weight: new FormControl(''),
  }),
    electronicsElements: new FormGroup({ //Electronics elements group
      type: new FormControl(''),
      model: new FormControl(''),
      length: new FormControl(''),
      width: new FormControl(''),
      height: new FormControl(''),
      weight: new FormControl(''),
  }),

    sportsGearElements: new FormGroup({ //Sportsgear elements group
      type: new FormControl(''),
      weight: new FormControl(''),
  }),
  
});

  
  ngOnInit(): void{ 
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

  submitted = false;

  upload(event: any) {    
    this.filePath = event.target.files[0]
  }
  uploadImage(random: number, userID: string | undefined){
    console.log(this.filePath)
    this.afStorage.upload('/'+userID+'/'+random, this.filePath);
    //upload('/(user's ID or email)/+random number')
  }

  onSubmit() {
    let random: number = Math.random();
    let userID: string | undefined = this.authService.getUser();
    let userEmail: string | null | undefined = this.authService.getEmail();
    if(this.listingForm.value.category == "book")
    {
      this.firestore.collection('books').add({
      category: this.listingForm.value.category,
      title: this.listingForm.value.bookElements.bookTitle,
      edition: this.listingForm.value.bookElements.edition,
      courseNum:this.listingForm.value.bookElements.courseNum,
      description: this.listingForm.value.description,
      price: this.listingForm.value.price,
      itemStatus: this.listingForm.value.itemStatus,
      exchangeLoc: this.listingForm.value.exchangeLoc,
      paymentOpt: this.listingForm.value.paymentOpt,
      listingPhotos: random,
      uid: userID,
      email: userEmail
      })
      .then(res => {
        console.log(res);
        this.listingForm.reset();
      })
      .catch(e => {
        console.log(e);
      })
      this.uploadImage(random, userID);
    }
    if(this.listingForm.value.category == "clothing")
    {
      this.firestore.collection('clothing').add({
      category: this.listingForm.value.category,
      type:this.listingForm.value.clothingElements.type,
      color: this.listingForm.value.clothingElements.color,
      size: this.listingForm.value.clothingElements.size,
      description: this.listingForm.value.description,
      price: this.listingForm.value.price,
      itemStatus: this.listingForm.value.itemStatus,
      exchangeLoc: this.listingForm.value.exchangeLoc,
      paymentOpt: this.listingForm.value.paymentOpt,
      listingPhotos: random,
      uid: userID
      })
      .then(res => {
        console.log(res);
        this.listingForm.reset();
      })
      .catch(e => {
        console.log(e);
      })
      this.uploadImage(random, userID);
    }
    if(this.listingForm.value.category == "furniture")
    {
      this.firestore.collection('furniture').add({
      category: this.listingForm.value.category,
      type: this.listingForm.value.furnitureElements.type,
      color: this.listingForm.value.furnitureElements.color,
      length: this.listingForm.value.furnitureElements.length,
      width: this.listingForm.value.furnitureElements.width,
      height: this.listingForm.value.furnitureElements.height,
      weight: this.listingForm.value.furnitureElements.weight,
      description: this.listingForm.value.description,
      price: this.listingForm.value.price,
      itemStatus: this.listingForm.value.itemStatus,
      exchangeLoc: this.listingForm.value.exchangeLoc,
      paymentOpt: this.listingForm.value.paymentOpt,
      listingPhotos: random,
      uid: userID
      })
      .then(res => {
        console.log(res);
        this.listingForm.reset();
      })
      .catch(e => {
        console.log(e);
      })
      this.uploadImage(random, userID);
    }
    if(this.listingForm.value.category == "electronics")
    {
      this.firestore.collection('electronics').add({
      category: this.listingForm.value.category,
      type: this.listingForm.value.electronicsElements.type,
      model: this.listingForm.value.electronicsElements.model,
      length: this.listingForm.value.electronicsElements.length,
      width: this.listingForm.value.electronicsElements.width,
      height: this.listingForm.value.electronicsElements.height,
      weight: this.listingForm.value.electronicsElements.weight,
      description: this.listingForm.value.description,
      price: this.listingForm.value.price,
      itemStatus: this.listingForm.value.itemStatus,
      exchangeLoc: this.listingForm.value.exchangeLoc,
      paymentOpt: this.listingForm.value.paymentOpt,
      listingPhotos: random,
      uid: userID
      })
      .then(res => {
        console.log(res);
        this.listingForm.reset();
      })
      .catch(e => {
        console.log(e);
      })
      this.uploadImage(random, userID);
    }
    if(this.listingForm.value.category == "sportsgear")
    {
      this.firestore.collection('sportsgear').add({
      category: this.listingForm.value.category,
      type: this.listingForm.value.sportsGearElements.type,
      weight: this.listingForm.value.sportsGearElements.weight,
      description: this.listingForm.value.description,
      price: this.listingForm.value.price,
      itemStatus: this.listingForm.value.itemStatus,
      exchangeLoc: this.listingForm.value.exchangeLoc,
      paymentOpt: this.listingForm.value.paymentOpt,
      listingPhotos: random,
      uid: userID
      })
      .then(res => {
        console.log(res);
        this.listingForm.reset();
      })
      .catch(e => {
        console.log(e);
      })
      this.uploadImage(random, userID);
    }  
  }
}