//imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//bootstrap
import { AppComponent } from './app.component';

//services
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AdminModule],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
