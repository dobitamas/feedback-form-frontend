import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ApiClientService } from '../api-client.service';
import { FormDataService } from '../form-data.service';
import { NotifierService } from '../notifier.service';
import { ShowmodalComponent } from '../showmodal/showmodal.component';



interface Feedback {
  input: string,
  score: number
}

interface Mood_Button {
  text: string, /* Text means SVGICON here */
  status: boolean,
  score : number
}

@Component({
  selector: 'app-platform-review',
  templateUrl: './platform-review.component.html',
  styleUrls: ['./platform-review.component.css']
})
export class PlatformReviewComponent {

  feedback: Feedback = { input: "", score: 0 }

  moodButtons: Mood_Button[] = [];

  constructor(private dialogRef: MatDialogRef<ShowmodalComponent>,
              private notifierService: NotifierService,
              private apiClient: ApiClientService,
              private formService: FormDataService) { 
                this.formService.registerMatIcons();
                this.moodButtons = formService.createMoodButtons();
              }
  

  
  
  moodChange(index: number): void {
    this.moodButtons[index].status=!this.moodButtons[index].status;
    this.moodButtons = this.formService.removeSelection(index, this.moodButtons);

    this.feedback.score = this.moodButtons[index].score;

  }

  checkIfEverythingIsSet(): boolean {
    if(this.feedback.input === "" || this.feedback.score === 0) {
      return false;
    } 

    return true;
  }

  onSubmit(): void{
    if(this.checkIfEverythingIsSet()) {
      this.apiClient.postNewPlatformReview(this.feedback).subscribe(
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

  onDismiss(): void {
    this.dialogRef.close();
  }


}
