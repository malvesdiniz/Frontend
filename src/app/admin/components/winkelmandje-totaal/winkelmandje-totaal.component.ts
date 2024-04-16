import { Component, Input } from '@angular/core';

@Component({
  selector: 'winkelmandje-totaal',
  template: ` <td class="totaal-text">Totaal te betalen</td>
    <td class="totaal">{{ this.munt }} {{ this.totaal.toFixed(2) }}</td>`,
  styles: [
    `
      :host {
        width: 80%;
        display: flex;
        text-align: center;
        padding: 0 1.5%;
        gap: 20px;
      }
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
