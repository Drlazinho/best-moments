import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,  } from '@angular/router';
import { Moment } from 'src/app/Moment';
import { MessageService } from 'src/app/services/message.service';
import { MomentService } from 'src/app/services/moment.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {
  moment?: Moment;

  baseApiUrl = environment.baseApiUrl;

  constructor(
    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService : MessageService, private router : Router
    ) { }

  ngOnInit(): void {

    //id onde está a url
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.momentService.getMoment(id).subscribe((item) => (this.moment = item.data));
  }

  async removeHandler(id: number) {
    await this.momentService.removeMoment(id).subscribe()

    this.messagesService.add("Momento excluído com sucesso!")

    this.router.navigate(['/'])
  }
}
