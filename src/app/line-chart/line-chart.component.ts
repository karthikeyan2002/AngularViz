import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { DataService } from '../service/data.service';

interface UserData {
  district: string;
  email: string;
  latitude: number;
  longitude: number;
  name: string;
  registered_time: string;
  registration_date: string;
}

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent {
  lineChart: any;
  user: UserData[] = [];
  months:any;
  month: any;
  year: any;

  constructor(private data: DataService) {
    this.data.getData().subscribe(
      (res: any) => {
        this.user = res;
        this.countHours(this.user);
        this.createlineChart(Object.keys(this.months), Object.values(this.months));
      },
      (error: any) => {
        console.error('Error fetching data:', error);

      }
    );
  }

  countHours(users: UserData[]) {
    this.months = {};
    users.forEach(user => {
      const registeredTimeParts = user.registered_time.split(' ')[0].split(':');
      let registeredHour = parseInt(registeredTimeParts[0]);
      const amPm = user.registered_time.split(' ')[1];
      if (amPm === 'PM' && registeredHour !== 12) {
        registeredHour += 12;
      }
      this.months[registeredHour] = (this.months[registeredHour] || 0) + 1;

    });
 
  
  }

  createlineChart(labels: string[], data: number[]) {
    const ctx = document.getElementById('MyLineChart') as HTMLCanvasElement;
    if (this.lineChart) {
      this.lineChart.destroy();
    }
    this.lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Month',
            data: data,
            backgroundColor: 'blue'
          },
        ]
      },
      options: {
        aspectRatio: 2.5
      }
    });
  }
}
