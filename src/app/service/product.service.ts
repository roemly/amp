import { Injectable } from '@angular/core';
import {Product} from '../class/Product';
import {PRODUCTS} from './product-data';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService {

  //private api_catalog_data_url='http://ptamp.aindo.com/api-get-catalog.php';
  private api_catalog_data_url= 'http://ptamp.aindo.com/api/api-get-catalog.php?cat_id=&member_id=1';
  private headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost',
      'Access-Control-Allow-Credentials': true
});

  products: Product[] = null;
  category = '';

  constructor(private http: Http) {
  }

  getProduct(): Product[] {
    if (this.products) {
      return this.products;
    }
    this.fetchdata1().subscribe(
        (data) => {
          this.products = data;
          return this.products;
        }
    );
  }

    // fetchdata() {
    //     //ganti link data yang mau diambil dari server disini
    //     return this.http.get('https://falsesilver.me/fiesto/public/api/post-all')
    //     // return this.http.get(this.api_catalog_data_url)
    //         .map((res) => res.json());
    // }

    fetchdata1(): Observable<Product[]> {
        //ganti link data yang mau diambil dari server disini
        return this.http.get(this.api_catalog_data_url )
            .map((res: Response) => <Product[]>res.json());
    }
    fetchDataWithKey(key: string): Observable<Product[]> {
        //ganti link data yang mau diambil dari server disini
        return this.http.get('http://fsretail.tk/fiesto/public/api/product-by-key?key=' + key + '&limit=10')
            .map((res: Response) => <Product[]>res.json());
    }

  getProductByCategory(category: string): Product[] {

    if (this.products) {
      return this.products.filter(item => item.category === category);
    }
    this.fetchdata1().subscribe(
        (data) => {
            this.products = data.filter(item => item.category === category);
            return this.products;
        }
    );
   }

  getProductById(id: number): Product{
    return (this.products) ? this.products.find(item => item.id === id) : null;
  }
}
