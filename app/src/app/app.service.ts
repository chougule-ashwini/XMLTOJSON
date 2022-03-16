import { Injectable } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BookFormSchema } from "./app.model";

@Injectable({
    providedIn: 'root',
})
export class AppService {
    public catalog: BookFormSchema[] = [];
    public selectedBooks: BookFormSchema[] = [];
    public lastBookId = '';

    public bookArray!: FormArray;
    constructor(private catalogFormBuilder: FormBuilder,) { }

    createCatalogForm() {
        this.bookArray = this.catalogFormBuilder.array([], { updateOn: 'blur' });
        this.bookArray.push(this.addBookForm());
        return this.bookArray;
    }

    addBookForm() {
        return this.catalogFormBuilder.group({
            id: [this.generateBookId(), Validators.required],
            author: this.catalogFormBuilder.group({
                firstname: ['', Validators.required],
                lastname: ['', Validators.required],
                gender: ['', Validators.required],
            }),
            publication: this.catalogFormBuilder.group({
                name: ['', Validators.required],
                website: ['', Validators.required],
                phone: ['', Validators.required],
                email: ['', Validators.required],
                address: this.catalogFormBuilder.group({
                    street: ['', Validators.required],
                    city: ['', Validators.required],
                    country: ['', Validators.required],
                    zip: ['', Validators.required],
                }),
            }),
            title: ['', Validators.required],
            genre: ['', Validators.required],
            price: ['', Validators.required],
            publish_date: ['', Validators.required],
            description: ['', Validators.required],
        });
    }

    removeBookForm(index: number) {
        this.bookArray.removeAt(index);
    }

    resetCatalog() {
        this.bookArray.clear();
        this.bookArray.push(this.addBookForm());
        return this.bookArray;
    }

    getCatalogFormData(xmlData: BookFormSchema[]) {
        this.bookArray = this.catalogFormBuilder.array([], { updateOn: 'blur' });
        for (const book of xmlData) {
            this.bookArray.push(this.catalogFormBuilder.group({
                id: [book.id, Validators.required],
                author: this.catalogFormBuilder.group({
                    firstname: [book.author.firstname, Validators.required],
                    lastname: [book.author.lastname, Validators.required],
                    gender: [book.author.gender, Validators.required],
                }),
                publication: this.catalogFormBuilder.group({
                    name: [book.publication.name, Validators.required],
                    website: [book.publication.website, Validators.required],
                    phone: [book.publication.phone, Validators.required],
                    email: [book.publication.email, Validators.required],
                    address: this.catalogFormBuilder.group({
                        street: [book.publication.address.street, Validators.required],
                        city: [book.publication.address.city, Validators.required],
                        country: [book.publication.address.country, Validators.required],
                        zip: [book.publication.address.zip, Validators.required],
                    }),
                }),
                title: [book.title, Validators.required],
                genre: [book.genre, Validators.required],
                price: [book.price, Validators.required],
                publish_date: [book.publish_date, Validators.required],
                description: [book.description, Validators.required],
            })
            );
        }
        return this.bookArray;
    }
    clearPreviousXMLData() {
        this.catalog = [];
        this.selectedBooks = [];
    }

    generateBookId() {
        if (this.catalog.length && this.lastBookId == '') {
            let lastId = this.catalog[this.catalog.length - 1].id;
            this.lastBookId = 'bk' + (Number(lastId.slice(2)) + 1);
            return this.lastBookId;
        } else if (this.lastBookId != '') {
            let lastId = this.lastBookId;
            this.lastBookId = 'bk' + (Number(lastId.slice(2)) + 1);
            return this.lastBookId;
        } else return 'bk101';
    }
}