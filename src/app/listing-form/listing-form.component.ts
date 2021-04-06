
import { Component, OnInit, Input, Output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import {FormBuilder,  FormControl} from '@angular/forms';
import 'jquery';
import * as $ from "jquery";

@Component({
  selector: 'app-listing-form',
  templateUrl: './listing-form.component.html',
  styleUrls: ['./listing-form.component.css']
})


export class ListingFormComponent {
  //Creating a FormBuilder
  //Creating a FormBuilder
  
  constructor() {}

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

  onSubmit() { this.submitted = true;}

}


