import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  map!: L.Map;

  constructor() { }

  ngOnInit() {}

  ionViewDidEnter() {
    this.loadMap();
  }

  loadMap() {
    this.map = L.map('mapId').setView([﻿-0.21055556, -78.48888889], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    L.marker([﻿-0.21055556, -78.48888889]).addTo(this.map)
      .bindPopup('Ubicacion')
      .openPopup();
  }
}
