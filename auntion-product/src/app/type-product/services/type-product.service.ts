import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { TypeProductModel } from "../models/type-product.model";

@Injectable({
    providedIn: 'root'
})
export class TypeProductService {

    constructor(
        private http: HttpClient,
    ) {}

    public getAll(): Observable<TypeProductModel[]> {
        return this.http.get<TypeProductModel[]>(`${environment.API_GETWAY}/manager/type-product/api`);
    }
}