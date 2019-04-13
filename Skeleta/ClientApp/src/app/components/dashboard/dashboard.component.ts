import { Component, OnInit, HostBinding } from '@angular/core';
import { fadeInOutRoute, fadeInOut } from '../../services/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [fadeInOutRoute, fadeInOut]
})
export class DashboardComponent implements OnInit {
  @HostBinding('class.content-container')
  public showContainerClass = true;


  constructor() { }

  ngOnInit() {
  }

}
