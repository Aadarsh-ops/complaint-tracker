import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket } from 'src/app/models/ticket.model'; 
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private apiUrl = environment.apiUrl;  

  constructor(private http: HttpClient) {}

  createTicket(ticketData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, ticketData).pipe(
      catchError((error) => {
        console.error('Create Ticket Error:', error);
        return throwError(() => new Error('Error creating ticket.'));
      })
    );
  }

  getTickets(searchTerm: string = '', page: number = 1, limit: number = 10): Observable<any> {
  const params = new HttpParams()
    .set('search', searchTerm.trim())
    .set('page', page.toString())
    .set('limit', limit.toString());

  return this.http.get<any>(this.apiUrl, { params });
}


  getTicketById(ticketNo: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${this.apiUrl}/${ticketNo}`);
  }

  updateTicket(ticketNo: string, updateData: { status?: string; assignedUser?: string }): Observable<any> {
    return this.http.put(`${this.apiUrl}/update/${ticketNo}`, updateData);
  }
}
