import {
  Directive, OnInit, OnDestroy, Self, Host, EventEmitter, Output, Renderer2, Input,
  ElementRef
} from '@angular/core';
import { Subscription } from 'rxjs';
import { ClrTab } from '@clr/angular';

@Directive({
  selector: '[vscIfTabActive]'
})

/**
 * A directive that detects when an active tab changes and sends notification.
 * Optionally consumer may specify a css class to be applied on the
 * active tab only.
 * <clr-tab vscIfTabActive [activeClass]="'activeTab'">
 */
export class IfTabActive implements OnInit, OnDestroy {

  private subscription: Subscription;

  @Output()
  public vscIfTabActiveChange: EventEmitter<boolean> = new EventEmitter();

  @Input()
  activeClass: string;

  constructor(@Host() @Self() public tab: ClrTab, private elRef: ElementRef,
    private renderer: Renderer2) {
  }

  ngOnInit() {
    this.subscription =
      this.tab.ifActiveService.currentChange.subscribe((newCurrentId: number) => {
        if (this.activeClass) {
          if (this.tab.active) {
            this.renderer.addClass(this.elRef.nativeElement, this.activeClass);
          } else {
            this.renderer.removeClass(this.elRef.nativeElement, this.activeClass);
          }
        }
        this.vscIfTabActiveChange.emit(this.tab.active);
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
