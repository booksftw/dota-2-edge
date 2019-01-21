import {Directive, ElementRef, HostBinding, Input, OnInit, Renderer2} from "@angular/core";
import {GameHeroManagerService} from "./game-hero-manager.service";

@Directive({
  selector: '[heroSelectionActive]'
})

export class HeroSelectionHighlightDirective implements OnInit{
  @HostBinding('style.border') border:string ='none';
  private showHighlight: boolean = false;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private stateManage: GameHeroManagerService
  ) {   }

  ngOnInit() {

    this.stateManage.userPickedSide.subscribe(
      (res) => {

        this.showHighlight = !this.showHighlight;
        this.toggleHighlight();
      });
  }

  toggleHighlight() {
    if (this.showHighlight) {
      this.border = '22px solid yellowGreen';
    } else {
      this.border = 'transparent';
    }
  }
}
