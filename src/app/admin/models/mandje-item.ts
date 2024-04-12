import { Groente } from './groente';
import { Winkel } from './winkel';

export class MandjeItem {
  constructor(
    public id: number,
    public winkel: Winkel,
    public groente: Groente,
    public stuk: number,
    public prijs: number,
    public totaalPrijs: number
  ) {}
}
