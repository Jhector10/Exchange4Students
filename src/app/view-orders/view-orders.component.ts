import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase/app';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {

  constructor(private authService: AuthService) { }

  myArray: any[] = []

  ngOnInit(): void {
    const db = firebase.firestore();
    db.collection('orders').where("purchaser", "==", this.authService.getUser())
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.myArray.push(doc.data().order);
          console.log(doc.id, " => ", doc.data().order[0]);
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  }

}
