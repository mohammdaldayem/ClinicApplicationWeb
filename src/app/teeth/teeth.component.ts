import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teeth',
  templateUrl: './teeth.component.html',
  styleUrls: ['./teeth.component.css']
})
export class TeethComponent implements OnInit {
  isMovedOver: boolean;
  clicked: boolean;
  element: any;
  imageContainer: any;
  DivToDrowOver: any;
  constructor() { }

  ngOnInit() {
    this.clicked = false;
    this.isMovedOver = false;
  }

  onClick( ID: string) {
    this.element = (document.getElementById(ID) as any);
    this.DivToDrowOver = (document.getElementsByClassName('map-selector') as any);
    const style = document.createElement('style');
    const coords = this.element.coords.split(',');
    this.imageContainer = (document.getElementsByClassName('image-map-container') as any);
    const width =  Number(this.imageContainer[0].offsetWidth) ;
    const height = Number( this.imageContainer[0].offsetHeight ) ;
    const widthCalCulation = width -  Number(coords[2]);
    const heightCalCulation = height - Number(coords[3]);

    style.type = 'text/css';
    // tslint:disable-next-line:max-line-length
    style.innerHTML = '.ClickedClass { left: ' + Number(coords[0]) + 'px !important ; top: ' + Number(coords[1]) + 'px !important;  right:' + Number(widthCalCulation) + 'px !important; bottom:' + Number(heightCalCulation) + 'px !important; background-color:blue;}';
    document.getElementsByTagName('head')[0].appendChild(style);
    const arr1 = this.imageContainer[0].className.split(' ');
    const arr2 = this.DivToDrowOver[0].className.split(' ');
    const name = 'ClickedClass';
    if (Number(arr1.indexOf(name)) === -1  && Number(arr2.indexOf(name)) === -1) {
     // this.imageContainer[0].className += ' ' + name;
      this.DivToDrowOver[0].className += ' ' + name;
      if (this.isMovedOver) {
        this.DivToDrowOver[0].classList.remove('hover');
      }
      this.clicked = true;
  }
  }

  onMouseOver(ID: string) {
     this.element = (document.getElementById(ID) as any);
    this.DivToDrowOver = (document.getElementsByClassName('map-selector') as any);
    const style = document.createElement('style');
    const coords = this.element.coords.split(',');
    this.imageContainer = (document.getElementsByClassName('image-map-container') as any);
    const width =  Number(this.imageContainer[0].offsetWidth) ;
    const height = Number( this.imageContainer[0].offsetHeight ) ;
    const widthCalCulation = width -  Number(coords[2]);
    const heightCalCulation = height - Number(coords[3]);

    style.type = 'text/css';
    // tslint:disable-next-line:max-line-length
    style.innerHTML = '.hover { left: ' + Number(coords[0]) + 'px !important ; top: ' + Number(coords[1]) + 'px !important;  right:' + Number(widthCalCulation) + 'px !important; bottom:' + Number(heightCalCulation) + 'px !important;}';
    document.getElementsByTagName('head')[0].appendChild(style);
    const arr1 = this.imageContainer[0].className.split(' ');
    const arr2 = this.DivToDrowOver[0].className.split(' ');
    const name = 'hover';
    if (Number(arr1.indexOf(name)) === -1  && Number(arr2.indexOf(name)) === -1) {
     // this.imageContainer[0].className += ' ' + name;
      this.DivToDrowOver[0].className += ' ' + name;
      this.isMovedOver = true;
  }
  }
  onMouseleave() {
    if (this.clicked !== true) {
    this.DivToDrowOver = (document.getElementsByClassName('map-selector') as any);
    this.DivToDrowOver[0].classList.remove('hover');
    this.isMovedOver = false;
  }
  }

}
