import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { CanDeactivate } from "@angular/router";
import { map, Observable, of } from "rxjs";
import { ConfirmDialogComponent } from "src/app/shared/confirm-dialog/confirm-dialog.component";
import { TicketDetailsComponent } from "src/app/tickets/components/ticket-details/ticket-details.component";

@Injectable({
  providedIn: 'root',
})
export class UnsavedChangesGuard implements CanDeactivate<TicketDetailsComponent> {
  constructor(private dialog: MatDialog) {}

  canDeactivate(component: TicketDetailsComponent): Observable<boolean> {
    if (!component.isFormDirty()) {
      return of(true);
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: {
        message: 'You have unsaved changes. Do you want to stay or discard your changes?',
      },
    });

    return dialogRef.afterClosed().pipe(map(result => result));
  }
}
