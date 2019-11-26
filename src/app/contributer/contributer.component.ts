import { Component, OnInit, Input } from '@angular/core';
import { IContribution } from '../common/contribution.interface';


@Component({
  selector: 'app-contributer',
  templateUrl: './contributer.component.html',
  styleUrls: ['./contributer.component.scss']
})
export class ContributerComponent implements OnInit {
  @Input() contributer: IContribution;
  constructor() { }

  ngOnInit() {
  }

}
