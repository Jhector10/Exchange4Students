import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from "@angular/fire/firestore";
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private firestore: AngularFirestore) { }

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

    this.firestore
    .collection("clothing")
    .get()
    .subscribe((ss) => {
      ss.docs.forEach((doc) => {
        this.myArray.push(doc.data());
      });
    });

    this.firestore
    .collection("furniture")
    .get()
    .subscribe((ss) => {
      ss.docs.forEach((doc) => {
        this.myArray.push(doc.data());
      });
    });

    this.firestore
    .collection("electronics")
    .get()
    .subscribe((ss) => {
      ss.docs.forEach((doc) => {
        this.myArray.push(doc.data());
      });
    });

    this.firestore
    .collection("sportsgear")
    .get()
    .subscribe((ss) => {
      ss.docs.forEach((doc) => {
        this.myArray.push(doc.data());
      });
    });

    
  }
  
}
