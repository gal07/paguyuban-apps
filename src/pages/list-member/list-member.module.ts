import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListMemberPage } from './list-member';

@NgModule({
  declarations: [
    ListMemberPage,
  ],
  imports: [
    IonicPageModule.forChild(ListMemberPage),
  ],
})
export class ListMemberPageModule {}
