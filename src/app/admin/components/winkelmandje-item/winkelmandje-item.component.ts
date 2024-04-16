import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MandjeItem } from '../../models/mandje-item';

@Component({
  selector: 'winkelmandje-item',
  template: `
    <td class="winkelmandje-item-Winkel">
      {{ mandjeItem.winkel.naam }}
    </td>
    <td class="winkelmandje-item-Groente">{{ mandjeItem.groente.naam }}</td>
    <td>
      <img
        src="../../../../../assets/img/{{ mandjeItem.id }}.jpg"
        width="50px"
      />
    </td>
    <td class="winkelmandje-item-Stuk">
      <input
        #aantalChange
        type="number"
        [value]="mandjeItem.stuk"
        (change)="aantalWisselen(mandjeItem.id!, $event)"
      />
    </td>
    <td>x</td>
    <td class="winkelmandje-item-Prijs">
      {{ this.munt }} {{ mandjeItem.prijs.toFixed(2) }}
    </td>
    <td class="winkelmandje-item-TotaalPrijs">
      {{ this.munt }} {{ mandjeItem.totaalPrijs.toFixed(2) }}
    </td>
    <td>
      <button (click)="deleteItem(mandjeItem.id!)">
        <img src="../../../../../assets/img/delete.png" width="20px" />
      </button>
    </td>
  `,
  styles: [
    `
      :host {
        width: 80%;
        display: flex;
        text-align: center;
        padding: 0 10%;
        gap: 20px;
      }

      input {
        width: 30px;
      }
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
        padding-right: 40px;
      }
      .winkelmandje-item-Prijs {
        width: 200px;
      }
      .winkelmandje-item-TotaalPrijs {
        width: 100px;
      }

      button {
        background-color: transparent;
        border: none;
        align-content: center;
      }

      td {
        display: flex;
        justify-content: center;
        flex-direction: column;
      }
    `,
  ],
})
export class WinkelmandjeItemComponent {
  @Input() mandjeItem!: MandjeItem;
  @Input() totaal!: number;
  @Input() munt!: string;
  @Output() deleteMandjeItem = new EventEmitter<number>();
  @Output() wisselMandjeItem = new EventEmitter<{
    id: number;
    aantal: number;
  }>();

  constructor() {}

  deleteItem(id: number) {
    this.deleteMandjeItem.emit(id);
  }

  aantalWisselen(id: number, event: Event) {
    const target = event.target as HTMLInputElement;
    let aantal: number = Number(target.value);
    this.wisselMandjeItem.emit({ id: id, aantal: aantal });
  }
}
