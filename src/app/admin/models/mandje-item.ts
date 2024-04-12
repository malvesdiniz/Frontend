import { Groente } from './groente';
import { Winkel } from './winkel';

export class MandjeItem {
  public id?: number;
  constructor(
    public winkel: Winkel,
    public groente: Groente,
    public stuk: number,
    public prijs: number,
    public totaalPrijs: number
  ) {}
}
