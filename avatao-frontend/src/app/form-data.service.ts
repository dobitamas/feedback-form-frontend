import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NotifierService } from './notifier.service';


interface Feedback_Button {
  text: string,
  status: boolean,
  score : number
}



@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  constructor(private domSan: DomSanitizer,
    private matIconReg: MatIconRegistry) { }


    registerMatIcons(): void {
      this.matIconReg.addSvgIcon(
        'very-sad',
        this.domSan.bypassSecurityTrustResourceUrl('../assets/FeedbackSmileys/very-sad.svg')
      )
  
      this.matIconReg.addSvgIcon(
        'neutral',
        this.domSan.bypassSecurityTrustResourceUrl('../assets/FeedbackSmileys/neutral.svg')
      )
  
      this.matIconReg.addSvgIcon(
        'happy',
        this.domSan.bypassSecurityTrustResourceUrl('../assets/FeedbackSmileys/happy.svg')
      )
  
      this.matIconReg.addSvgIcon(
        'very-happy',
        this.domSan.bypassSecurityTrustResourceUrl('../assets/FeedbackSmileys/very-happy.svg')
      )
    }

    createMoodButtons(): Feedback_Button[] {
      return [
        {
          text: "very-sad",
          status: false,
          score: 1
        }, {
          text: "neutral",
          status: false,
          score: 2
        }, {
          text: "happy",
          status: false,
          score: 3
        }, {
          text: "very-happy",
          status: false,
          score: 4
        }
      ] as Feedback_Button[];
    }

    createStructureButtons(): Feedback_Button[] {
      return [
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
      ] as Feedback_Button[];
    }

    createConfidenceButtons(): Feedback_Button[] {
      return [
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
      ] as Feedback_Button[];  
    }

    removeSelection(index: number, list: any) {
      for(let i = 0; i < list.length; i++) {
        if(i === index) {
          continue;
        }
  
        list[i].status = false;
      }
  
      return list;
    }


}
