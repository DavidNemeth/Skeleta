import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-smart-dashboard',
  templateUrl: './smart-dashboard.component.html',
  styleUrls: ['./smart-dashboard.component.css']
})
export class SmartDashboardComponent implements OnInit, OnDestroy {
  sub: any;
  title: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route
      .data
      .subscribe(v => this.title = v.title);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
