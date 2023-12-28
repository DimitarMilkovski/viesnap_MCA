import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ImageDetailsComponent } from './components/image-details/image-details.component';
import { UpdateImageComponent } from './components/update-image/update-image.component';
import { ImageCardComponent } from './components/image-card/image-card.component';
import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { ViewsnapAppComponent } from './viewsnap-app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ImagesComponent } from './components/images/images.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { ImageService } from './services/image.service';
import { ShowErrorComponent } from './components/show-error/show-error.component';





const routes: Routes = [
  {
    path: '', component: ViewsnapAppComponent,
    children: [
      {path: 'welcome', component: WelcomeComponent},
      {path: 'album/:id', component: ImagesComponent},
      {path: 'details/:id', component: ImageDetailsComponent},
      {path: 'image/:id/edit', component: UpdateImageComponent},
      {path: 'error', component: ShowErrorComponent},
      {path: '**', redirectTo:'welcome'}
    ]
  }
];

@NgModule({
  declarations: [
    ToolbarComponent,
    ImageDetailsComponent,
    UpdateImageComponent,
    ImageCardComponent,
    ViewsnapAppComponent,
    WelcomeComponent,
    ImagesComponent,
    ShowErrorComponent,
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    



  ],
  providers:[
    ImageService
  ]
})
export class ViewsnapModule { }
