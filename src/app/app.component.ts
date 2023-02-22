import { Component, OnInit } from '@angular/core';
import { Cart } from './pages/models/cart.model';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent implements OnInit {
  title = 'Saré Södé';
  cart: Cart = {items: []};

  constructor(private cartService: CartService){}

  ngOnInit(){
    this.cartService.cart.subscribe((_cart)=>{
      this.cart= _cart;
    });
  }
}
