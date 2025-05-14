import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets.component';
import { TicketFormComponent } from './components/ticket-form/ticket-form.component';
import { TicketDetailsComponent } from './components/ticket-details/ticket-details.component';
import { MaterialModule } from '../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TicketService } from './services/ticket.service';
import { HttpClientModule } from '@angular/common/http';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';


@NgModule({
  declarations: [
    TicketsComponent,
    TicketFormComponent,
    TicketListComponent,
    TicketDetailsComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    TicketService
  ],
})
export class TicketsModule { }
