import { Directive, ElementRef, AfterViewInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Directive({
  selector: "[smoothScroll]"
})
export class SmoothScrollDirective implements AfterViewInit {
  constructor(private el: ElementRef, private route: ActivatedRoute) {}

  ngAfterViewInit() {
    this.route.fragment.subscribe((fragment: string) => {
      if (
        fragment &&
        this.el.nativeElement &&
        this.el.nativeElement.id === fragment
      ) {
        /* --- browser check --- */
        this.el.nativeElement.scrollIntoView({ behavior: "smooth" });
        /* --- if no smooth scroll --- */
        // javascript animation
      }
    });
  }

  /* Browser check method */
}
