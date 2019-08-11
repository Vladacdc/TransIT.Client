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
    // name, route, children[]
    breadcrumbs;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private location: Location
    ) { }

    ngOnInit() {
        const test = {name: 'Test', route: '#test', children: [] };
        this.breadcrumbs = [
            ...this.breadcrumbs,
            test
        ];
    }

    goBack(): void {
        this.location.back();
    }
}
