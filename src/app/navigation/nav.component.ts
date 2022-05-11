import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-search',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavigationComponent implements OnInit {

  images: any;
  @Input('searchEnabled') checked:boolean = false;
  @Output() enabled:EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {

    this.images = this.getImages();
  }


  private getImages() {
    return [

    ];
  }

  checkValue(checked){
    this.checked=checked;
    this.enabled.emit(checked);
  }
}
