import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Winkel } from '../../models/winkel';
import { Groente } from '../../models/groente';
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
              <option
                *ngFor="let winkel of winkels; let i = index"
                [value]="i"
                [title]="
                  winkel.adres + ', ' + winkel.post + ' ' + winkel.gemeente
                "
              >
                {{ winkel.naam }}
              </option>
            </select>
          </div>

          <span
            class="validatie"
            class="validatie"
            *ngIf="
              bestelForm.get('winkel')?.invalid &&
              bestelForm.get('winkel')?.touched
            "
            >Er moet een winkel geselecteerd zijn</span
          >
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
      :host {
        font-size: 18px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: solid 1px;
        border-radius: 20px;
        width: 700px;
        padding: 30px 0;
        margin: 50px auto;
        background-color: #f4cbc6;
        gap: 20px;
      }

      .bestel {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .bestel-form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
      }

      .bestel-form-select {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
      .bestel-form-selectItem {
        display: flex;
        justify-content: left;
        flex-wrap: nowrap;
        gap: 10px;
        padding-bottom: 15px;
        padding-right: 20px;
      }

      .bestel-form-inputItem {
        display: flex;
        padding-bottom: 35px;
      }
      input {
        width: 40px;
        height: 20px;
      }
      .validatie {
        font-size: 12px;
        position: absolute;
        transform: translateY(120%);
        background-color: #f7ecea;
        padding: 5px;
        border-radius: 5px;
        font-weight: bold;
        color: #c90076;
      }
      button {
        font-size: 25px;
        width: 200px;
        height: 50px;
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
