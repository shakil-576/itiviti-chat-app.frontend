import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivateChatComponent } from './private-chat/private-chat.component';
import { BroadcastChatComponent } from './broadcast-chat/broadcast-chat.component';


const routes: Routes = [
  { path: 'private-chat', component: PrivateChatComponent },
  { path: 'broadcast-chat', component: BroadcastChatComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
