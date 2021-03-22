import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';



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

  constructor(private matIconReg: MatIconRegistry,
              private domSan: DomSanitizer) { 
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

}
