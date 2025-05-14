import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Ticket, Priority, Frequency, Status } from 'src/app/models/ticket.model';
import { TicketService } from '../../services/ticket.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss'],
})
export class TicketDetailsComponent implements OnInit  {
  ticketForm!: FormGroup;
  ticketId!: string;
  ticketData!: Ticket;

  // Static assigned users
  assignedUsers = ['John Doe', 'Jane Smith', 'Aadarsh Singh', 'Support Bot'];

  statusOptions = Object.values(Status);
  isViewMode = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private ticketService: TicketService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
  this.ticketId = this.route.snapshot.paramMap.get('ticketNo') || '';
  const currentUrl = this.route.snapshot.url.map(segment => segment.path).join('/');
  this.isViewMode = currentUrl.includes('view');
  this.loadTicket(this.isViewMode);
}

  loadTicket(isViewMode: boolean = false) {
  this.ticketService.getTicketById(this.ticketId).subscribe((ticket: Ticket) => {
    this.ticketData = ticket;
    this.initForm(ticket, isViewMode);
  });
}

initForm(ticket: Ticket, readonly: boolean = false) {
  this.ticketForm = this.fb.group({
    assignedUser: [{ value: ticket.assignedUser || '', disabled: readonly }, Validators.required],
    status: [{ value: ticket.status, disabled: readonly }, Validators.required],
  });

  if (readonly) {
    this.ticketForm.disable();
  }
}

  onSubmit() {
    if (this.ticketForm.valid) {
      const updatedData: Partial<Ticket> = {
        ...this.ticketForm.value,
        updatedAt: new Date(),
      };
      this.ticketService.updateTicket(this.ticketId, updatedData).subscribe(() => {
        this._snackBar.open('Ticket updated successfully!', 'Close', {
          duration: 2000,
        });
        this.loadTicket(); 
      }, (error) => {
        console.error('Error updating ticket:', error);
        this._snackBar.open('Failed to update ticket', 'Close', {
          duration: 2000,
        });
      });
    }
  }

  canDeactivate(): boolean {
  return !this.ticketForm.dirty;
}

isFormDirty(): boolean {
  return this.ticketForm.dirty;
}
}
