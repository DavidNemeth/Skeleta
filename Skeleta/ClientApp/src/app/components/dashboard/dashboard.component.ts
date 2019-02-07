import { Component, OnInit, HostBinding } from '@angular/core';
import { fadeInOut } from '../../services/animations';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [fadeInOut]
  //host: { '[class.content-container]': 'true' }
})
export class DashboardComponent implements OnInit {
  @HostBinding('class.content-container')
  public showContainerClass = true;

  constructor() { }

  ngOnInit() {
  }
}
