import { AfterViewInit, Component, OnInit} from '@angular/core';
import { ImageService } from '../../services/image.service';
import { Image } from '../../models/image';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit, AfterViewInit {

  images : Image[];
  totalItems:number;
  pageSize: number = 10;
  pageEvent: PageEvent;

  errorMessage:string;


  constructor(
    private imageService:ImageService,
    private route:ActivatedRoute,
    private router: Router
    ){}


  ngAfterViewInit(): void {
    
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id']
      if(!id) this.router.navigate(['/welcome']);

        this.imageService.findAlbumImages(id).subscribe({
          next:(imagesData) =>{
            this.images = imagesData;
            this.totalItems = imagesData.length;
          },
          error: err => this.errorMessage = `${err.status} : ${err.message} `
        })
    })

  }


}
