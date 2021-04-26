import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase/app';

@Component({
  selector: 'app-view-listings',
  templateUrl: './view-listings.component.html',
  styleUrls: ['./view-listings.component.css']
})
export class ViewListingsComponent implements OnInit {

  constructor(private authService: AuthService) { }

  myArray: any[] = []

  ngOnInit(): void {
    const db = firebase.firestore();
    db.collection('books').where("uid", "==", this.authService.getUser())
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.myArray.push(doc.data(), doc.id);
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
      db.collection('clothing').where("uid", "==", this.authService.getUser())
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.myArray.push(doc.data(), doc.id);
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
      db.collection('furniture').where("uid", "==", this.authService.getUser())
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.myArray.push(doc.data(), doc.id);
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
      db.collection('electronics').where("uid", "==", this.authService.getUser())
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.myArray.push(doc.data(), doc.id);
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
      db.collection('sportsgear').where("uid", "==", this.authService.getUser())
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.myArray.push(doc.data(), doc.id);
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  deleteListing(doc: any) {
    // console.log(this.myArray.indexOf('sM1h3ELlufXAOlWOMXkd'));
    var getDocId = this.myArray.indexOf(doc)+1;
    var docID = this.myArray[getDocId];
    // console.log(docID);
    // console.log(doc.category);
    const db = firebase.firestore();
    db.collection(doc.category).doc(docID).delete().then(() => {
      console.log("Document successfully deleted!");
      location.reload();
  }).catch((error) => {
      console.error("Error removing document: ", error);
  });
  }
  
}
