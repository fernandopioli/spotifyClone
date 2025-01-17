import { Component, OnInit } from '@angular/core';
import {LoaderService} from '../../services/loader.service';

@Component({
  selector: 'app-my-loader',
  templateUrl: './my-loader.component.html',
  styleUrls: ['./my-loader.component.scss']
})
export class MyLoaderComponent implements OnInit {

  loading: boolean;

  constructor(private loaderService: LoaderService) {

    this.loaderService.loadingState.subscribe((v: boolean) => {
      this.loading = v;
    });

  }

  ngOnInit(): void {
  }

}
