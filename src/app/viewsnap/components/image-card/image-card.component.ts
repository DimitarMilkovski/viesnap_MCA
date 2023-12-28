import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouteConfigLoadEnd, Router, RouterEvent } from '@angular/router';
import { Image } from 'src/app/viewsnap/models/image';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss']
})
export class ImageCardComponent implements OnInit{

@Input() image: Image;
constructor(private router: Router){}

ngOnInit(): void {
  
}

onClickEvent(imageId:number):void{
  this.router.navigate(['viewsnap','details', imageId]);
}
}
