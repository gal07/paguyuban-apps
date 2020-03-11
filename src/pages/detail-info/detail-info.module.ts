import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailInfoPage } from './detail-info';

@NgModule({
  declarations: [
    DetailInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailInfoPage),
  ],
})
export class DetailInfoPageModule {}
