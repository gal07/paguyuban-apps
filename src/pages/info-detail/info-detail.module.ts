import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoDetailPage } from './info-detail';

@NgModule({
  declarations: [
    InfoDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoDetailPage),
  ],
})
export class InfoDetailPageModule {}
