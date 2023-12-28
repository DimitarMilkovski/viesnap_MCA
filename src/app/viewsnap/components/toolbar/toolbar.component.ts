import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Album } from 'src/app/viewsnap/models/album';
import { ImageService } from 'src/app/viewsnap/services/image.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/enviroments/enviroments';
import { HttpErrorResponse } from '@angular/common/http';



const SMALL_WIDTH_BREAKPOINT = 720;


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit{

@ViewChild(MatSidenav) sidenav: MatSidenav;
 
public isSmallScreen: boolean = false;

albums: Album[] = [];

error:HttpErrorResponse;

constructor(
  private breakpointObserver: BreakpointObserver,
  private imageService: ImageService,
  private router: Router,
  private snackBar:MatSnackBar
  ){}

ngOnInit(): void {
  this.breakpointObserver
  .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`])
  .subscribe((state: BreakpointState) => {
    this.isSmallScreen = state.matches;
  });
  
  this.imageService.findAllAlbums()
  .subscribe({
    next: albums => this.albums = albums,
    error: err => this.error = err
  })
  
  

}

onClick():void{
    if(this.error && !this.sidenav.opened){
      this.sidenav.open();
      this.snackBar.open(
        `Error while loading albums : ${this.error.status}: ${this.error.message}!`,'Close',
        environment.snackBarConfig
      )
    }
    else{
      this.sidenav.toggle()
    }
  }

}
