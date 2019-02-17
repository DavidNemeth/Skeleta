import { Component, OnInit, HostBinding } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { ConfigurationService } from '../../services/configuration.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fadeInOut]
})
export class HomeComponent implements OnInit {
  constructor(public configurations: ConfigurationService) { }

  ngOnInit() {
  }

}
