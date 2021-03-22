import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showmodal',
  templateUrl: './showmodal.component.html',
  styleUrls: ['./showmodal.component.css']
})
export class ShowmodalComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onCreateModal(messageType:'PlatformReview' | 'TaskReview') {
    
  }

}
