import { NgModule } from '@angular/core';
import {
  IonApp,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonLabel,
  IonRouterOutlet,
  IonSearchbar,
  IonSpinner,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTextarea,
  IonToolbar,
} from '@ionic/angular';

const ionicComponents = [
  IonApp,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonLabel,
  IonRouterOutlet,
  IonSearchbar,
  IonSpinner,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonTextarea,
  IonToolbar,
];

@NgModule({
  imports: ionicComponents,
  exports: ionicComponents,
})
export class IonicComponentsModule {}