import { Component, OnInit } from '@angular/core';
import { IRepository } from '../common/repository.interface';
import { ActivatedRoute } from '@angular/router';
import { RepositoryService } from './repository.service';
import { IContribution } from '../common/contribution.interface';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.scss']
})
export class RepositoryComponent implements OnInit {
  repository: IRepository;
  contributers: IContribution[] = [];
  constructor(private route: ActivatedRoute, private repoService: RepositoryService) { }

  ngOnInit() {
    this.repository = this.route.snapshot.data.repository;
    this.loadContributers();
  }

  private loadContributers() {
    this.repoService.getContributersByReponameWithOwner(this.repository.nameWithOwner).subscribe(res => {
      this.contributers = res
    })
  }

}
