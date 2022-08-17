export class Formmodel {
   constructor(
    firstname: string,
    lastname: string,
    phone: string,
    favframework: string,
    jobtimings: string,
   ){}
}

export interface Formmodel {
    firstname: string,
    lastname: string,
    phone: string,
    favframework: string,
    jobtimings: string,
}

export interface User {
    fullname: string;
    email: string;
    password: string;
    age: number;
    image:string;
}

export class SearchModel {
    query: string;
    filtertype: string;
    constructor(
        query: string,
        filtertype: string,
    ){
        this.query = query;
        this.filtertype = filtertype;
    }
}

export interface Search {
    query?: string,
    filtertype?: string,
}