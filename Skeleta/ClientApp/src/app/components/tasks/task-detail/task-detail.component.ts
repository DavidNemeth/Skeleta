import { Component, OnInit, Input } from '@angular/core';
import { TaskService } from '../../../services/tasks/taskService';
import { ExpandTask } from '../../../services/tasks/task.model';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css']
})
export class TaskDetailComponent implements OnInit {

  @Input() taskId: number;
  loading: boolean;
  detail: ExpandTask;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.loading = true;
    this.detail = new ExpandTask();
    this.taskService.GetExpanded(this.taskId).subscribe(
      response => {
        Object.assign(this.detail, response);
        this.loading = false;
      }
    );
  }
}
