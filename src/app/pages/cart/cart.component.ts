import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { CartService } from 'src/app/services/cart.service';
import { Cart, cartItem } from '../models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: [
  ]
})
export class CartComponent implements OnInit {

  cart : Cart = {items: [
    {
      product: 'https://via.placeholder.com/150',
      name: 'snickers',
      price: 150,
      quantity: 2,
      id: 1,
    },
    {
      product: 'https://via.placeholder.com/150',
      name: 'snickers',
      price: 150,
      quantity: 1,
      id: 2,
    },
    {
      product: 'https://via.placeholder.com/150',
      name: 'snickers',
      price: 150,
      quantity: 3,
      id: 3,
    },
  ]};
  dataSource: Array<cartItem>=[]
  displaydColums: Array<string>=[
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ]

  constructor(private cartService: CartService, private http: HttpClient) { }

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart)=>{
      this.cart = _cart;
      this.dataSource = this.cart.items;
    })
  }

  getTotal(items: Array<cartItem>): number{
    return this.cartService.getTotal(items);
  }

  onClearCart(): void{
    this.cartService.onClearCart();
  }

  onRemoveFromCart(item: cartItem): void{
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: cartItem): void{
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: cartItem): void{
    this.cartService.removeQuantity(item);
  }

  onCheckOut():void{
    this.http.post('http://localhost:4242/checkout', {
      items: this.cart.items
    }).subscribe(async(res: any)=>{
      let stripe = await loadStripe('pk_test_51LTP0gKbbX8B7nJ277r8MKZPdU0yPpjK8M2qeWS54zyFqGHpwuoUOwZv9sFpKfvvS4pucYTiPyBwbxxU4bhpf7sS00l0eptKyr');
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    })
  }

}
