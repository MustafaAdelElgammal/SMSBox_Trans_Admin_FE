import {Directive, ElementRef, HostBinding, HostListener} from "@angular/core";

@Directive({
    selector: '[appShowHideDots]'
})

export class ShowHideDotsDirective {


    constructor(private elementRef: ElementRef) {}

    @HostBinding('class.active') isOpen =false;

    @HostListener('document:click', ['$event', '$event.target'])
    public onClick(event: MouseEvent, targetElement: HTMLElement): void {

        const clickedInside = this.elementRef.nativeElement.contains(targetElement);

        if (!clickedInside) {
            this.elementRef.nativeElement.nextSibling.classList.add('u-dropdown--hidden');
            this.isOpen = false;
        } else {
            if(this.elementRef.nativeElement.nextSibling.classList.contains('u-dropdown--hidden') === true) {
                this.isOpen = true;
                this.elementRef.nativeElement.nextSibling.classList.remove('u-dropdown--hidden');
            } else {
                this.elementRef.nativeElement.nextSibling.classList.add('u-dropdown--hidden');
                this.isOpen = false;
            }
        }
    }
}
