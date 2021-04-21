import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import {AngularFireStorage} from '@angular/fire/storage';
import firebase from 'firebase/app';
import { CartService } from '../services/cart.service';
//import { url } from 'node:inspector';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {

  downloadableURL = '';
  constructor(private firestore: AngularFirestore, private afStorage: AngularFireStorage, public cart: CartService) { }
  myArray: any[] = []
  ngOnInit(): void {
    this.firestore
  .collection("books")
  .get()
  .subscribe((ss) => {
    ss.docs.forEach((doc) => {
      this.myArray.push(doc.data());
    });
  });
  }
}
