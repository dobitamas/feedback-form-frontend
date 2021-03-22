import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NotifierService } from '../notifier.service';
import { ShowmodalComponent } from '../showmodal/showmodal.component';



interface Feedback {
  mood?: string,
  input?: string
}
@Component({
  selector: 'app-platform-review',
  templateUrl: './platform-review.component.html',
  styleUrls: ['./platform-review.component.css']
})
export class PlatformReviewComponent {

  feedback: Feedback = {mood: undefined, input: undefined}

  constructor(private matIconReg: MatIconRegistry,
              private domSan: DomSanitizer,
              private dialogRef: MatDialogRef<ShowmodalComponent>,
              private notifierService: NotifierService) { 
                     this.registerMatIcons();
              }



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

  reviewInputChange(e: any): void {
    this.feedback.input = e.target.value;
  }

  chooseMood(mood: string): void {
    this.feedback.mood = mood;
  }

  checkIfEverythingIsSet(): boolean {
    if(this.feedback.input === undefined || this.feedback.mood === undefined) {
      return false;
    } 

    return true;
  }

  onSubmit(): void{
    if(this.checkIfEverythingIsSet()) {
      this.notifierService.showNotification('The feedback is sent!', 'Nice!');
    } else {
      this.notifierService.showNotification('Please fill out the whole form!', 'Got it!');
    }
  }

  onDismiss(): void {
    this.dialogRef.close();
  }

}
