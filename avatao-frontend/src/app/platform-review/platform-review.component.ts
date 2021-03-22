import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
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
              private dialogRef: MatDialogRef<ShowmodalComponent>) { 
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

  onDismiss(): void {
    this.dialogRef.close();
  }

}
