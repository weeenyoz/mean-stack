import { NgModule } from "@angular/core";

import { 
   MatInputModule, 
   MatToolbarModule, 
   MatCardModule, 
   MatButtonModule, 
   MatExpansionModule,
   MatFormFieldModule,
   MatProgressSpinnerModule,
   MatGridListModule,
   MatIconModule,
   MatDialogModule
 } from '@angular/material/';

@NgModule({
   exports: [
      MatFormFieldModule,
      MatCardModule,
      MatButtonModule,
      MatInputModule,
      MatToolbarModule,
      MatExpansionModule,
      MatProgressSpinnerModule,
      MatGridListModule,
      MatIconModule,
      MatDialogModule
   ]
})
export class AngularMaterialModule {

}