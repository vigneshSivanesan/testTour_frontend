import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat.component';
import { InboxComponent } from './inbox/inbox.component';

const routes: Routes = [
  {
    path:'',
    component: ChatComponent,
    children:[   {
      path:'inbox',
      component: InboxComponent
    }]
 
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
