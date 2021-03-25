import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PlatformReviewComponent } from '../platform-review/platform-review.component';
import { TaskReviewComponent } from '../task-review/task-review.component';

@Component({
  selector: 'app-showmodal',
  templateUrl: './showmodal.component.html',
  styleUrls: ['./showmodal.component.css']
})
export class ShowmodalComponent {

  constructor(private dialog: MatDialog) { }



  // Props from parent element: string = PlatformReview | TaskReview 
  @Input()
  formToRender: string = "";
  


  // Creates the modal based on the props the parent component passed as formToRender: string
  createModal() {
    const  dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    //dialogConfig.autoFocus = true;
    dialogConfig.backdropClass = 'backdropBackground';


    if(this.formToRender === "PlatformReview") {

      this.dialog.open(PlatformReviewComponent, dialogConfig);

    } else if(this.formToRender === "TaskReview") {

      this.dialog.open(TaskReviewComponent, dialogConfig);
      
    }
  }

}
