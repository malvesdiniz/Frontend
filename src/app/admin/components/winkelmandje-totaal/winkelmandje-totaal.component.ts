import { Component, Input } from '@angular/core';

@Component({
  selector: 'winkelmandje-totaal',
  template: ` <td class="totaal-text">Totaal te betalen</td>
    <td class="totaal">{{ this.munt }} {{ this.totaal }}</td>`,
  styles: [
    `
      .totaal-text {
        width: 830px;
      }
      .totaal {
        width: 100px;
      }
    `,
  ],
})
export class WinkelmandjeTotaalComponent {
  @Input() totaal!: number;
  @Input() munt!: string;

  constructor() {}
}
