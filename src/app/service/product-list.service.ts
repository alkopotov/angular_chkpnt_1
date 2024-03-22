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


  public fetchProducts(): void {
    fetch('https://dummyjson.com/products?limit=50')
      .then(res => res.json())
        .then(data =>  {
          this.products = data.products;
        })
  }


  private get _initialPriceList(): number[] {
    return this._filteredProducts.map((elem: any) => +elem.price).sort((a: number, b: number) => a - b)
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
    if (this.currentPrice === '') return Math.floor((this.maxPrice + this.minPrice) / 2)
    
    return Math.floor((this.maxPrice + this.minPrice) / 2)
  }


  private get _filteredProducts(): any[] {
    return this.products.filter(product => {
      return product.title.toLowerCase().includes(this.searchValue.toLocaleLowerCase())
        && (this.categorySelected === 'all' || product.category === this.categorySelected)
        && (Math.round(product.rating) <= +this.maxRating)
    });

  }
  public get displayedProducts() : any[] {
    return this.products.filter(product => {
      return product.title.toLowerCase().includes(this.searchValue.toLocaleLowerCase())
        && (this.categorySelected === 'all' || product.category === this.categorySelected)
        && (Math.round(product.rating) <= +this.maxRating)
        && (this.currentPrice === '' || product.price <= +this.currentPrice)
    });
  }

  public get categories(): string[] {
    if (this.searchValue === '' && this.maxRating === '5') {
      return [...new Set(this.products.map((elem: any) => elem.category)), 'all'].sort();
    }
    return [...new Set(this.displayedProducts.map((elem: any) => elem.category)), 'all'].sort();
  }

  public resetPriceInput(): void {
    this.currentPrice = '';
  }
}
