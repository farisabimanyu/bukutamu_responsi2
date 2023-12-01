import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BukutamuPageRoutingModule } from './bukutamu-routing.module';

import { KeuanganPage } from './bukutamu.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        BukutamuPageRoutingModule
    ],
    declarations: [KeuanganPage]
})
export class BukutamuPageModule { }
