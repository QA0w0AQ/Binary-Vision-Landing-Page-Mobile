import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LottieAnimationViewModule } from 'ng-lottie';
import { NgModule } from '@angular/core';
import { ToastModule } from 'ng2-toastr/ng2-toastr';

import { AppComponent } from './app.component';
import { ArvinComponent } from './arvin/arvin.component';
import { AppRoutingModule } from './app-routing.module';
import { BeteazeComponent } from './beteaze/beteaze.component';
import { MainComponent } from './main/main.component';
import { KoffeeRunComponent } from './koffee-run/koffee-run.component';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [
    AppComponent,
    ArvinComponent,
    BeteazeComponent,
    MainComponent,
    KoffeeRunComponent,
    MenuComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    LottieAnimationViewModule.forRoot(),
    ToastModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
