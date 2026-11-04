import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { RouteReuseStrategy } from '@angular/router';

import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { IonicComponentsModule } from './ionic-components.module';

@NgModule({

  declarations: [AppComponent],

  imports: [
    BrowserModule,
    IonicComponentsModule,
    AppRoutingModule,
    FormsModule
  ],

  providers: [
    provideIonicAngular(),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],

  bootstrap: [AppComponent],

})

export class AppModule {}