import { Component, OnInit, numberAttribute } from '@angular/core';
import { Winkel } from '../../models/winkel';
import { Groente } from '../../models/groente';
import { MandjeItem } from '../../models/mandje-item';
import { WinkelService } from '../../services/winkel.service';
import { GroenteService } from '../../services/groente.service';
import { WinkelMandjeService } from '../../services/winkel-mandje.service';
import { MuntService } from '../../services/munt.service';

@Component({
  selector: 'winkel',
  template: `
    <div>
      <header>
        <div class="page-title">
          <img src="../../../../../assets/img/logo.png" width="150px" />
          <h1>Groentenwinkelketen de vrolijke konijntjas</h1>
        </div>
        <p>Bestal nu, geleverd binnen het uur!</p>
      </header>
    </div>

    <bestelformulier
      [winkels]="winkels"
      [groenten]="groenten"
      (mandjeItem)="setMandjeItem($event)"
      [munt]="munt"
    ></bestelformulier>
    <winkelmandje
      *ngIf="mandjeItems.length > 0"
      (muntWisselen)="muntWisselen()"
      [mandjeItems]="mandjeItems"
      [totaal]="totaal"
      [munt]="munt"
      (deleteMandjeItem)="deleteMandjeItem($event)"
      (wisselMandjeItem)="aantalWisselen($event.id, $event.aantal)"
    ></winkelmandje>
  `,
  styles: [
    `
      :host {
        margin: 40px;
      }

      header {
        color: #b77e7b;
        background-color: #f4cbc6;
        margin: 0;
        margin-bottom: 30px;
        padding: 50px;
        padding-bottom: 10px;
        display: flex;
        flex-wrap: wrap;
      }
      .page-title {
        width: 85%;
        align-items: center;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 50px;
      }

      header p {
        padding-left: 80%;
      }
    `,
  ],
})
export class WinkelComponent implements OnInit {
  winkels: Winkel[] = [];
  groenten: Groente[] = [];
  mandjeItems: MandjeItem[] = [];
  totaal!: number;
  munt!: string;

  constructor(
    private winkelService: WinkelService,
    private groentenService: GroenteService,
    private winkelMandjeService: WinkelMandjeService,
    private muntService: MuntService
  ) {}

  ngOnInit(): void {
    this.getGroenten();
    this.getMandjeItems();
    this.getMunt();
    this.getTotaal();
    this.getWinkels();
  }

  getWinkels() {
    return this.winkelService.getWinkels().subscribe((winkels) => {
      this.winkels = winkels;
    });
  }

  setMandjeItem(mandjeItem: MandjeItem) {
    this.winkelMandjeService
      .postMandjeItem(mandjeItem)
      .subscribe((mandjeItems) => {
        this.getTotaal();
        this.mandjeItems = mandjeItems;
      });
  }

  getGroenten() {
    return this.groentenService.getGroenten().subscribe((groenten) => {
      this.groenten = groenten;
    });
  }

  getMandjeItems() {
    this.winkelMandjeService.getMandjeItem().subscribe((mandjeItems) => {
      this.mandjeItems = mandjeItems;
    });
  }

  getTotaal() {
    this.winkelMandjeService.getTotaal().subscribe((totaal) => {
      this.totaal = totaal;
    });
  }

  getMunt() {
    this.muntService.getMunt().subscribe((munt) => {
      this.munt = munt;
    });
  }

  muntWisselen() {
    this.muntService.muntWisselen().subscribe((mandjeItems) => {
      this.getMunt();
      this.getTotaal();
      this.mandjeItems = mandjeItems;
    });
  }

  deleteMandjeItem(id: number) {
    this.winkelMandjeService.deleteMandjeItem(id).subscribe((mandjeItems) => {
      this.mandjeItems = mandjeItems;
      this.getMunt();
      this.getTotaal();
    });
  }

  aantalWisselen(id: number, aantal: number) {
    this.winkelMandjeService
      .aantalWisselen(id, aantal)
      .subscribe((mandjeItems) => {
        this.mandjeItems = mandjeItems;
        this.getMunt();
        this.getTotaal();
      });
  }
}
