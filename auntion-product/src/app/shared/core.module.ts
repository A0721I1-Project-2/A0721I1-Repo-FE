import { NgModule } from "@angular/core";
import { SafePipe } from "./pipe/safe.pipe";

@NgModule({
    declarations: [
        SafePipe,
    ],
    imports: [],
    exports: [
        SafePipe,
    ]
})
export class CoreModule {}