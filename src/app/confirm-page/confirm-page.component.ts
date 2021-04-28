import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import firebase from 'firebase/app';
import { CartService } from '../services/cart.service';
import { ViewOrdersComponent } from '../view-orders/view-orders.component';

@Component({
  selector: 'app-confirm-page',
  templateUrl: './confirm-page.component.html',
  styleUrls: ['./confirm-page.component.css']
})
export class ConfirmPageComponent implements OnInit {

  constructor(private cart: CartService, 
              private auth: AuthService,
              public orders: ViewOrdersComponent) { }


  ngOnInit(): void {
    
  }

}
