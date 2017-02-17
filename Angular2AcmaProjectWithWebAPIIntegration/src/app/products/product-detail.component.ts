import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IProduct } from './product';
import Productservice = require("./product.service");

@Component({
    templateUrl: 'app/products/product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
    pageTitle: string = 'Product Detail';
    product: IProduct;
    errorMessage: string;

    constructor(private _route: ActivatedRoute,
        private _router: Router,
        private _productService: Productservice.ProductService) {
    }

    ngOnInit(): void {
        let id = +this._route.snapshot.params['id'];
        this.pageTitle += `: ${id}`;

        this._productService.getProducts()
            .subscribe(products => this.product = products.filter(prd => prd.productId === id)[0],
            error => this.errorMessage = <any>error);
    }

    onBack(): void {
        this._router.navigate(['/products']);
    }
    
    onDelete(id: number): void {
        this._productService
            .delete(this.product)
            .then(res => {
                this._router.navigate(['/products']);
            })
            .catch(error => this.errorMessage = error); // TODO: Display error message


    }
}
