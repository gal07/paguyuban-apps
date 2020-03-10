import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailMemberPage } from './detail-member';

@NgModule({
  declarations: [
    DetailMemberPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailMemberPage),
  ],
})
export class DetailMemberPageModule {}
