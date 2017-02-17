import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IProduct } from './product';
import Productservice = require("./product.service");

@Component({
    templateUrl: 'app/products/product-add.component.html'
})
export class ProductAddComponent implements OnInit {
    pageTitle: string = 'Product Add';
    product: IProduct;
    errorMessage: string;

    constructor(private _route: ActivatedRoute,
        private _router: Router,
        private _productService: Productservice.ProductService) {
    }

    ngOnInit(): void {

        let id = +this._route.snapshot.params['id'];
        

        this._productService.getProducts()
            .subscribe(products => this.product = products.filter(prd => prd.productId === id)[0],
            error => this.errorMessage = error);
    }

    onSave(): void {
        this._productService
            .save(this.product)
            .then(prd => {
                this.product = prd; // saved hero, w/ id if new
                this.goBack(prd);
            })
            .catch(error => this.errorMessage = error); // TODO: Display error message
    }

    goBack(savedHero: IProduct = null): void {
        //this.close.emit(savedHero);
        //if (this.navigated) { window.history.back(); }
        this._router.navigate(['/products']);
    }
}
