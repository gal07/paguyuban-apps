import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListStudentPage } from './list-student';

@NgModule({
  declarations: [
    ListStudentPage,
  ],
  imports: [
    IonicPageModule.forChild(ListStudentPage),
  ],
})
export class ListStudentPageModule {}
