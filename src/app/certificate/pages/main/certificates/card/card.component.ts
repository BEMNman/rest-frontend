import { OrderService } from './../../../../../services/order.service';
import { Component, Input, OnInit } from '@angular/core';
import { Certificate } from 'src/app/shared/entity/Certificate';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  animations: [
    trigger('animationTriggerName', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 }))
      ]),
      transition('* => void', [animate('1s', style({ opacity: 0 }))])
    ])
  ]
})
export class CardComponent implements OnInit {

  @Input() certificate: Certificate;
  @Input() isAuthUser: boolean;

  public tagsName: string[] = [];
  public hasFavorite = false;
  private obs = new Subject<boolean>();

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.certificate.tags
      .forEach(tag => this.tagsName.push(tag.name));
    this.obs.subscribe(data => this.hasFavorite = data);
  }

  public addToOrder(certificate: Certificate): void {
    this.orderService.add(certificate);
  }

  public changeIcon(value: boolean): void {
    this.obs.next(!value);
  }
}
