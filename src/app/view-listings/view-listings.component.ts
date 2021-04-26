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
          if (doc.data().docId == undefined) {
            db.collection('books').doc(doc.id).update({
              'docId': doc.id
            })
          }
          this.myArray.push(doc.data());
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
          if (doc.data().docId == undefined) {
            db.collection('clothing').doc(doc.id).update({
              'docId': doc.id
            })
          }
          this.myArray.push(doc.data());
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
          if (doc.data().docId == undefined) {
            db.collection('furniture').doc(doc.id).update({
              'docId': doc.id
            })
          }
          this.myArray.push(doc.data());
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
          if (doc.data().docId == undefined) {
            db.collection('electronics').doc(doc.id).update({
              'docId': doc.id
            })
          }
          this.myArray.push(doc.data());
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
          if (doc.data().docId == undefined) {
            db.collection('sportsgear').doc(doc.id).update({
              'docId': doc.id
            })
          }
          this.myArray.push(doc.data());
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

  deleteListing(doc: any) {
    // console.log(this.myArray.indexOf('sM1h3ELlufXAOlWOMXkd'));
    // var getDocId = this.myArray.indexOf(doc)+1;
    // var docID = this.myArray[getDocId];
    // console.log(docID);
    // console.log(doc.category);
    const db = firebase.firestore();
    db.collection(doc.category).doc(doc.docId).delete().then(() => {
      console.log("Document successfully deleted!");
      location.reload();
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  markAsSold(doc: any) {
    // var getDocId = this.myArray.indexOf(doc)+1;
    // var docID = this.myArray[getDocId];
    const db = firebase.firestore();
    db.collection(doc.category).doc(doc.docId).update({
      'itemStatus': 'Sold'
    })
    .then(() => {
      console.log("Document successfully updated!");
      location.reload();
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });
  }

  markAsForSale(doc: any) {
    // var getDocId = this.myArray.indexOf(doc)+1;
    // var docID = this.myArray[getDocId];
    const db = firebase.firestore();
    db.collection(doc.category).doc(doc.docId).update({
      'itemStatus': 'For Sale'
    })
    .then(() => {
      console.log("Document successfully updated!");
      location.reload();
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });
  }
  
}
