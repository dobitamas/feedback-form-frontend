import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiClientService } from '../api-client.service';
import { NotifierService } from '../notifier.service';
import { ShowmodalComponent } from '../showmodal/showmodal.component';

interface Feedback_Button {
  text: string,
  status: boolean,
  score : number
}

interface Feedback_Choice {
  input: string,
  button: Feedback_Button
}

interface Task_Feedback {
  structureReview: {input: string, score: number},
  confidenceReview: {input: string, score: number}
}

@Component({
  selector: 'app-task-review',
  templateUrl: './task-review.component.html',
  styleUrls: ['./task-review.component.css']
})
export class TaskReviewComponent implements OnInit {
  structureButtons: Feedback_Button[] = [];

  confidenceButtons: Feedback_Button[] = [];  

  structureReview: Feedback_Choice = {input: "", button: this.structureButtons[1]};

  confidenceReview: Feedback_Choice = {input:"", button: this.confidenceButtons[2]}

  
  


  constructor(private dialogRef: MatDialogRef<ShowmodalComponent>,
              private notifierService: NotifierService,
              private apiClient: ApiClientService) {
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



  onDismiss(): void{
    this.dialogRef.close();
  }

  onSubmit(): void{
    if(this.checkIfEverythingIsSet()) {
      let feedBack: Task_Feedback = this.createFeedback();

      this.notifierService.showNotification('The feedback is sent!', 'Nice!');
      this.apiClient.postNewTaskReview(feedBack).subscribe(
        resp => {
          console.log("RESP: ",  resp)
          this.notifierService.showNotification('The form was submitted!', 'Nice!');
        },
        error => {
          console.log("ERR: ", error)
          this.notifierService.showNotification('The form could not be sent :(', 'Ohh.')
        }
      )

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

  createFeedback(): Task_Feedback {
    return {
      structureReview: {input: this.structureReview.input, score: this.structureReview.button.score},
      confidenceReview: {input: this.confidenceReview.input, score: this.confidenceReview.button.score}
    }
  }

}
