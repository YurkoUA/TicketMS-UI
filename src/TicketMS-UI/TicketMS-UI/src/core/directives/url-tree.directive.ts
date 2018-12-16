import { Directive, Input, ElementRef, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Directive({
    selector: '[urlTree]'
})
export class UrlTreeDirective implements OnInit {
    @Input() urlTree: string[];

    constructor(private element: ElementRef, private router: Router) {     
    }
    
    ngOnInit(): void {
        let url = this.router.createUrlTree(this.urlTree, {
            queryParamsHandling: 'preserve'
        }).toString();

        this.element.nativeElement.href = url;
    } 
}