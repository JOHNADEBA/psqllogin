import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsqlServiceService } from '../../service/msql-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  allProducts: any = [];
  product: any = [];
  cartArr: any = [];
  productLoading = false;
  visibleIndex = -1;
  loading = true;
  total: number = 0;
  ammount: any = 0;
  constructor(
    private allPdts: MsqlServiceService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.displayAllProducts();
  }

  displayAllProducts() {
    this.allPdts.getAllProducts().subscribe((results: any) => {
      this.allProducts = results;
      this.allProducts.forEach((element: any) => {
        element.quantity = 0;
      });
      this.loading = false;
    });
  }
  addToCart(item: any) {
    // if (this.cartArr.indexOf(item) === -1) {
    //   this.cartArr.unshift({ ...item, quantity: 1 });
    // } else {
    //   alert('This item already exists');
    // }

    const found = this.cartArr.some((el: any) => el.id === item.id);
    if (found) return;
    this.cartArr.unshift({ ...item, quantity: 1 });
    this.getTotal();
  }

  removeFromCart(id: number) {
    this.cartArr = this.cartArr.filter((item: any) => item.id !== id && item);
    this.getTotal();
  }

  getTotal() {
    this.total = this.cartArr.reduce(function (accumulator: any, item: any) {
      let qty: any;
      qty = item.quantity <= 1 ? 1 : item.quantity;
      return accumulator + item.price * qty;
    }, 0);
  }

  showSubItem(ind: number) {
    if (this.visibleIndex === ind) {
      this.visibleIndex = -1;
    } else {
      this.visibleIndex = ind;
    }
  }
  openDetail(obj: any) {
    this.product = obj;
    this.productLoading = true;
  }
  showModal() {
    this.productLoading = false;
  }
  addMinus(operator: string, obj: any) {
    if (operator == 'plus') {
      obj.quantity += 1;
    } else if (operator == 'minus') {
      obj.quantity -= 1;
      if (obj.quantity < 1) {
        obj.quantity = 1;
      }
    }
    this.getTotal();
  }
  logout() {
    this.allPdts.isLoggedOut();
  }
}
