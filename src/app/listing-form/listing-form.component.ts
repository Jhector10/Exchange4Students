
import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import {FormBuilder,  FormControl} from '@angular/forms';
import 'jquery';
import * as $ from "jquery";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/firestore";
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-listing-form',
  templateUrl: './listing-form.component.html',
  styleUrls: ['./listing-form.component.css']
})


export class ListingFormComponent {
  //Creating a FormBuilder
  //Creating a FormBuilder
  filePath: String | undefined;
  task: AngularFireUploadTask | undefined;
  downloadableURL = '';

  progressValue!: Observable<number | undefined>; // Add this <<<<<<<<<<<<<<<<<< (for Progess Bar)
 

  constructor(private firestore: AngularFirestore, private afStorage: AngularFireStorage, private authService: AuthService, private fb: FormBuilder) {}

  //Grouping the Listing Form under the same attributes
  listingForm = this.fb.group({
      category: new FormControl(['', [Validators.required]]),
      listingTitle: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]), //need number validation function
      itemStatus: new FormControl('', [Validators.required]),
      exchangeLoc: new FormControl('', [Validators.required]),
      paymentOpt: new FormControl('', [Validators.required]),
      listingPhotos: new FormControl('', [Validators.required]),
    //Separate FormGroups for specific category elements
    
      bookElements: new FormGroup ({ //Book elements group
      bookTitle: new FormControl('', [Validators.required]),
      edition: new FormControl('', [Validators.required]),
      courseNum: new FormControl('', [Validators.required]),
  }),

    clothingElements: new FormGroup ({ //Clothing elements group 
      type: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required]),
      size: new FormControl('', [Validators.required]),
  }),

    furnitureElements: new FormGroup ({ //Furniture elements group 
      type: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required]),
      length: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      width: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      height: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      weight: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
  }),
    electronicsElements: new FormGroup({ //Electronics elements group
      type: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      length: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      width: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      height: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      weight: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
  }),

    sportsGearElements: new FormGroup({ //Sportsgear elements group
      type: new FormControl('', [Validators.required]),
      weight: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
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
  
  delay(timeInMillis: number): Promise<void> {
    return new Promise((resolve) => setTimeout(() => resolve(), timeInMillis));
  }
  
  async uploadImage(random: number, userID: string | undefined){
    console.log(this.filePath)
    this.task = this.afStorage.upload('/'+userID+'/'+random, this.filePath);
    this.progressValue = this.task.percentageChanges();       // <<<<< Percentage of uploading is given (for Progess Bar)
    (await this.task).ref.getDownloadURL().then(url => {this.downloadableURL = url;});
    //upload('/(user's ID or email)/+random number')
  }

  async onSubmit() {
  $('.please-wait').css('display', 'block');
  let random: number = Math.random();
    let userID: string | undefined = this.authService.getUser();
    let userEmail: string | null | undefined = this.authService.getEmail();
    this.uploadImage(random, userID);
    await this.delay(2000);
    if(this.listingForm.value.category == "books")
    {
      this.firestore.collection('books').add({
      listingTitle: this.listingForm.value.listingTitle,
      listingTitleLowerCase: this.listingForm.value.listingTitle.toLowerCase(),
      category: this.listingForm.value.category,
      bookTitle: this.listingForm.value.bookElements.bookTitle,
      edition: this.listingForm.value.bookElements.edition,
      courseNum:this.listingForm.value.bookElements.courseNum,
      description: this.listingForm.value.description,
      price: this.listingForm.value.price,
      itemStatus: this.listingForm.value.itemStatus,
      exchangeLoc: this.listingForm.value.exchangeLoc,
      paymentOpt: this.listingForm.value.paymentOpt,
      listingPhotos: random,
      uid: userID,
      email: userEmail,
      imageURL: this.downloadableURL
      })
      .then(res => {
        console.log(res);
        this.listingForm.reset();
      })
      .catch(e => {
        console.log(e);
      })
      //this.updateImageURL();
    }
    if(this.listingForm.value.category == "clothing")
    {
      this.firestore.collection('clothing').add({
      listingTitle: this.listingForm.value.listingTitle,
      listingTitleLowerCase: this.listingForm.value.listingTitle.toLowerCase(),
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
      uid: userID,
      email: userEmail,
      imageURL: this.downloadableURL
      })
      .then(res => {
        console.log(res);
        this.listingForm.reset();
      })
      .catch(e => {
        console.log(e);
      })
    }
    if(this.listingForm.value.category == "furniture")
    {
      this.firestore.collection('furniture').add({
      listingTitle: this.listingForm.value.listingTitle,
      listingTitleLowerCase: this.listingForm.value.listingTitle.toLowerCase(),
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
      uid: userID,
      email: userEmail,
      imageURL: this.downloadableURL
      })
      .then(res => {
        console.log(res);
        this.listingForm.reset();
      })
      .catch(e => {
        console.log(e);
      })
    }
    if(this.listingForm.value.category == "electronics")
    {
      this.firestore.collection('electronics').add({
      listingTitle: this.listingForm.value.listingTitle,
      listingTitleLowerCase: this.listingForm.value.listingTitle.toLowerCase(),
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
      uid: userID,
      email: userEmail,
      imageURL: this.downloadableURL
      })
      .then(res => {
        console.log(res);
        this.listingForm.reset();
      })
      .catch(e => {
        console.log(e);
      })
    }
    if(this.listingForm.value.category == "sportsgear")
    {
      this.firestore.collection('sportsgear').add({
      listingTitle: this.listingForm.value.listingTitle,
      listingTitleLowerCase: this.listingForm.value.listingTitle.toLowerCase(),
      category: this.listingForm.value.category,
      type: this.listingForm.value.sportsGearElements.type,
      weight: this.listingForm.value.sportsGearElements.weight,
      description: this.listingForm.value.description,
      price: this.listingForm.value.price,
      itemStatus: this.listingForm.value.itemStatus,
      exchangeLoc: this.listingForm.value.exchangeLoc,
      paymentOpt: this.listingForm.value.paymentOpt,
      listingPhotos: random,
      uid: userID,
      email: userEmail,
      imageURL: this.downloadableURL
      })
      .then(res => {
        console.log(res);
        this.listingForm.reset();
      })
      .catch(e => {
        console.log(e);
      })
    }
    $('.please-wait').css('display', 'none');
    $('.alertcss').css('display', 'block');
  }

} 