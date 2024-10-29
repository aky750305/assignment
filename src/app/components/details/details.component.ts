import { NgIf } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Octokit } from "octokit";
import { AudioRecordingService } from '../../services/audio-recording.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

const octokit = new Octokit({
});

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule],
  providers: [AudioRecordingService],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  isPlaying = false;
  displayControls = true;
  isAudioRecording = false;
  audioRecordedTime: any;
  audioBlobUrl: any;
  audioBlob: any;
  audioName: any;
  audioStream: any;
  audioConf = { audio: true };
  form = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
     private audioRecordingService: AudioRecordingService,
     private ref: ChangeDetectorRef,
     private sanitizer: DomSanitizer
  ) {
    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.isAudioRecording = false;
      this.ref.detectChanges();
    });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.audioRecordedTime = time;
      this.ref.detectChanges();
    });

    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
    
      this.audioBlob = data.blob;
      this.audioName = data.title;
      console.log(data.blob);
      this.audioBlobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
      this.ref.detectChanges();
    });
  }

    startAudioRecording() {
    if (!this.isAudioRecording) {
      this.isAudioRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

  abortAudioRecording() {
    if (this.isAudioRecording) {
      this.isAudioRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopAudioRecording() {
    if (this.isAudioRecording) {
      this.audioRecordingService.stopRecording();
      this.isAudioRecording = false;
    }
  }

  clearAudioRecordedData() {
    this.audioBlobUrl = null;
  }

  downloadAudioRecordedData() {
    console.log(this.audioBlob , this.audioBlobUrl);
    var reader = new FileReader();
reader.readAsDataURL(this.audioBlob); 
reader.onloadend = async function() {
  var base64data: any = reader.result;     
  console.log(base64data.split(",")[0]);
  // var getData = octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
  //   owner: 'aky750305',
  //   repo: 'assignment',
  //   path: 'src/assets/123',
  //   message: 'my commit message',
  //   sha: "4f8a0fd8ab3537b85a64dcffa1487f4196164d78",
  //   content: base64data.split(",")[1]
  // })
  // .then((e: any) => {
  //   console.log(atob(e.data.content));
  // });
}
    // this._downloadFile(this.audioBlob, 'audio/ogg', this.audioName);
  }

  ngOnDestroy(): void {
    this.abortAudioRecording();
  }

  _downloadFile(): any {
        var t = octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: 'aky750305',
      repo: 'assignment',
      path: 'src/assets/123',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    }).then((e: any) => {
      console.log(e);
      const daaat = `data:audio/wav;base64,${e.data.content}`;
      const blob = new Blob([daaat], { type: 'audio/ogg' });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.download = 'efds';
    anchor.href = url;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    });

  }
}
