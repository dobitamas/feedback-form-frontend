import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiClientService } from '../api-client.service';
import { FormDataService } from '../form-data.service';
import { NotifierService } from '../notifier.service';
import { ShowmodalComponent } from '../showmodal/showmodal.component';

interface Feedback_Button {
  text: string,
  status: boolean,
  score : number
}

interface Review {
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
export class TaskReviewComponent {
  structureButtons: Feedback_Button[] = [];

  confidenceButtons: Feedback_Button[] = [];  

  structureReview: Review;

  confidenceReview: Review;



  
  


  constructor(private dialogRef: MatDialogRef<ShowmodalComponent>,
              private notifierService: NotifierService,
              private apiClient: ApiClientService,
              private formService: FormDataService) {
                this.seedButtons()
                this.structureReview = {} as Review;
                this.confidenceReview = {input: "", button: this.confidenceButtons[2]} as Review;
   }

  


  seedButtons(): void {
    this.structureButtons = this.formService.createStructureButtons();
    this.confidenceButtons = this.formService.createConfidenceButtons(); 
  }

  structureButtonsChange(index:number){
    this.structureButtons[index].status=!this.structureButtons[index].status;
    this.structureButtons = this.formService.removeSelection(index, this.structureButtons);

    this.structureReview.button = this.structureButtons[index];

  }

  confidenceButtonsChange(index: number) {
    this.confidenceButtons[index].status=!this.confidenceButtons[index].status;
    this.confidenceButtons = this.formService.removeSelection(index, this.confidenceButtons)

    this.confidenceReview.button = this.confidenceButtons[index];
  }



  onDismiss(): void{
    this.dialogRef.close();
  }

  onSubmit(): void{
    if(this.checkIfEverythingIsSet()) {
      let feedBack: Task_Feedback = this.createFeedback();

      this.apiClient.postNewTaskReview(feedBack).subscribe(
        resp => {
          this.notifierService.showNotification('The form was submitted!', 'Nice!');
        },
        error => {
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
