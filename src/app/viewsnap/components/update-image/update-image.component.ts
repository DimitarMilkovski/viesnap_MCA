import { GenericValidator } from './../../shared/generic-validator';
import { AfterViewInit, Component, ElementRef, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChildren } from '@angular/core';
import { Album } from '../../models/album';
import { Image } from '../../models/image';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '../../services/image.service';
import { Observable, Subscription, debounceTime, fromEvent, merge } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SelectValidator } from '../../shared/select-validator';



@Component({
  selector: 'app-update-image',
  templateUrl: './update-image.component.html',
  styleUrls: ['./update-image.component.scss']
})
export class UpdateImageComponent  implements OnInit, AfterViewInit,OnDestroy{

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

formTitle:string;
sumbitBtnText:string;
imageForm:FormGroup;

errorMessage: string;
displayMessage: {[key:string]:string} ={};
private validationMessages: { [key: string]: { [key: string]: string } };
private genericValidator:GenericValidator;

albums:Album[];
image:Image;

regEx = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';

private routeSub:Subscription;



constructor(
  private formBuilder:FormBuilder,
  private route:ActivatedRoute,
  private router:Router,
  private imageService: ImageService,
  private dialog: MatDialog,
  private snackBar: MatSnackBar
  ){
  this.validationMessages = {
    title: {
      required: 'image title is required.',
      minlength: 'image title must be at least three characters.',
      maxlength: 'image title cannot exceed 100 characters.'
    },
    albumId: {
      required: 'Album is required.',
      
    },
    thumbnailUrl: {
      required: 'Thumbnail Url is required',
      pattern: 'Please enter a valid URL'

    },
    url:{
      required: 'image URL is required',
      pattern: 'Please enter a valid URL'
    }
  }

  this.genericValidator = new GenericValidator(this.validationMessages);
}


ngOnInit(): void {
  this.imageForm = this.formBuilder.group({
    title:['',[Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    albumId: [0,[SelectValidator.selectRequired()]],
    thumbnailUrl: ['',[Validators.required, Validators.pattern(this.regEx)]],
    url:['',[Validators.required, Validators.pattern(this.regEx)]]

  })
  
  this.routeSub = this.route.params.subscribe(
    params =>{
      const id = +params['id'];
      this.getImage(id);
    }
  )

  this.imageService.findAllAlbums().subscribe({
    next: fetchedAlbums => this.albums = fetchedAlbums,
    error: err=> this.errorMessage = err
  })


}


ngAfterViewInit(): void {

    const controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(this.imageForm.valueChanges, ...controlBlurs).pipe(
      debounceTime(500)
    ).subscribe(() => {
      this.displayMessage = this.genericValidator.processMessages(this.imageForm);
    });
}

ngOnDestroy(): void {
  this.routeSub.unsubscribe()
}


getImage(id:number):void{
  this.imageService.findImageById(id)
  .subscribe({
    next:(image:Image[]) => {
      this.displayImage(image[0])
    },
    error: err=> this.errorMessage = err
    
  });
}

displayImage(image:Image):void{
  if(this.imageForm) this.imageForm.reset();

  this.image = image;

  if(this.image.id === 0){
    this.formTitle = 'Add Image'
    this.sumbitBtnText = 'Save'
  }
  else{
    this.formTitle = 'Edit Image'
    this.sumbitBtnText = 'Save Changes'
  }

  this.imageForm.patchValue({
    title: this.image.title,
    albumId: this.image.albumId,
    thumbnailUrl: this.image.thumbnailUrl,
    url: this.image.url
  })



}

saveImage():void{
  if(this.imageForm.valid){
    if(this.imageForm.dirty){
      const img = {...this.image, ...this.imageForm.value}

      if(img.id === 0){
        this.imageService.createImage(img).subscribe({
          next: (responseImg) => {
            this.onSaveComplete(responseImg)
          },
          error: err=> this.errorMessage = err
        })
      }
      else{
        this.imageService.updateImage(img).subscribe({
          next: responseImg => {
            this.onSaveComplete(responseImg);
          },
          error: err=> this.errorMessage = err
        })
      }
    }
  }
}


onSaveComplete(image:Image):void {
  this.imageForm.reset();
  this.router.navigate(['viewsnap','album', image.albumId]);
}


}
