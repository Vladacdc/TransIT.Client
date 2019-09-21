import { Component, ViewChild, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { Post } from 'src/app/modules/shared/models/post';
import { PostService } from 'src/app/modules/shared/services/post.service';
import { EntitiesDataSource } from 'src/app/modules/shared/data-sources/entities-data-sourse';
import { MatFspTableComponent } from 'src/app/modules/shared/components/tables/mat-fsp-table/mat-fsp-table.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  post:Post;
  columnDefinitions: string[] = [
    'name',
  ];
  columnNames: string[] = [
    'Admin.Post.Name',
  ];

  @ViewChild('table') table: MatFspTableComponent;

  dataSource: EntitiesDataSource<Post>;

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.dataSource = new EntitiesDataSource<Post>(this.postService);
  }

  refreshTable() {
    this.table.loadEntitiesPage();
  }
}
