import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-showmodal',
  templateUrl: './showmodal.component.html',
  styleUrls: ['./showmodal.component.css']
})
export class ShowmodalComponent {

  constructor(private dialog: MatDialog) { }

  

  onCreateModal(messageType:'PlatformReview' | 'TaskReview') {
    
  }

}
