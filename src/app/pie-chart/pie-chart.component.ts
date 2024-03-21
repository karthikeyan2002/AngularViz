import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {
  pieChart: any;
  district: any;
  users: any;

  constructor(private data: DataService) {
    this.data.getData().subscribe((res) => {
      this.users = res;
      this.getDistrict(res);
    
    })
  }
  getDistrict(users: any[]) {
     
    let districtCounts: { [key: string]: number } = {};

    for (let user of users) {
      let district = user.district;
      districtCounts[district] = (districtCounts[district] || 0) + 1;
    }
    this.district = districtCounts;
    this.createPieChart();
  }

  createPieChart() {
    if (this.pieChart) {
      this.pieChart.destroy();
    }
    const ctx = document.getElementById('MyChart') as HTMLCanvasElement;
    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: Object.keys(this.district),
        datasets: [
          {
            label: 'Users',
            data: Object.values(this.district),
            backgroundColor: [
              "Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Pink", "Brown", "Gray", "Black",
              "White", "Cyan", "Magenta", "Lavender", "Turquoise", "Maroon", "Teal", "Navy", "Olive", "Indigo"
          ]
          },
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }

}
