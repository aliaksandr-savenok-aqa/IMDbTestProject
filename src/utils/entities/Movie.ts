export class Movie {
    public name: string;
    public releaseYear: number;
    public rating: number;

    constructor(name: string, releaseYear: number, rating: number) {
        this.name = name;
        this.releaseYear = releaseYear;
        this.rating = rating;
    }

    getInfo(): string {
        return `${this.name} was released in ${this.releaseYear}. It has a rating of ${this.rating}.`;
    }

    toString(): string {
        return `${this.name} (${this.releaseYear}) (${this.rating})`;
    }

    equals(other: Movie): boolean {
        return this.name.toLowerCase() === other.name.toLowerCase() && 
               this.releaseYear === other.releaseYear && 
               this.rating === other.rating;
    }
}