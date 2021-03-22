import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PlatformReviewComponent } from '../platform-review/platform-review.component';

@Component({
  selector: 'app-showmodal',
  templateUrl: './showmodal.component.html',
  styleUrls: ['./showmodal.component.css']
})
export class ShowmodalComponent {

  constructor(private dialog: MatDialog) { }

  

  onCreateModal(modalType:'PlatformReview' | 'TaskReview') {
    const  dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    //dialogConfig.autoFocus = true;
    dialogConfig.backdropClass = 'backdropBackground';


    if(modalType === "PlatformReview") {
      this.dialog.open(PlatformReviewComponent, dialogConfig);
    }
  }

}
