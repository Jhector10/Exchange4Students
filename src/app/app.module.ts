import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ListingFormComponent } from './listing-form/listing-form.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [ 
    AppComponent, 
    ListingFormComponent, 
    NavigationBarComponent, HomeComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    AngularFireModule.initializeApp( {
      apiKey: "AIzaSyD4sVCwHgz1GUoP7ITGkdg4TtpvDX8uX2o",
      authDomain: "exchange4students.firebaseapp.com",
      databaseURL: "https://exchange4students-default-rtdb.firebaseio.com",
      projectId: "exchange4students",
      storageBucket: "exchange4students.appspot.com",
      messagingSenderId: "1081070035803",
      appId: "1:1081070035803:web:6d9f8bf34a862a1ae1f07e",
      measurementId: "G-F1NZZJSDQT"
  }),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    FlexLayoutModule
  ],
  providers: [ AuthService ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
