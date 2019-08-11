import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
    // name, route
    breadcrumbs: Array<any> = [];
    menu: Array<any> = [{name: 'admin', path: './admin', children: [
        {name: 'users', path: './users', children: []}
    ]}];

    constructor(
        private router: Router,
        private location: Location
    ) {}

    ngOnInit() {
        this.listenRouting();
    }

    listenRouting() {
        this.createBreadcrumb();
        this.router.events.subscribe(router => this.createBreadcrumb());
    }

    createBreadcrumb() {
        this.breadcrumbs = [];
        let route = this.location.path().split('?')[0].slice(1).split('/');
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
        // this.location.back();
        this.location.go(this.breadcrumbs[this.breadcrumbs.length - 2].path);
        this.router.navigateByUrl(this.router.url);
    }
}
