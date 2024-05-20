import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ProductModel} from "../../../../../core/apis/dtos/Product.model";
import {ProductService} from "../../../../../core/Services/warehouse/ProductService";
import {Router} from "@angular/router";
import {OptionModel} from "../../../../../core/apis/dtos/Option.model";
import {SizesModel} from "../../../../../core/apis/dtos/Sizes.model";
import {ColorsModel} from "../../../../../core/apis/dtos/Colors.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProductStatus} from "../../../../../core/constanst/ProductStatus";

interface SpecificationProduct {
  value: number;
  display: string;
}

interface DisplayProductStatus {
  value: ProductStatus;
  display: string;
}

@Component({
  styleUrl: './app-add-product.component.scss',
  selector: 'app-add-product',
  templateUrl: './app-add-product.component.html',
})

export class AppAddProductComponent implements OnInit, AfterViewInit {

  //Table color is show
  showTableColor: boolean = false;


  @Input() optionSizes: OptionModel[] = [];
  @Input() optionColors: OptionModel[] = [];
  @Input() btnName: ({ display: string; value: number } | { display: string; value: number })[] =
    [{display: '', value: 0}, {display: '', value: 1}];


  @Input() sizes: SizesModel[] = [];
  itemSize: SizesModel;

  @Input() colors: ColorsModel[] = [];
  itemColor: ColorsModel;

  sizeName!: string;
  colorName!: string;

  indexSizes!: number;
  indexColors!: number;

  isInsertChose: boolean = false;
  specificationProducts: SpecificationProduct[] = [
    {value: 0, display: 'LOW'},
    {value: 1, display: 'NORMAL'},
    {value: 2, display: 'HIGH'},
    {value: 3, display: 'LIMITED'}
  ];

  categoryProducts: SpecificationProduct[] = [
    {value: 0, display: 'Áo Thun'},
    {value: 1, display: 'Áo khoác'},
    {value: 2, display: 'Quần Jean'},
    {value: 3, display: 'Áo Couple'},
    {value: 3, display: 'Quần short'}
  ];

  @Input() specName!: string
  cateName!: string

  companyName: string = "CÔNG TY THREE T";
  @Input() product!: ProductModel

  displayProductStatus: DisplayProductStatus[] = [{value: ProductStatus.ACTIVE, display: "Đang hoạt động"},
    {value: ProductStatus.COMINGSOON, display: "Sắp hoạt động"}];

  productStatus: string = this.displayProductStatus[0].value; // Mặc định là đang hoạt dộng

  isQuantityTable = 1;

  constructor(private productService: ProductService, private router: Router, private snackBar: MatSnackBar) {
    this.itemSize = new SizesModel();
    this.itemColor = new ColorsModel();
    this.product = new ProductModel();
  }

  ngAfterViewInit(): void {
  }

  onSubmit() {

  }

  ngOnInit(): void {
    if(this.sizes){
      this.showTableSize = true;
    }
    if(this.colors){
      this.showTableColor = true;
    }
  }

  closeModal() {
    this.isInsertChose = false;
  }

  optionSpecChose(display: string) {
    this.specName = display;
  }

  cateChose(display: string) {
    this.cateName = display;
  }

  validateInput(event: any): void {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) event.preventDefault();
  }

  //Table size is show
  showTableSize: boolean = false;
  isLoading: boolean = false;

  addSizeToTable() {
    let totalFormat = this.itemSize.addition?.toString();
    this.itemSize.addition = null;
    this.itemSize.addition = parseInt(totalFormat!.replaceAll(',', ''));

    this.sizes.push(this.itemSize);
    if (this.itemSize) this.showTableSize = true;
    this.optionSizes.splice(this.indexSizes!, 1);
    this.itemSize = new SizesModel();
    this.sizeName = "";
  }

  addColorToTable() {
    let totalFormat = this.itemColor.addition?.toString();
    this.itemColor.addition = null;
    this.itemColor.addition = parseInt(totalFormat!.replaceAll(',', ''));

    this.colors.push(this.itemColor);
    if (this.itemColor) this.showTableColor = true;
    //Add item to table and remove this item
    this.optionColors.splice(this.indexColors!, 1);
    //Reset binding two way data
    this.itemColor = new ColorsModel();
    this.colorName = "";
  }

  removeItemSize(index: number) {
    //Add item again to sizes and remove table size
    this.optionSizes.push(this.sizes[index].optionProduct!);
    this.sizes.splice(index, 1);
    if (this.sizes.length == 0) this.showTableSize = false;
  }

  removeItemColor(index: number) {
    //Add item again to color and remove table color
    this.optionColors.push(this.colors[index].optionProduct!)
    this.colors.splice(index, 1);
    if (this.colors.length == 0) this.showTableColor = false;
  }

  getOptionSizes(optionSize: string, index: number) {
    this.sizeName = optionSize;
    this.itemSize.optionProduct = this.optionSizes[index];
    this.indexSizes = index;
  }

  getOptionColors(optionColor: string, index: number) {
    this.colorName = optionColor;
    this.itemColor.optionProduct = this.optionColors[index];
    this.indexColors = index;
  }

  getStatusActive(status: string) {
    this.productStatus = status;
  }

  getStatusComingSoon(status: string) {
    this.productStatus = status;
  }

  addProduct() {
    //2 option them sua dua vao value[0,1]
    if (this.btnName[0].value == 0) {
      this.product.status = this.productStatus;
      this.product.specification = this.specName;
      this.product.colors = [];
      this.product.sizes = [];
      this.product.colors = this.colors;
      this.product.sizes = this.sizes;
      let totalFormat = this.product.price?.toString();
      this.product.price = null;
      this.product.price = parseInt(totalFormat!.replaceAll(',', ''));

      this.productService.addProduct(this.product).subscribe(
        (res: any) => {
          this.openSnackBar("Thêm sản phẩm thành công", "Đóng");
          this.resetPage();
        },
        error => {
          this.openSnackBar("Lỗi khi thêm sản phẩm", "Đóng");
        }
      )
    } else if (this.btnName[0].value == 1) {
      this.product.status = this.productStatus;
      this.product.sizes = [];
      this.product.sizes = this.sizes;
      this.product.colors = [];
      this.product.colors = this.colors;
      let totalFormat = this.product.price?.toString();
      this.product.price = null;
      this.product.price = parseInt(totalFormat!.replaceAll(',', ''));
      this.productService.updateProduct(this.product).subscribe(res => {
        this.openSnackBar("Sản phẩm đã được cập nhật", "Đóng");
        this.resetPage();
      },
      error => {
        this.openSnackBar("Lỗi khi cập nhật sản phẩm", "Đóng");
      })
    } else return;
  }

  resetPage() {
    // Get url
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  formatCurrency() {
  }

  checkAddProductEnter(): boolean {
    var isCheck: boolean = true;
    if (this.sizes.length != 0 && this.colors.length != 0) {
      isCheck = false;
    }
    return isCheck;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: "center",
    });
  }
}
