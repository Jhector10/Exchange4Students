
import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import {FormBuilder,  FormControl} from '@angular/forms';
import 'jquery';
import * as $ from "jquery";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: 'app-listing-form',
  templateUrl: './listing-form.component.html',
  styleUrls: ['./listing-form.component.css']
})


export class ListingFormComponent {
  //Creating a FormBuilder
  //Creating a FormBuilder
  
  constructor(private firestore: AngularFirestore) {}

  //Grouping the Listing Form under the same attributes

  listingForm = new FormGroup(
    { category: new FormControl(['']),
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

  onSubmit() { 
    this.firestore.collection('books').add({
      category: this.listingForm.value.category,
      // title: this.listingForm.get('bookTitle').value,
      // edition: this.listingForm.value.edition,
      // courseNum:this.listingForm.value.courseNum,
      description: this.listingForm.value.description,
      price: this.listingForm.value.price,
      itemStatus: this.listingForm.value.itemStatus,
      exchangeLoc: this.listingForm.value.exchangeLoc,
      paymentOpt: this.listingForm.value.paymentOpt,
      // listingPhotos: this.listingForm.value.listingPhotos

  })
  .then(res => {
      console.log(res);
      this.listingForm.reset();
  })
  .catch(e => {
      console.log(e);
  })
}
}



