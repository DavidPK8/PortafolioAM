import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  items: string[] = [];
  limit = 20;
  offset = 0;

  constructor() {}

  ngOnInit() {
    this.cargoInicial();
  }

  cargoInicial() {
    const initialItems = Array.from({ length: this.limit }, (_, i) => `Item ${i + 1}`);
    this.items.push(...initialItems);
  }

  cargarMas(event: InfiniteScrollCustomEvent) {
    setTimeout(() => {
      const newItems = Array.from({ length: this.limit }, (_, i) => `Item ${this.offset + i + 1}`);
      this.items.push(...newItems);
      this.offset += this.limit;
      event.target.complete();

      if (this.items.length >= 100) { 
        event.target.disabled = true;
      }
    }, 500);
  }
}
