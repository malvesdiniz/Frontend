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
          <td><strong>Winkelmandje</strong></td>
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
      .geld-button {
        text-align: right;
      }
      .totaalBetalenText {
      }
      .totaalBetalenBedraag {
        width: 100px;
      }
      .totaal {
        background-color: #d0f0c0;
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

  constructor() {}

  deleteItem(id: number) {
    this.deleteMandjeItem.emit(id);
  }
}
