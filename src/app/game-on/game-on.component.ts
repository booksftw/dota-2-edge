import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-on',
  templateUrl: './game-on.component.html',
  styleUrls: ['./game-on.component.css']
})
export class GameOnComponent implements OnInit {
  collapseHeroTable = false;

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    this.collapseHeroTable = !this.collapseHeroTable;
    console.log('btn clicked');
  }
}
