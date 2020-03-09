import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IndexGuruPage } from './index-guru';

@NgModule({
  declarations: [
    IndexGuruPage,
  ],
  imports: [
    IonicPageModule.forChild(IndexGuruPage),
  ],
})
export class IndexGuruPageModule {}
