import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MsqlServiceService } from '../../service/msql-service.service'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<void>();
  @Input() product: any = [];

  constructor(
    private oneProduct: MsqlServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}
  closeModal(): void {
    this.newItemEvent.emit();
  }
}
