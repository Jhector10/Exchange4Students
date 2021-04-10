import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import {AngularFireStorage} from '@angular/fire/storage';
import firebase from 'firebase/app';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {

  constructor(private firestore: AngularFirestore, private afStorage: AngularFireStorage) { }
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
  getPhoto(uid:string, listingPhoto:string){
    //This doesn't work yet!!
    // console.log(firebase.storage().ref('/'+uid+'/'+listingPhoto));
    // return firebase.storage().ref.('/'+uid+'/'+listingPhoto+'.jpeg').getDownloadURL();
    // return document.getElementById(uid+'/'+listingPhoto);
    const storage = firebase.storage();
    storage.ref('/'+uid+'/'+listingPhoto+'.jpeg').getDownloadURL()
    .then((url) => {
      console.log(url);
      return url;
    })
  }

}
