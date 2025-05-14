import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Frequency, Priority, Status, Ticket } from 'src/app/models/ticket.model';
import { TicketService } from '../../services/ticket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs/internal/Observable';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { map, of } from 'rxjs';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.scss']
})
export class TicketFormComponent implements OnInit {
   ticketForm!: FormGroup;
   selectedFile!: File;

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private snackBar: MatSnackBar,
  ) {}


  ngOnInit(): void {
    this.ticketForm = this.fb.group({
      projectName: ['', Validators.required],
      moduleName: ['', Validators.required],
      subModuleName: ['', Validators.required],
      frequency: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['New'],
      assignedUser: [''],
      date: [new Date()],
      issueDescription: ['', Validators.required],
    });
  }

  // Handle file selection
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    console.log(this.ticketForm.value);
    console.log(this.selectedFile);
    if (this.ticketForm.invalid) return;

    const formData = new FormData();
    formData.append('projectName', this.ticketForm.value.projectName);
    formData.append('moduleName', this.ticketForm.value.moduleName);
    formData.append('subModuleName', this.ticketForm.value.subModuleName);
    formData.append('frequency', this.ticketForm.value.frequency);
    formData.append('priority', this.ticketForm.value.priority);
    formData.append('issueDescription', this.ticketForm.value.issueDescription);
    formData.append('document', this.selectedFile);  

  
    this.ticketService.createTicket(formData).subscribe({
      next: (res) => {
        this.snackBar.open(`Ticket Registered: ${res.ticketNo}`, 'Close', { duration: 3000 });
        this.ticketForm.reset();
      },
      error: (err) => {
        this.snackBar.open('Failed to register ticket.', 'Close', { duration: 3000 });
        console.error(err);
      }
    });
  }

}