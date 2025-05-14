import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketsComponent } from './tickets.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { TicketFormComponent } from './components/ticket-form/ticket-form.component';
import { TicketDetailsComponent } from './components/ticket-details/ticket-details.component';
import { UnsavedChangesGuard } from '../core/guards/unsaved-changes.guard';

const routes: Routes = [
  { path: '', component:  TicketListComponent},
  { path: 'list', component: TicketListComponent },
  { path: 'add', component: TicketFormComponent },
  { path: 'ticket/view/:ticketNo', component: TicketDetailsComponent },
  {
    path: 'ticket/:ticketNo',
    component: TicketDetailsComponent,
    canDeactivate: [UnsavedChangesGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketsRoutingModule {}
