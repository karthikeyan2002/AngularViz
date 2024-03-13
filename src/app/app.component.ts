import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';
import { ChoroplethController, GeoFeature, ColorScale, ProjectionScale } from 'chartjs-chart-geo';
import { DataService } from './service/data.service';

Chart.register(ChoroplethController, GeoFeature, ColorScale, ProjectionScale);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  constructor(private data: DataService) { }

  ngOnDestroy() {
  }

}
