// listing for book, clothing, sports gear, electronics, furniture
//enum to provide distinct cases (categories for item)
// Book needs: bookTitle, edition, courseNum
//Clothing needs: type, color, size
// Furniture needs: type, color, length, width, height, weight
//Electronics needs: type, model, length, width, height, weight
// sportsgear needs: type, weight
// all need: description, price, exchangeLoc, payment option, add to cart button
// don't have User class yet

export class Item {
    constructor (
        id: string,
        description: string,
        price: number,
        itemStatus: string,
        exchangeLoc: string,
        paymentOpt: string,
        ) {}
  
}

export class Book extends Item{
  
    public bookTitle!: string;
    public edition!: number;
    public courseNum!: string;
  
}

export class Clothing extends Item{

    public type!: string;
    public color!: string;
    public size!: string;
  
}

export class Furniture extends Item{
    public type!: string;
    public color!: string;
    public length!: string;
    public width!: string; 
    public height!: string;
    public weight!: string;
}

export class Electronics extends Item{
    public type!: string;
    public model!: string;
    public length!: string;
    public width!: string; 
    public height!: string;
    public weight!: string;
}

export class Sportsgear extends Item{
    public type!: string;
    public weight!: string;
}