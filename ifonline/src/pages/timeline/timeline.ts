import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { TimelineService } from '../../app/services/timeline.service'; 

@Component({
  selector: 'TimelinePage',
  templateUrl:'timeline.html'
})
export class TimelinePage {

  token:any;
  itens:any;

  constructor
  (
    private timelineService: TimelineService,
    private storage:Storage,
  )   {   }

  ngOnInit() {
    this.storage.get('token')
      .then((token) => {
        this.token = token;
        this.loadTimeline();
      })
      .catch( err => {
        console.log("erro no ngOnInit(): ",err);
      })
  }

  ionViewWillEnter() {
    this.loadTimeline();
  }

  loadTimeline() {
    this.timelineService.loadTimeline(this.token)
      .subscribe(result => {
        this.itens = result;
        console.log("resultado do load: ",result);
      })
  }
}