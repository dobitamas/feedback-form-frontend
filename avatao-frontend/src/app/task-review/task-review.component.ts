import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiClientService } from '../api-client.service';
import { FormDataService } from '../form-data.service';
import { NotifierService } from '../notifier.service';
import { ShowmodalComponent } from '../showmodal/showmodal.component';


// Interface to store button data on the page
interface Feedback_Button {
  text: string,
  status: boolean,
  score : number
}

// Interface to store the input and score of the user
interface Review {
  input: string,
  button: Feedback_Button
}

// Interface to pass data to apiClient
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



  
  

  // Seedting buttons in constuctor and initializing the 2 reviews
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

  // Change the selected button from the options (this is for the first part of the form)
  structureButtonsChange(index:number){
    this.structureButtons[index].status=!this.structureButtons[index].status;
    this.structureButtons = this.formService.removeSelection(index, this.structureButtons);

    this.structureReview.button = this.structureButtons[index];

  }

  // Change the selected button from the options (this is for the second part of the form)
  confidenceButtonsChange(index: number) {
    this.confidenceButtons[index].status=!this.confidenceButtons[index].status;
    this.confidenceButtons = this.formService.removeSelection(index, this.confidenceButtons)

    this.confidenceReview.button = this.confidenceButtons[index];
  }



  onDismiss(): void{
    this.dialogRef.close();
  }


  // First checks if every input field is set, so the form is not invalid. Gives graphical feedback about the form submission
  onSubmit(): void{
    if(this.checkIfEverythingIsSet()) {
      let feedBack: Task_Feedback = this.createFeedback();

      this.apiClient.postNewTaskReview(feedBack).subscribe(
        resp => {
          this.notifierService.showNotification('The form was submitted!', 'Nice!');
          this.dialogRef.close();
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


  // Create Task_Feedback object 
  createFeedback(): Task_Feedback {
    return {
      structureReview: {input: this.structureReview.input, score: this.structureReview.button.score},
      confidenceReview: {input: this.confidenceReview.input, score: this.confidenceReview.button.score}
    } as Task_Feedback;
  }

}
