import { Injectable } from "@angular/core";
import { BookFormSchema } from "./read-form/read-form.model";

@Injectable({
    providedIn: 'root',
})
export class AppService {
    public catalog: BookFormSchema[] = [];

    constructor() { }
}