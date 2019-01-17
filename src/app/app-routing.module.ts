import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ArvinComponent } from './arvin/arvin.component';
import { BeteazeComponent } from './beteaze/beteaze.component';
import { MainComponent } from './main/main.component';
import { KoffeeRunComponent } from './koffee-run/koffee-run.component';

@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full'
    },
    { path: 'beteaze', component: BeteazeComponent },
    { path: 'arvin', component: ArvinComponent },
    { path: 'koffee', component: KoffeeRunComponent },
    { path: '**', component: MainComponent }
  ], {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
