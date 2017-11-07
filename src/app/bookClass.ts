export class Book {
  constructor(
    public title: string,
    public genres: Array<{string}>,
    public author: string,
    public imgSrc: string,
    public shortSummary: string,
    public ISBN: number,
    public Published: string,
    public qtyAvailable: number,
    public totalQty: number,
    public totalRating: number,
    public prologue: number,
    public comments: Array<{name: string, date: string, title: string, rating: number, content: string}>
  ) { }
}
