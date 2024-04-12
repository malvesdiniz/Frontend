import { Component, Input, OnInit } from '@angular/core';
import { MandjeItem } from '../../models/mandje-item';

@Component({
  selector: 'winkelmandje-item',
  template: `
    <td class="winkelmandje-item-Winkel">
      {{ mandjeItem.winkel.naam }}
    </td>
    <td class="winkelmandje-item-Groente">{{ mandjeItem.groente.naam }}</td>
    <td class="winkelmandje-item-Stuk">{{ mandjeItem.stuk }}</td>
    <td class="winkelmandje-item-Prijs">
      {{ this.munt }} {{ mandjeItem.prijs }}
    </td>
    <td class="winkelmandje-item-TotaalPrijs">
      {{ this.munt }} {{ mandjeItem.totaalPrijs }}
    </td>
  `,
  styles: [
    `
      winkelmandje-item {
        width: 100%;
      }

      .winkelmandje-item-Winkel {
        width: 300px;
      }
      .winkelmandje-item-Groente {
        width: 250px;
      }
      .winkelmandje-item-Stuk {
        width: 50px;
      }
      .winkelmandje-item-Prijs {
        width: 200px;
      }
      .winkelmandje-item-TotaalPrijs {
        width: 100px;
      }
    `,
  ],
})
export class WinkelmandjeItemComponent {
  @Input() mandjeItem!: MandjeItem;
  @Input() totaal!: number;
  @Input() munt!: string;
  constructor() {}
}
