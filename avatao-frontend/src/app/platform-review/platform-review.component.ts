import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiClientService } from '../api-client.service';
import { FormDataService } from '../form-data.service';
import { NotifierService } from '../notifier.service';
import { ShowmodalComponent } from '../showmodal/showmodal.component';



interface Feedback {
  mood: string,
  input: string,
  score: number
}
@Component({
  selector: 'app-platform-review',
  templateUrl: './platform-review.component.html',
  styleUrls: ['./platform-review.component.css']
})
export class PlatformReviewComponent implements OnInit {

  feedback: Feedback = {mood: "", input: "", score: 0}

  constructor(private matIconReg: MatIconRegistry,
              private domSan: DomSanitizer,
              private dialogRef: MatDialogRef<ShowmodalComponent>,
              private notifierService: NotifierService,
              private apiClient: ApiClientService,
              private formService: FormDataService) { 
                this.formService.registerMatIcons();
              }
  
  ngOnInit(): void {
    this.formService.registerMatIcons();
  }

              /*
  registerMatIcons(): void {
    this.matIconReg.addSvgIcon(
      'very-sad',
      this.domSan.bypassSecurityTrustResourceUrl('../../assets/FeedbackSmileys/very-sad.svg')
    )

    this.matIconReg.addSvgIcon(
      'neutral',
      this.domSan.bypassSecurityTrustResourceUrl('../../assets/FeedbackSmileys/neutral.svg')
    )

    this.matIconReg.addSvgIcon(
      'happy',
      this.domSan.bypassSecurityTrustResourceUrl('../../assets/FeedbackSmileys/happy.svg')
    )

    this.matIconReg.addSvgIcon(
      'very-happy',
      this.domSan.bypassSecurityTrustResourceUrl('../../assets/FeedbackSmileys/very-happy.svg')
    )
  }
  */

  reviewInputChange(e: any): void {
    this.feedback.input = e.target.value;
  }

  chooseMood(mood: string, score: number): void {
    this.feedback.mood = mood;
    this.feedback.score = score;
  }

  checkIfEverythingIsSet(): boolean {
    if(this.feedback.input === "" || this.feedback.mood === "" || this.feedback.score === 0) {
      return false;
    } 

    return true;
  }

  onSubmit(): void{
    if(this.checkIfEverythingIsSet()) {
      this.notifierService.showNotification('The feedback is sent!', 'Nice!');
      this.apiClient.postNewPlatformReview(this.feedback).subscribe(
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

  onDismiss(): void {
    this.dialogRef.close();
  }


}
