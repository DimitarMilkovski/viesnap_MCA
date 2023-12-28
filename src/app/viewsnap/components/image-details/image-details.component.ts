import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '../../services/image.service';
import { Image } from '../../models/image';


@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.scss']
})

export class ImageDetailsComponent implements OnInit {

  image:Image;

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private imageService:ImageService
    )
    {
      
    }

    ngOnInit(): void {
      this.route.params.subscribe(params => {
        let id = params['id']
        if(!id) this.router.navigate(['/welcome']);
          this.imageService.findImageById(id).subscribe({
            next:(imageData) =>{
              this.image = imageData[0];
            },
            error: err => console.log(err.message)
          })
      })
    }

    deleteImage():void{
      if(confirm(`Are you sure you want to delete ${this.image.title}`)){
        this.imageService.deleteImage(this.image.id).subscribe({
          next: () => this.router.navigate(['viewsnap','album', this.image.albumId]),
          error: err => console.log(`error: ${err.message}`)
        })
      }
    }
}
