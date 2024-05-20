import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AppAddProductComponent} from "../components/app-add-product/app-add-product.component";
import {AppSeachProductComponent} from "../components/app-seach-product/app-seach-product.component";
import {ProductService} from "../../../../core/Services/warehouse/ProductService";
import {ResponseModel} from "../../../../core/apis/dtos/Response.model";
import {BaseSearchModel} from "../../../../core/apis/dtos/Base-search.model";
import {OptionService} from "../../../../core/Services/warehouse/OptionService";
import {ProductModel} from "../../../../core/apis/dtos/Product.model";
import {Router} from "@angular/router";
import {firebaseConfig} from "../../../../core/environment/environnemtFireBase";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {OptionModel} from "../../../../core/apis/dtos/Option.model";
import {SizesModel} from "../../../../core/apis/dtos/Sizes.model";
import {ColorsModel} from "../../../../core/apis/dtos/Colors.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProductStatus} from "../../../../core/constanst/ProductStatus";
import {MatDialog} from "@angular/material/dialog";
import {ModalConfirmComponent} from "../../../../shared/components/modal-confirm/modal-confirm.component";

interface btnFunction {
  value: number;
  display: string;
}

interface IMageInFirebase {
  pathInDB: string;
  PathInFirebase: string;
}

interface ProductDisplayStatus {
  value: ProductStatus,
  display: string
}

@Component({
  selector: 'app-product', templateUrl: './product.component.html', styleUrl: './product.component.scss'
})

export class ProductComponent implements OnInit, AfterViewInit {
  //Format table
  tableFormat: string = "table table-bordered table-striped";
  @ViewChild("searchWrapper") searchWrapper!: AppSeachProductComponent;
  @ViewChild("AddWrapper") addWrapper!: AppAddProductComponent;

  //DTO Product
  productList: ProductModel[] = []; // Tao danh sach chua cac mon an
  public search: BaseSearchModel<ProductModel[]> = new BaseSearchModel<ProductModel[]>();
  productInformation: ProductModel = new ProductModel();

  optionSizes: OptionModel[] = [];
  optionColors: OptionModel[] = [];

  sizesName: any[] = []; //Lưu danh sách Size có tên
  colorsName: any[] = []; //Lưu danh sách Color có tên

  isShowLoading: boolean = false;
  productId: string = '';

  isBtnName: ({ display: string; value: number } | { display: string; value: number })[] = [{
    display: '', value: 0
  }, {display: '', value: 1}];

  displayProduct: ProductDisplayStatus[] = [{value: ProductStatus.ACTIVE, display: "Đang hoạt động"},
    {value: ProductStatus.COMINGSOON, display: "Sắp hoạt động"}];

  // pathInDB sẽ là image trong csdl , PathInFirebase là image trên firebase

  ImageInFirebase: IMageInFirebase[] = [
    {pathInDB: 'assets/food_default.jpg', PathInFirebase: 'assets/food_default.jpg'},
  ];

  sizeInfo: SizesModel[] = [];
  colorInfo: ColorsModel[] = [];

  searchTermTable: string = '';
  productFill: ProductModel[] = this.productList;

  no: number = 1;

  constructor(private productService: ProductService, private optionService: OptionService,
              private router: Router, private firebaseStorage: AngularFireStorage, private snackBar: MatSnackBar,
              private dialog: MatDialog) {
  }

  showInsertForm() {
    this.isBtnName[0].value = 0;
    this.isBtnName[0].display = "Thêm";
    this.addWrapper.isInsertChose = true;
    this.productInformation = new ProductModel();
    this.sizeInfo = [];
    this.colorInfo = [];
  }

  showSeachForm() {
    console.log(this.searchWrapper);
    this.searchWrapper.isSeachChose = true;
  }

  ngOnInit(): void {
    this.getAllProduct();
    //console.log(this.getAllProduct());
    this.getAllOptionSizes();
    this.getAllOptionColors();
  }

  ngAfterViewInit(): void {

  }

  private getAllProduct() {
    this.isShowLoading = true;
    this.productService.getAllProduct().subscribe(res => {
      this.getAllProductComplete(res)
      console.log(res.result)
    });
  }

  async getAllProductComplete(res: ResponseModel<BaseSearchModel<ProductModel[]>>) {
    if (res.status !== 200) {
      if (res.message) {
        res.message.forEach(value => {
          var t: any;
          t.error.message(value);
        });
        return;
      }
    }
    this.search = res.result;

    // lấy lấy hết địa chỉ hình ảnh trong csdl
    let imagePath: string[] = [];
    for (let i = 0; i < this.search.result.length; i++) {
      if (!imagePath.includes(this.search.result[i].image)) {
        imagePath.push(this.search.result[i].image);
      }
    }

    //cập nhật địa chỉ hình anh firebase cho từng sản phẩm
    await this.loadImages(imagePath);
    for (let i = 0; i < this.search.result.length; i++) {
      if (this.search.result[i] != undefined) {
        try {
          const foundElement = this.ImageInFirebase.find(element =>
            element.pathInDB === this.search.result[i].image);

          if (foundElement) this.search.result[i].image = foundElement!.PathInFirebase;
          else this.search.result[i].image = this.ImageInFirebase[0].PathInFirebase;
        } catch (error) {
          // Xử lý lỗi nếu cần
          console.error('Error loading image:', error);
        }
      }
    }

    // thêm 25 sản phẩm đầu tiên để show
    this.search.recordOfPage = 25;
    for (let i = 0; i < this.search.recordOfPage; i++) {
      if (this.search.result[i] != undefined) {
        // lấy địa chỉ hinh` ảnh trên firetore
        this.productList.push(this.search.result[i]);
      }
    }
    setTimeout(() => {
      this.isShowLoading = false;
    }, 1000)
  }

  getAllOptionSizes() {
    this.optionService.getAllOptionSizes().subscribe(res => {
      this.optionSizes = res.result;
      this.sizesName = this.optionSizes;
    });
  }

  getAllOptionColors() {
    this.optionService.getAllOptionColors().subscribe(res => {
      this.optionColors = res.result;
      this.colorsName = this.optionColors;
    });
  }

  getProductData(id: string, product: ProductModel) {
    //alert("Product id: " + id);
    this.productId = id;
    //APIs get product by id
    this.productService.getProductId(id).subscribe((res) => {
      product = res;
    })
  }

  resetPage() {
    // Get url
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  deleteProduct() {
    this.openDialog();
  }

  updateProduct() {
    this.showInsertForm();
    this.isBtnName[0].value = 1;
    this.isBtnName[0].display = "Cập nhật";
    //Lấy sản phẩm theo id được chọn
    this.productService.getProductId(this.productId).subscribe(res => {
      this.productInformation.colors = [];
      this.productInformation.sizes = [];
      this.productInformation = res.result;
      this.sizeInfo = this.productInformation.sizes!;
      this.colorInfo = this.productInformation.colors!;
    })
  }


  receiveDataFromChildSeach(products: ProductModel[]) {
    if (products) {
      this.productList = [];
      this.productList = products;
      this.productFill = this.productList;
    } else {
      this.getAllProduct();
    }
  }

  async loadImages(imagePath: string[]) {
    const promises = imagePath.map(async (path) => {
      const storagePath = firebaseConfig.pre_imagePath + path;
      const storageRef = this.firebaseStorage.refFromURL(storagePath);

      try {
        const url = await new Promise<string>((resolve, reject) => {
          storageRef.getDownloadURL().subscribe(
            (downloadUrl: string) => {
              resolve(downloadUrl);
            },
            (error: any) => {
              console.error('Error getting download URL:', error);
              reject(error);
            }
          );
        });
        this.ImageInFirebase.push({pathInDB: path, PathInFirebase: url});
      } catch (error) {
        // Xử lý lỗi nếu cần
        console.error('Error loading image:', error);
      }
    });
    await Promise.all(promises);
  }

  //Lọc sản phẩm theo từng thuộc tính của sản phẩm
  filterImporting(): void {
    const searchTermLC = this.searchTermTable.toLowerCase().trim();
    if (searchTermLC === '') {
      this.productFill = this.productList;
      return;
    }
    this.productFill = this.productList.filter(product =>
      product?.code!.toLowerCase().includes(searchTermLC) || product.name!.toLowerCase().includes(searchTermLC)
      || product.price?.toString()!.toLowerCase().includes(searchTermLC)
    );
  }

  exportDataToExcels() {

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: "center",
    });
  }

  getStatusOfProduct(status: string) {
    if (status) {
      if (status === this.displayProduct[0].value)
        return this.displayProduct[0].display;
      else
        return this.displayProduct[1].display;
    }
    return;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalConfirmComponent, {
      width: '300px',
      data: {message: 'Bạn có chắc chắn xóa sản phẩm này ?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.productId) {
          this.productService.deleteProduct(this.productId).subscribe((res) => {
            this.openSnackBar("Đã xóa sản phẩm", "Đóng");
            this.resetPage();
          }, error => {
            this.openSnackBar("Lỗi khi xóa sản phẩm này", "Đóng");
          })
        }
      } else {
        return;
      }
    });
  }
}
