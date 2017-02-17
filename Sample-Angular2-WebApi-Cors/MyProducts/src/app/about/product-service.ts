
import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import Product = require("./product");

@Injectable()
export class ProductService {
    // private productUrl = "http://lenovo-pc/MyLOB.WebAPI/api/products";

    private productUrl = "http://localhost/MyWebAPI/Api/Products";
    errorMessage: string;
    constructor(private http: Http) {

    }

    getProduct(productId: number): Promise<Product.Product> {
        return this.http.get(this.productUrl + "/" + productId).toPromise().then(a => { var prds = <Product.Product>a.json(); return prds; }).catch(this.handleError);
    }

    createProduct(product: Product.Product): Promise<Product.Product> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        let url = `${this.productUrl}/${0}`;
        return this.http.post(url, JSON.stringify(product), { headers: headers }).toPromise().then(res => {
            alert(res.json().data);
            return res.json().data;
        }).catch(this.handleError);

    }

    updateProduct(product: Product.Product): Promise<Product.Product> {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        if (product.productId > 0) {
            let url = `${this.productUrl}/${product.productId}`;
            return this.http.put(url, JSON.stringify(product), { headers: headers }).toPromise().then(() => product).catch(this.handleError);
        }

    }

    deleteProduct(product: Product.Product): Promise<Response> {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let url = `${this.productUrl}/${product.productId}`;

        return this.http.delete(url, { headers: headers }).toPromise().catch(this.handleError);;
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}