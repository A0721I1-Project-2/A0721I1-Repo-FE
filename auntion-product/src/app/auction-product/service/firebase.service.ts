import { Injectable } from '@angular/core';
import {ImageProduct} from '../../model/ImageProduct';
import {AngularFireStorage} from '@angular/fire/storage';

import {AuctionProductService} from './auction-product.service';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Product} from '../../model/Product';
import {ImgProductServiceService} from './img-product-service.service';
import {finalize} from 'rxjs/operators';
import {FileUpload} from '../../model/FileUpload';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  urlImgs: any;
  imgProductObj: ImageProduct = null;
  imgProductList: any[] = [];
  constructor(private storage: AngularFireStorage, private db: AngularFireDatabase, private imgProductService: ImgProductServiceService
    ,         private productService: AuctionProductService) {
  }
  pushImgToStorage(fileUpload: FileUpload, product?: Product) {
    /* Tạo folder treen firebase */
    const filePath = `images/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        storageRef.getDownloadURL().subscribe(downloadURL => {
          fileUpload.url = downloadURL;
          fileUpload.name = fileUpload.file.name;
          this.imgProductObj = new ImageProduct(fileUpload.url, product);
          this.imgProductObj.id = null;
          this.imgProductService.createImgProduct(this.imgProductObj).subscribe(() => {
            console.log('created');
          });
        });
      })
    ).subscribe();
  }
}

