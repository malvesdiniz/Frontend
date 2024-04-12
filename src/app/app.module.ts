//imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//bootstrap
import { AppComponent } from './app.component';

//services
import { AdminModule } from './admin/admin.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AdminModule],
  bootstrap: [AppComponent],
  exports: [],
  providers: [provideAnimationsAsync()],
})
export class AppModule {}
