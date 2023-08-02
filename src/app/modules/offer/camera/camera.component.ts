import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ToastrService } from 'ngx-toastr';
import { WebcamImage } from 'ngx-webcam';
import { ApplyService } from 'src/app/services/apply.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {

  webcamImage: WebcamImage | undefined;
  showCamera: boolean = false
  id:any
  loan_amount!:any;
  // showRetake = false;
  constructor(private router: Router, private applyservice: ApplyService, private toastr: ToastrService, private tokenservice:TokenService, private loadingbar: LoadingBarService) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('id');
    this.loan_amount = localStorage.getItem('loan_amount');

  }

  saveImage(){
    this.loadingbar.start();
    if(!this.webcamImage){
      this.toastr.error("Kindly take a snapshot");
      this.loadingbar.stop();
    }
    // const id = localStorage.getItem('id') as string;
    const img = this.webcamImage?.imageAsDataUrl as string;
    const formData = new FormData();
    formData.append(
      "id" , this.id
    );
    formData.append(
      "passport_base64", img
    )
    // const formData = {
    //   id: id,
    //   passport_file: img
    // }
    this.applyservice.storeCameraCapture(formData).subscribe(
      res => {
        console.log(res,this.loan_amount);
        this.submitApplication();
      },

      err => {
        this.loadingbar.stop();
        console.log(err);
        this.toastr.error("Unable to save passport")
      }
    )


  }

  handleImage(webcamImage: WebcamImage) {
    this.webcamImage = webcamImage;
  }

  showCameraView(){
    this.showCamera = !this.showCamera;
  }

  submitApplication(){
    const data = {
      id: this.id,
      loan_amount: this.loan_amount
    }
    if(!this.webcamImage){
      this.toastr.error("Kindly take a snapshot");
      this.loadingbar.stop();
    }
    return this.applyservice.submitApplication(data).subscribe(
      res => {
        this.toastr.success("Loan Application Successfull");
        this.router.navigateByUrl('offer/completed');
        if(!this.tokenservice.get()){
          localStorage.clear();
        }
        this.loadingbar.stop();

      },

      err => {
        this.loadingbar.stop();
        console.log(err)
        this.toastr.error("Something Went Wrong");
      }
    )
  }

}
