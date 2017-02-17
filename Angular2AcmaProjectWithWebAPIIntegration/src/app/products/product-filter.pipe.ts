import { PipeTransform, Pipe } from '@angular/core';
import Product = require("./product");

@Pipe({
    name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {


    transform(value: Product.IProduct[], filterBy: string): Product.IProduct[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;

        return filterBy? value.filter((prd: Product.IProduct) => prd.productName.toLocaleLowerCase().indexOf(filterBy) !== -1): value;

    }
}