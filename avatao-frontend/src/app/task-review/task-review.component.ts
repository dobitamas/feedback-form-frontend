import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NotifierService } from '../notifier.service';
import { ShowmodalComponent } from '../showmodal/showmodal.component';

interface Feedback_Button {
  text: string,
  status: boolean,
  score : number
}

interface Feedback_Choice {
  input?: string,
  button?: Feedback_Button
}

@Component({
  selector: 'app-task-review',
  templateUrl: './task-review.component.html',
  styleUrls: ['./task-review.component.css']
})
export class TaskReviewComponent implements OnInit {
  structureButtons: Feedback_Button[] = [];

  confidenceButtons: Feedback_Button[] = [];  

  structureReview: Feedback_Choice = {input: "", button: undefined};

  confidenceReview: Feedback_Choice = {input:"", button: this.confidenceButtons[2]}

  constructor(private dialogRef: MatDialogRef<ShowmodalComponent>,
              private notifierService: NotifierService) {
   }

  ngOnInit(): void {
    this.seedButtons();
  }


  seedButtons(): void {
    this.structureButtons = [
      {
        text: "Confusing",
        status: false,
        score: 1
      }, {
        text: "Easy-to-follow",
        status: false,
        score: 2
      }, {
        text: "Logical",
        status: false,
        score: 3
      }
    ];

    this.confidenceButtons = [
      {
        text:"Not at all",
        status: false,
        score: 1
      },
      {
        text: "Not sure",
        status: false,
        score: 2
      },
      {
        text: "Probably okay",
        status: true,
        score: 3
      },
      {
        text: "Full confidence",
        status: false,
        score: 4
      }
    ];

  }

  changeStructureButtons(index:number){
    this.structureButtons[index].status=!this.structureButtons[index].status;
    this.structureButtons = this.removeSelection(index, this.structureButtons);

    this.structureReview.button = this.structureButtons[index];

  }

  changeConfidenceButtons(index: number) {
    this.confidenceButtons[index].status=!this.confidenceButtons[index].status;
    this.confidenceButtons = this.removeSelection(index, this.confidenceButtons);

    this.confidenceReview.button = this.confidenceButtons[index];
  }

  removeSelection(index:number, list:any) {
    for(let i = 0; i < list.length; i++) {
      if(i === index) {
        continue;
      }

      list[i].status = false;
    }

    return list;
  }

  structureInputChange(e: any) {
    this.structureReview.input = e.target.value;
  }

  confidenceInputChange(e: any) {
    this.confidenceReview.input = e.target.value;
  }



  onDismiss(){
    this.dialogRef.close();
  }

  onSubmit() {
    if(this.checkIfEverythingIsSet()) {
      this.notifierService.showNotification('The feedback is sent!', 'Nice!');
    } else {
      this.notifierService.showNotification('Please fill out the whole form!', 'Got it!');
    }
  }

  checkIfEverythingIsSet(): boolean {
    if(this.structureReview.button === undefined || this.structureReview.input === "") {
      return false;
    } else if(this.confidenceReview.button === undefined || this.confidenceReview.input === "") {
      return false;
    }

    return true;
  }

}
