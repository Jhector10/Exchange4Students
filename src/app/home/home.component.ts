import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  @Output() isSignOut = new EventEmitter<void>()
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }
  signOut() {
    this.auth.signOut()
    this.isSignOut.emit()
  }

}
