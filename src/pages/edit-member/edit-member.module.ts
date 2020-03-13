import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditMemberPage } from './edit-member';

@NgModule({
  declarations: [
    EditMemberPage,
  ],
  imports: [
    IonicPageModule.forChild(EditMemberPage),
  ],
})
export class EditMemberPageModule {}
