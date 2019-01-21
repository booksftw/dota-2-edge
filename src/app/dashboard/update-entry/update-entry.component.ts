import {Component, OnInit} from '@angular/core';
import {GetDataService} from "../../shared/getData.service";


@Component({
  selector: 'app-update-entry',
  templateUrl: './update-entry.component.html',
  styleUrls: ['./update-entry.component.css'],
})
export class UpdateEntryComponent implements OnInit {

  heroes = this.getData.heroCollectionObservable();
  showHeroDashboard = true;


  constructor(
    private getData: GetDataService
  ) { }

  ngOnInit() { }


}
