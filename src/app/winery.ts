/*
** ===========================================================================
** File: Winery.ts
** Author: Alina Shtramwasser
** Created Date: Feb 15, 2023
** ---------------------------------------------------------------------------
**
** defines the interface IWinery and class Winery
*/
export interface IWinery {
    Id: string |null |undefined;
    Name: string;
    Address: string;
    Url: string;
    Rating?: number;
    Phone: string;
    Email: string;
    ImageTitle: string;
    Notes: string;
    toString(): string;
}
export class Winery implements IWinery {

    constructor(
        //this shouldn't happen 
        public Id: string | null | undefined,
        public Name: string,
        public Address: string,
        public Url: string,
        public Phone: string,
        public Email: string,
        public ImageTitle: string,
        public Rating: number,
        public Notes: string
    ) { }
    /*
    ** toString implementation for class Winery
    */
    public toString = (): string => {
        return JSON.stringify(this);
    }
}
