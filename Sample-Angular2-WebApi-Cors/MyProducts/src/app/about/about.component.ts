import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Product } from './product';
import Productservice = require("./product-service");

@Component({
    selector: 'about',
    styleUrls: ['./about.component.css'],
    templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {


    pageTitle: string;
    productId: number;
    product: Product;
    message: any;
    constructor(private productService: Productservice.ProductService) {
        this.pageTitle = "Product Info";
        if (!this.productId) {
            this.productId = 1;
        }

    }

    ngOnInit(): void {
        this.message = "";
        if (!this.product) {
            this.productService.getProduct(1).then(res => this.product = res);
        } else {
            this.productService.getProduct(this.product.productId).then(res => this.product = res);
        }
    }

    onGet(): void {
        this.message = "";
        this.productService.getProduct(this.product.productId).then(res => {
            this.product = res;
            this.productId = res.productId;
        }).catch(error => this.message = error);
    }
    onUpdate(): void {
        this.message = "";
        this.productService.updateProduct(this.product).then(res => { this.product = res; this.message = "Updated" }).catch(error => this.message = error);
    }

    onCreate(): void {
        this.message = "";
        this.product.productId = 0;
        this.productService.createProduct(this.product).then(res => { this.product = res; this.message = "Created" }).catch(error => this.message = error);
    }
    onDelete(): void {
        this.message = "";
        this.productService.deleteProduct(this.product).then(res => { this.message = "Deleted" }).catch(error => this.message = error);
    }
};
