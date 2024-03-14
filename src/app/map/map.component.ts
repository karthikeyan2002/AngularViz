import { Component } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.heat';
import { DataService } from '../service/data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

    private map!: L.Map | L.LayerGroup<any>;
   
   
    constructor(private userService: DataService, private http: HttpClient) { }
    dataResponse:any[]=[];
   
    ngOnInit() {
      this.userService.getData().subscribe(
        (response) => {
          this.dataResponse = response;
          this.initMap();
        }
      )
    }
   
    private initMap(): void {
      this.map = L.map('map', {
        center: [36, 0],
        zoom: 3
      });
   
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  
      }).addTo(this.map);
   
   
      const heatData = this.dataResponse.map(record => [record.latitude, record.longitude,1]);
      const heatLayer = (L as any).heatLayer(heatData, {
        radius: 20,
        gradient: { 
          0.1: 'blue',
          0.2: 'cyan',
          0.4: 'lime',
          0.6: 'yellow',
          0.8: 'orange',
          1: 'red'
        }
      }).addTo(this.map);
      
      
    }
   
   
  }