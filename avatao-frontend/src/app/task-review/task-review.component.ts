import { Component, OnInit } from '@angular/core';

interface Feedback_Button {
  text: string,
  status: boolean,
  score : number
}

interface Feedback_Choice {
  input?: string,
  button?: Feedback_Button
}

@Component({
  selector: 'app-task-review',
  templateUrl: './task-review.component.html',
  styleUrls: ['./task-review.component.css']
})
export class TaskReviewComponent implements OnInit {
  structureButtons?: Feedback_Button[];

  confidenceButtons?: Feedback_Button[];  


  constructor() {
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

}
