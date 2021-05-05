import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase/app';

import * as alertify from "alertifyjs";

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
            db.collection(doc.data().category).doc(doc.id).update({
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
            db.collection(doc.data().category).doc(doc.id).update({
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
            db.collection(doc.data().category).doc(doc.id).update({
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
            db.collection(doc.data().category).doc(doc.id).update({
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
            db.collection(doc.data().category).doc(doc.id).update({
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

  delay(timeInMillis: number): Promise<void> {
    return new Promise((resolve) => setTimeout(() => resolve(), timeInMillis));
  }

  async deleteListing(doc: any) {
    // console.log(this.myArray.indexOf('sM1h3ELlufXAOlWOMXkd'));
    // var getDocId = this.myArray.indexOf(doc)+1;
    // var docID = this.myArray[getDocId];
    // console.log(docID);
    // console.log(doc.category);
    //var confirm: any = window.confirm("Are you sure you want to delete this item?");
    alertify.confirm("Are you sure you want to delete this item?",
      () =>{
        alertify.success('Item Deleted');
        const db = firebase.firestore();
        db.collection(doc.category).doc(doc.docId).delete().then(async () => {
          console.log("Document successfully deleted!");
          //alert('Item deleted');
          await this.delay(1000);
          location.reload();
        })
        .catch((error) => {
          console.error("Error removing document: ", error);
        });
      },
      function(){
        alertify.error('Canceled');
      }
    );
    /*
    const db = firebase.firestore();
    if (confirm == true) {
      db.collection(doc.category).doc(doc.docId).delete().then(() => {
        console.log("Document successfully deleted!");
        alert('Item deleted');
        this.delay(1000);
        location.reload();
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
    }
    */
    
  }

  async markAsSold(doc: any) {
    // var getDocId = this.myArray.indexOf(doc)+1;
    // var docID = this.myArray[getDocId];
    const db = firebase.firestore();
    db.collection(doc.category).doc(doc.docId).update({
      'itemStatus': 'Sold'
    })
    .then(() => {
      console.log("Document successfully updated!");
      //alert('Item Marked as Sold');
      alertify.success('Item Marked as Sold')
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });
    await this.delay(1000);
    location.reload();
  }

  async markAsForSale(doc: any) {
    // var getDocId = this.myArray.indexOf(doc)+1;
    // var docID = this.myArray[getDocId];
    const db = firebase.firestore();
    db.collection(doc.category).doc(doc.docId).update({
      'itemStatus': 'For Sale'
    })
    .then(() => {
      console.log("Document successfully updated!");
      //alert('Item Marked as For Sale');
      alertify.success('Item Marked as For Sale')
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });
    await this.delay(1000);
    location.reload();
  }

}
