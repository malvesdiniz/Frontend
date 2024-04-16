import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MandjeItem } from '../../models/mandje-item';
import { WinkelMandjeService } from '../../services/winkel-mandje.service';
import { MuntService } from '../../services/munt.service';

@Component({
  selector: 'winkelmandje',
  template: `
    <table class="winkelMandjeTable">
      <tbody>
        <tr>
          <th>Winkelmandje</th>
        </tr>

        <tr>
          <td class="geld-button">
            <button (click)="muntWisselen.emit()">
              {{ munt === 'EUR' ? 'USD' : 'EUR' }}
            </button>
          </td>
        </tr>
        <tr *ngFor="let item of mandjeItems">
          <winkelmandje-item
            [mandjeItem]="item"
            [munt]="munt"
            (deleteMandjeItem)="deleteItem($event)"
            (wisselMandjeItem)="aantalWisselen($event.id, $event.aantal)"
          ></winkelmandje-item>
        </tr>
        <tr *ngIf="mandjeItems[0]" class="totaal">
          <winkelmandje-totaal
            [totaal]="totaal"
            [munt]="munt"
          ></winkelmandje-totaal>
        </tr>
      </tbody>
    </table>
  `,
  styles: [
    `
      :host {
        width: 95%;
        font-size: 18px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 5px;

        margin: 100px auto;
        background-color: #f4cbc6;
        gap: 20px;
      }

      th {
        font-size: 35px;
        background-color: #f4cbc6;
        border: none;
      }

      .geld-button {
        text-align: right;
        padding-right: 20px;
        background-color: #f4cbc6;
      }

      .totaalBetalenBedraag {
        width: 100px;
      }
      .totaal {
        background-color: #db7bae;
      }
    `,
  ],
})
export class WinkelmandjeComponent {
  @Input() mandjeItems!: MandjeItem[];
  @Input() totaal!: number;
  @Input() munt!: string;
  @Output() muntWisselen = new EventEmitter();
  @Output() deleteMandjeItem = new EventEmitter<number>();
  @Output() wisselMandjeItem = new EventEmitter<{
    id: number;
    aantal: number;
  }>();
  constructor() {}

  deleteItem(id: number) {
    this.deleteMandjeItem.emit(id);
  }

  aantalWisselen(id: number, aantal: number) {
    console.log(id + ' ' + aantal);
    this.wisselMandjeItem.emit({ id: id, aantal: aantal });
  }
}
