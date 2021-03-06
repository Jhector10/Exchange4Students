import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import {AngularFireStorage} from '@angular/fire/storage';
import firebase from 'firebase/app';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-clothing-page',
  templateUrl: './clothing-page.component.html',
  styleUrls: ['./clothing-page.component.css']
})
export class ClothingPageComponent implements OnInit {

  constructor(private firestore: AngularFirestore, private afStorage: AngularFireStorage, public cart: CartService) { }
  myArray: any[] = []
  ngOnInit(): void {
    this.firestore
  .collection("clothing")
  .get()
  .subscribe((ss) => {
    ss.docs.forEach((doc) => {
      this.myArray.push(doc.data());
    });
  });
}

getPhoto(uid:string, listingPhotos: number){
  //This doesn't work yet!!
  // console.log(firebase.storage().ref('/'+uid+'/'+listingPhoto));
  // return firebase.storage().ref.('/'+uid+'/'+listingPhoto+'.jpeg').getDownloadURL();
  // return document.getElementById(uid+'/'+listingPhoto);
  
  /*
  const storage = firebase.storage();
  //storage.ref("images0.08732651600669228.png").getDownloadURL()
  const link = storage.ref('SZp6Rcq66OhqWeUOC1tEvmhZbLz2/0.2811381234052286.jpeg').getDownloadURL()
  .then((url) => {
    console.log(url);
    return url;
  });
  
  return link;
  */

  
  let bucket: any = 'exchange4students.appspot.com';
  let uidtest: any = 'SZp6Rcq66OhqWeUOC1tEvmhZbLz2';
  let listingPhotostest: any = '0.2811381234052286';
  let pathToFile: any = 'SZp6Rcq66OhqWeUOC1tEvmhZbLz2/0.2811381234052286.jpeg';
  let downloadToken: any = '3c860626-d6b7-457c-a8bd-fdc02a076c3f';
  const createPersistentDownloadUrl = (bucket: any, pathToFile: any, downloadToken: any) => {
    return ('https://firebasestorage.googleapis.com/v0/b/'+bucket+'/o/'+uidtest+'%2F'+listingPhotostest+'?alt=media&token='+downloadToken);
  }
  
  
  //return 'https://firebasestorage.googleapis.com/v0/b/exchange4students.appspot.com/o/SZp6Rcq66OhqWeUOC1tEvmhZbLz2%2F0.2811381234052286?alt=media&token=3c860626-d6b7-457c-a8bd-fdc02a076c3f';
  }
}