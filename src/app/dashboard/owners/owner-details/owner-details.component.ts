import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Owner} from '../../../model/owner';
import {map} from 'rxjs/operators';
import {ConfirmationDialogComponent} from '../../gui/shared-components/dialogs/confirmation-dialog/confirmation-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {OwnerService} from '../owner.service';

@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.scss']
})
export class OwnerDetailsComponent implements OnInit {

  public owner: Owner;

  private dialogRef: MatDialogRef<ConfirmationDialogComponent>;

  constructor(private dialog: MatDialog, private ownerService: OwnerService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.data
      .pipe(map((data) => data.owner))
      .subscribe((owner: Owner) => this.owner = owner);
  }

  openDeleteOwnerConfirmationDialog() {
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmTitle = 'Usunąć klienta?';
    this.dialogRef.componentInstance.confirmMessage = `Klient ${this.owner.fullName} zostanie trwale usunięty z bazy.`;
    this.dialogRef.componentInstance.confirmColor = 'warn';
    this.dialogRef.componentInstance.confirmButton = 'Usuń';
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteOwner();
      }
      this.dialogRef = null;
    });
  }

  private deleteOwner() {
    this.ownerService.deleteOwner(this.owner.id).subscribe(
      () => this.router.navigate(['/owners']),
      () => console.log('Wystąpił błąd podczas usuwania klienta'));
  }
}
