import {AfterViewInit, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProductService} from "../../../../../core/Services/warehouse/ProductService";
import {ProductModel} from "../../../../../core/apis/dtos/Product.model";
import {Router} from "@angular/router";
import {ProductSearchModel} from "../../../../../core/apis/dtos/Product-search.model";


interface optionPriceValue {
  display: string
}

@Component({
  selector: 'app-search-payment',
  templateUrl: './app-search-payment.component.html',
})

export class AppSearchPaymentComponent implements OnInit, AfterViewInit {
  priceDisplayOption: string = '';

  productPriceRange: string = '';
  productCode: string = '';
  productName: string = '';

  seach: ProductSearchModel = new ProductSearchModel();

  isSeachChose: boolean = false;
  productItem!: ProductModel

  //Gửi một danh sách product khi seach được đến view cha
  @Output() dataProductIsSeach = new EventEmitter<ProductModel[]>();
  products: ProductModel[] = [];

  optionPriceDefault: optionPriceValue[] = [
    {display: "Thấp nhất"},
    {display: "200,000 - 400,000"},
    {display: "400,000 - 600,000"},
    {display: "600,000 - 800,000"},
    {display: "800,000 - 1,000,000"},
    {display: "Cao nhất"}
  ];

  constructor(private productService: ProductService, private router: Router) {
    this.productItem = new ProductModel();
  }

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
  }

  closeModal() {
    this.isSeachChose = false;
  }

  resetPage() {
    // Get url
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  btnSeach(products: ProductModel[]) {
    this.seach.idCompany = "";
    this.seach.status = "True"
    this.seach.rangePrice = this.productPriceRange;
    this.seach.name = this.productName;
    this.seach.code = this.productCode;

    this.productService.advanceSearch(this.seach).subscribe(
      (res) => {
        products = res.result.result;
        console.log(products);
        //Vì tính liên tục của angular nên phải gán products liên tục chỗ này
        this.dataProductIsSeach.emit(products);
      }
    )
  }

  loadProductFirst() {
    this.resetPage();
  }

  getOptionValuePrice(optionPrice: optionPriceValue) {
    this.priceDisplayOption = optionPrice.display;
    this.productPriceRange = optionPrice.display;
  }
}
