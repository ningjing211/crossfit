import { Component } from '@angular/core';
import { IonLabel, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular';

@Component({
  selector: 'mobile-tabs',
  imports: [IonTabs, IonTabBar, IonTabButton, IonLabel],
  template: `
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="sessions" href="/sessions">
          <ion-label>課程</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="movements" href="/movements">
          <ion-label>動作</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  `,
})
export class TabsLayout {}
