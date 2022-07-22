import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ValidatorFn, Validators, ValidationErrors, FormControl } from "@angular/forms";
import { Observable, of } from "rxjs";
import { MemberService } from "src/app/member/service/member.service";
import { TypeProductModel } from "src/app/type-product/models/type-product.model";
import { TypeProductService } from "src/app/type-product/services/type-product.service";
import { ProductFileModel } from "../models/product-file.model";
import { ProductService } from "../service/product.service";

@Component({
    selector: 'create-product',
    templateUrl: './create-product.component.html',
    styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

    public formGroup: FormGroup;
    public fileList;
    public typeProductList: TypeProductModel[];
    public files: ProductFileModel[] = [];
    public poster;

    constructor(
        private fb: FormBuilder,
        private productService: ProductService,
        private typeProductService: TypeProductService,
        private memberService: MemberService,
    ) { }

    public ngOnInit(): void {
        this.initForm();
        this.getTypeProduct();
        this.formGroup.disable();
        this.getControl.idPoster.enable();
    }

    private initForm(): void {
        this.formGroup = this.fb.group({
            codeProduct: [null, [Validators.required]],
            nameProduct: [null, [Validators.required]],
            idPoster: [null, [Validators.required]],
            posterInformation: [null, [Validators.required]],
            typeProduct: [null, [Validators.required]],
            initialPrice: [null, [Validators.required]],
            moneyAuction: [null, [Validators.required]],
            startDate: [null, [Validators.required]],
            endDate: [null, [Validators.required]],
            productDescription: [null, [Validators.required]],
            approvalStatus: [1],
            biddingStatus: [1],
            cart: [1],
        })

        this.getControl.startDate.setValidators([Validators.required, this.customvValidateStartDate()])
        this.getControl.endDate.setValidators([Validators.required, this.customvValidateEnDate()]);

        // this.getControl.idPoster.valueChanges.subscribe(x => {
        //     this.formGroup.disable();
        //     this.getControl.idPoster.enable();
        // })
    }

    public check(): void {
        this.memberService.checkId(this.getControl.idPoster.value).subscribe(res => {
            this.formGroup.enable();
            this.poster = res;
        }, error => {
            alert('ID Poster khong ton tai')
            this.formGroup.disable();
            this.getControl.idPoster.enable();
        })
    }

    private customvValidateEnDate(): ValidatorFn {
        return (form): ValidationErrors => {

            const endDate = form.value;
            const startDate = this.getControl.startDate.value;
            if (endDate < startDate) {
                return { invalid: true };
            }

            return null;
        }
    }

    private customvValidateStartDate(): ValidatorFn {
        return (form): ValidationErrors => {

            const startDate = form.value;
            const endDate = this.getControl.endDate.value;
            if (endDate < startDate) {
                return { invalid: true };
            }

            return null;
        }
    }

    public getTypeProduct(): void {
        this.typeProductService.getAll().subscribe(res => {
            const t = res[0];
            this.typeProductList = res;
            this.getControl.typeProduct.setValue(t.idProductType);
        });
    }

    public submit(): void {
        const recusive = (form: FormGroup) => {
            for (const i in form.controls) {
                const value = form.controls[i].value;

                if (typeof value === 'string') {
                    if (Boolean(value)) {
                        form.controls[i].setValue(form.controls[i].value.trim())
                    }
                }

                if (form.controls[i] instanceof FormControl) {
                    form.controls[i].markAsDirty();
                    form.controls[i].updateValueAndValidity();
                } else {
                    recusive(form.controls[i] as FormGroup)
                }
            }
        }
        recusive(this.formGroup);

        if (this.formGroup.invalid || !this.poster) {
            return;
        }

        const i = confirm('Are you sure?')
        if (!i) return;


        const formData = new FormData();

        const data = this.formGroup.value;
        Object.keys(data).forEach(key => {
            formData.append(key, data[key]);
        })

        this.files.forEach(file => {
            formData.append('multipartFiles', file.file);
        })
        this.productService.create(formData).subscribe(res => {
            this.onChangeIdPost();
        })
    }

    public onChangeIdPost(): void {
        this.formGroup.disable();
        this.getControl.idPoster.enable();
    }

    public onUploadFile(event): void {
        const fileList = event.target.files as FileList;

        const fileArray = Array.from(fileList);
        if (fileArray.some(file => {
            return !['image/png', 'image/jpg','image/jpeg'].includes(file.type);
        })) {
            return;
        }

        fileArray.forEach(file => {
            const url = URL.createObjectURL(file);
            this.files.push({
                base64: url,
                file: file,
            })
        })

    }

    public onDeleteImage(index: number): void {
        this.files = this.files.filter((file, i) => i !== index);
    }

    public get getControl() {
        return this.formGroup.controls;
    }
}
