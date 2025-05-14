import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TicketService } from '../../services/ticket.service';
import { Ticket } from 'src/app/models/ticket.model';  // Import the Ticket interface
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, AfterViewInit {
  tickets: Ticket[] = [];
  searchTerm: string = '';
  dataSource = new MatTableDataSource<Ticket>(this.tickets); // Initialize with empty tickets

  displayedColumns: string[] = ['date', 'time', 'ticketNo', 'projectName', 'priority', 'status', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private ticketService: TicketService, private router: Router) {}

  ngOnInit(): void {
    this.fetchTickets();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  fetchTickets() {
    this.ticketService.getTickets().subscribe((tickets: Ticket[]) => {
      this.dataSource.data = tickets; 
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  viewTicket(ticket: Ticket) {
    this.router.navigate(['/tickets/ticket/view', ticket.ticketNo]);
  }

  editTicket(ticket: Ticket) {
    this.router.navigate(['/tickets/ticket', ticket.ticketNo]);
  }
}
