import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NotifierService } from './notifier.service';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  constructor(private domSan: DomSanitizer,
    private matIconReg: MatIconRegistry,
    private notifierService: NotifierService) { }


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




}
