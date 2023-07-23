import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatRadioModule} from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
// import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';

const MaterialComponents = [CommonModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule
]

@NgModule({
  declarations: [],
  imports: [
    MaterialComponents
  ],
  exports: [
    MaterialComponents
  ]
})
export class MaterialModuleModule { }
