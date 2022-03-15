export interface BookFormSchema {
    id: string;
    author: AutherDetails;
    publication: PublicationDetails;
    title: string;
    genre: string;
    price: string;
    publish_date: string;
    description: string;
}
interface AutherDetails {
    firstname: string;
    lastname: string;
    gender: string;
}
interface PublicationDetails {
    name: string;
    website: string;
    phone: string;
    email: string;
    address: AddressDetails;
}
interface AddressDetails {
    street: string;
    city: string;
    country: string;
    zip: string;
}