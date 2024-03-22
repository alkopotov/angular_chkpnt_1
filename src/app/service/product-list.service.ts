import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  constructor(private http: HttpClient) { }

  public products: any[] = [];

  public maxRating: string = '5';

  public searchValue: string = '';

  public currentPrice: string = '';

  public categorySelected: string = 'all';

  public priceRangeMin: number = this.minPrice;
  
  public priceRangeMax: number = this.maxPrice;

  public priceRangeValue: number = Math.floor((this.minPrice + this.maxPrice) / 2);

  public fetchProducts(): void {
    fetch('https://dummyjson.com/products?limit=50')
      .then(res => res.json())
        .then(data =>  {
          this.products = data.products
          this.definePriceInput();
        })
  }


  private get _initialPriceList(): number[] {
    return this.products.map((elem: any) => +elem.price).sort((a: number, b: number) => a - b)
  }

  public get maxPrice(): number {
    return this._initialPriceList[this._initialPriceList.length - 1];
  }

  public get minPrice(): number {
    return this._initialPriceList[0];
  }

  private get _displayedPriceList(): number[] {
    return this.displayedProducts.map((elem: any) => +elem.price).sort((a: number, b: number) => a - b)
  }

  public get defaultValue(): number {
    if (this.currentPrice === '') return this.maxPrice
    if (+this.currentPrice < this.maxPrice) {
      return +this.currentPrice
    }
    return this.maxPrice
  }

  public get displayedProducts() : any[] {
    return this.products.filter(product => {
      return product.title.toLowerCase().includes(this.searchValue.toLocaleLowerCase())
        && (this.categorySelected === 'all' || product.category === this.categorySelected)
        && (Math.round(product.rating) <= +this.maxRating)
        && (this.currentPrice === '' || product.price <= this.currentPrice)

    });
  }

  public get categories(): string[] {
    if (this.searchValue === '' && this.maxRating === '5') {
      return [...new Set(this.products.map((elem: any) => elem.category)), 'all'].sort();
    }
    return [...new Set(this.displayedProducts.map((elem: any) => elem.category)), 'all'].sort();
  }

  public definePriceInput(): void {
    this.priceRangeMin = this._displayedPriceList[0];
    this.priceRangeMax = this._displayedPriceList[this._displayedPriceList.length - 1];
    this.priceRangeValue = Math.floor((this.priceRangeMin + this.priceRangeMax) / 2)
  }
}
