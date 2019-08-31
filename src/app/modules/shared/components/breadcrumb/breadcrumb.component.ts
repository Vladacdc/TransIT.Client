import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
    breadcrumbs: Array<any> = [];
    menu: Array<any> = [{name: 'admin', path: './admin', children: [
        {name: 'users', path: './users', children: []}
    ]}];

    constructor(
        private router: Router,
        private location: Location
    ) {}

    ngOnInit() {
        this.createBreadcrumb();
        this.router.events.subscribe(router => this.createBreadcrumb());
    }

    createBreadcrumb() {
        this.breadcrumbs = [];
        const route = this.location.path().split('?')[0].slice(1).split('/');
        route.shift();
        while (route.length !== 0) {
                let tempRoute = '';
                route.forEach(element => {
                    tempRoute += '/' + element;
                });
                this.breadcrumbs = [{name: route[route.length - 1], path: tempRoute }, ...this.breadcrumbs];
                route.pop();
            }
    }

    goBack(): void {
        const url = this.breadcrumbs[this.breadcrumbs.length - 2].path;
        this.router.navigateByUrl(url);
    }
}
