import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule} from '../shared/shared.module';
import Productlistcomponent = require("./product-list.component");
import Productdetailcomponent = require("./product-detail.component");
import Producteditcomponent = require("./product-edit.component");
import Productaddcomponent = require("./product-add.component");
import Productfilterpipe = require("./product-filter.pipe");
import Productguardservice = require("./product-guard.service");
import Productservice = require("./product.service");

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            { path: 'products', component: Productlistcomponent.ProductListComponent },
            { path: 'addProduct', component: Productaddcomponent.ProductAddComponent },
            {
                path: 'editProduct/:id',
                component: Producteditcomponent.ProductEditComponent
            },
            {
                path: 'product/:id',
                canActivate: [Productguardservice.ProductDetailGuard],
                component: Productdetailcomponent.ProductDetailComponent
            }

        ])
    ],
    declarations: [
        Productlistcomponent.ProductListComponent,
        Productdetailcomponent.ProductDetailComponent,
        Productfilterpipe.ProductFilterPipe,
        Producteditcomponent.ProductEditComponent,
        Productaddcomponent.ProductAddComponent

    ],
    exports: [],
    providers: [
        Productservice.ProductService,
        Productguardservice.ProductDetailGuard
    ]
})
export class ProductModule {
    
}

