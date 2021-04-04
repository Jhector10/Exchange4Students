
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import {FormBuilder,  FormControl} from '@angular/forms';

@Component({
  selector: 'app-listing-form',
  templateUrl: './listing-form.component.html',
  styleUrls: ['./listing-form.component.css']
})


export class ListingFormComponent {
  //Creating a FormBuilder
  constructor(private fb: FormBuilder) {}

  //Grouping the Listing Form under the same attributes
  listingForm = this.fb.group (
    { category: new FormControl(['', Validators.required]),
      title: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(''),
      itemStatus: new FormControl(''),
      exchangeLoc: new FormControl(''),
      paymentOpt: new FormControl(''),

    //Separate FormGroups for specific category elements
    bookElements: this.fb.group ({ //Book elements group
      bookTitle: new FormControl(''),
      edition: new FormControl(''),
      courseNum: new FormControl(''),
  }),

    clothingElements: this.fb.group ({ //Clothing elements group 
      type: new FormControl(''),
      color: new FormControl(''),
      size: new FormControl(''),
  }),

    furnitureElements: this.fb.group ({ //Furniture elements group 
      type: new FormControl(''),
      color: new FormControl(''),
      length: new FormControl(''),
      width: new FormControl(''),
      height: new FormControl(''),
      weight: new FormControl(''),
  }),
    electronicsElements: this.fb.group ({ //Electronics elements group
      type: new FormControl(''),
      model: new FormControl(''),
      length: new FormControl(''),
      width: new FormControl(''),
      height: new FormControl(''),
      weight: new FormControl(''),
  }),

    sportsGearElements: this.fb.group ({ //Sportsgear elements group
      type: new FormControl(''),
      weight: new FormControl(''),
  }),
  
});

  
  ngOnInit(){ //Initiate and subcribe to an observable
    this.listingForm.valueChanges.subscribe(console.log)
  }
  

  submitted = false;

  onSubmit() { this.submitted = true;}

}


