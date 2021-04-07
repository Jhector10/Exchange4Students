import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  @Output() isSignOut = new EventEmitter<void>()
  @Output() isListingPage = new EventEmitter<void>()
  constructor(public auth: AuthService) { }

  ngOnInit(): void {
  }
  signOut() {
    this.auth.signOut()
    this.isSignOut.emit()
  }
}
