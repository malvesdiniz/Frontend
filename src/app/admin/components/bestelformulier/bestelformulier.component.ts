import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Winkel } from '../../models/winkel';
import { WinkelService } from '../../services/winkel.service';
import { Groente } from '../../models/groente';
import { GroenteService } from '../../services/groente.service';
import { WinkelMandjeService } from '../../services/winkel-mandje.service';
import { MandjeItem } from '../../models/mandje-item';

@Component({
  selector: 'bestelformulier',
  template: `
    <h1>Bestelformulier</h1>
    <form (ngSubmit)="submit()" class="bestel" [formGroup]="bestelForm">
      <div class="bestel-form">
        <div class="bestel-form-select">
          <div class="bestel-form-selectItem winkel">
            <label for="winkel">Kies winkel: </label>
            <select formControlName="winkel" id="winkel">
              <option *ngFor="let winkel of winkels; let i = index" [value]="i">
                {{ winkel.naam }}
              </option>
            </select>
            <span
              class="validatie"
              class="validatie"
              *ngIf="
                bestelForm.get('winkel')?.invalid &&
                bestelForm.get('winkel')?.touched
              "
              >Er moet een winkel geselecteerd zijn</span
            >
          </div>
          <div class="bestel-form-selectItem groente">
            <label for="groenten">Kies groenten: </label>

            <select formControlName="groenten" id="groenten">
              <option
                *ngFor="let groente of groenten; let i = index"
                [value]="i"
              >
                {{ groente.naam }} ({{ groente.prijs }} / {{ groente.eenheid }})
              </option>
            </select>
            <span
              class="validatie"
              *ngIf="
                bestelForm.get('groenten')?.invalid &&
                bestelForm.get('groenten')?.touched
              "
            >
              Er moet een groente geselecteerd zijn</span
            >
          </div>
        </div>
        <div class="bestel-form-inputItem aantal">
          <label for="aantal">Aantal/gewicht (stuk)</label>
          <input type="number" formControlName="aantal" id="aantal" />
          <span
            class="validatie"
            *ngIf="
              bestelForm.get('aantal')?.invalid &&
              bestelForm.get('aantal')?.touched
            "
          >
            Het nummer moet grotter dan 0 zijn</span
          >
          <span class="validatie" *ngIf="isStukSelectedenDecimal()">
            Decimal enkel bij kg. aub.</span
          >
        </div>
      </div>
      <div>
        <button
          type="submit"
          class="btn btn-primary"
          [disabled]="!bestelForm.valid || isStukSelectedenDecimal()"
        >
          Bestel
        </button>
      </div>
    </form>
  `,
  styles: [
    `
      .bestel {
        display: flex;
        flex-direction: column;
      }

      .bestel-form {
        display: flex;
        flex-direction: row;
      }

      .bestel-form-select {
        display: flex;
        flex-direction: column;
      }
      .bestel-form-selectItem {
        display: flex;
        justify-content: left;
        flex-wrap: nowrap;
        gap: 10px;
        padding-bottom: 10px;
        padding-right: 20px;
      }

      input {
        width: 50px;
      }
      .validatie {
        font-size: 8px;
      }
    `,
  ],
})
export class BestelformulierComponent implements OnInit {
  bestelForm!: FormGroup;
  @Input() winkels!: Winkel[];
  @Input() groenten!: Groente[];
  @Input() munt!: string;
  @Output() mandjeItem = new EventEmitter<MandjeItem>();

  id: number = 1;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.bestelForm = this.formBuilder.group({
      winkel: [null, Validators.required],
      groenten: [null, Validators.required],
      aantal: ['0', Validators.min(1)],
    });
  }

  submit() {
    if (this.bestelForm.valid) {
      let item = new MandjeItem(
        this.id,
        this.winkels[this.bestelForm.value.winkel],
        this.groenten[this.bestelForm.value.groenten],
        this.bestelForm.value.aantal,
        this.groenten[this.bestelForm.value.groenten].prijs,
        this.groenten[this.bestelForm.value.groenten].prijs *
          this.bestelForm.value.aantal
      );
      this.mandjeItem.emit(item);
      this.bestelForm.reset();
    }
  }

  isStukSelectedenDecimal(): boolean {
    const selectedIndex = this.bestelForm.get('groenten')?.value;
    const inputIndex = this.bestelForm.get('aantal')?.value;
    if (
      selectedIndex !== null &&
      selectedIndex !== undefined &&
      (inputIndex * 10) % 10 !== 0
    ) {
      const selectedGroente = this.groenten[selectedIndex];
      return !selectedGroente.eenheid.includes('g');
    }
    return false;
  }
}
