import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//containers
import { BestelformulierComponent } from './components/bestelformulier/bestelformulier.component';
import { WinkelmandjeComponent } from './components/winkelmandje/winkelmandje.component';

//components
import { WinkelmandjeItemComponent } from './components/winkelmandje-item/winkelmandje-item.component';
import { WinkelmandjeTotaalComponent } from './components/winkelmandje-totaal/winkelmandje-totaal.component';

//services
import { WinkelMandjeService } from './services/winkel-mandje.service';
import { GroenteService } from './services/groente.service';
import { MuntService } from './services/munt.service';
import { WinkelService } from './services/winkel.service';
import { WinkelComponent } from './containers/winkel/winkel.component';

@NgModule({
  declarations: [
    WinkelComponent,
    BestelformulierComponent,
    WinkelmandjeComponent,
    WinkelmandjeItemComponent,
    WinkelmandjeTotaalComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, CommonModule],
  providers: [WinkelService, MuntService, GroenteService, WinkelMandjeService],
  exports: [BestelformulierComponent, WinkelmandjeComponent, WinkelComponent],
})
export class AdminModule {}
