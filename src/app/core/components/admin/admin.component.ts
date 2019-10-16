import {Component, ElementRef, OnInit, ViewChild, Renderer2, NgZone} from '@angular/core';
import { Title } from "@angular/platform-browser";
import {AuthenticationService} from "shared/services/auth.service";
import {GeneralService} from "shared/services/general.service";
import {ICountry} from "shared/models/ICountry";
import {INetworkAll} from "shared/models/INetworkAll";
import { filter, map } from 'rxjs/operators';
import {ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from "@angular/router";
@Component({
    selector: 'app-root',
    styleUrls: ['./admin.component.css'],
    templateUrl: './admin.component.html'
})
export class AdminComponent implements OnInit {

    @ViewChild('spinnerElement')
    spinnerElement: ElementRef;

    loadDataCountries = false;
    loadDataNetworks = false;
    loadDataNetworksTypes = false;

    constructor(private auth:AuthenticationService,
                private generalService: GeneralService,
                private router: Router,
                private ngZone: NgZone,
                private renderer: Renderer2,
                private titleService: Title,
                private activatedRoute: ActivatedRoute
    ) {
        router.events.subscribe((event: RouterEvent) => {
            this._navigationInterceptor(event);
        });
    }
    public ngOnInit() {
        this._showSpinner();
        this.generalService.getCountries().subscribe(
            (res: ICountry[]) => {
                this.generalService.updatedCountriesData(res);
                this.loadDataCountries = true;
            }
        );
        this.generalService.getAllNetworks().subscribe(
            (res: INetworkAll[]) => {
                this.generalService.updatedNetworksData(res);
                this.loadDataNetworks = true;
            }
        );
        this.generalService.getAllMessageTypes().subscribe(
            res => {
                this.generalService.updatedMessageTypeData(res);
                this.loadDataNetworksTypes = true;
            }
        );
        this.router.events.pipe(map(() => {
            let child = this.activatedRoute.firstChild;
            while (child) {
                if (child.firstChild) {
                    child = child.firstChild;
                } else if (child.snapshot.data && child.snapshot.data['title']) {
                    return child.snapshot.data['title'];
                } else {
                    return null;
                }
            }
            return null;
        })).subscribe(title => {
            this.titleService.setTitle(title);
        });
    }

    private _navigationInterceptor(event: RouterEvent): void {
        if (event instanceof NavigationStart) {
            this._showSpinner();
        }
        if (event instanceof NavigationEnd) {
            setTimeout(() => {
                this._hideSpinner();
            },2000);
        }
        if (event instanceof NavigationCancel) {
            this._hideSpinner();
        }
        if (event instanceof NavigationError) {
            this._hideSpinner();
        }
    }

    private _hideSpinner(): void {
        this.ngZone.runOutsideAngular(() => {
            this.renderer.setStyle(this.spinnerElement.nativeElement, 'opacity', '0');
            this.renderer.setStyle(this.spinnerElement.nativeElement, 'visibility', 'hidden');
        });
    }

    private _showSpinner(): void {
        this.ngZone.runOutsideAngular(() => {
            this.renderer.setStyle(
                this.spinnerElement.nativeElement,
                  'opacity',
                  '1'
            );
            this.renderer.setStyle(
              this.spinnerElement.nativeElement,
              'visibility',
              'visible'
            );
        });
    }

}
