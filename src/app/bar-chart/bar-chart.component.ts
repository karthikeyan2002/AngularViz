import { Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent {
  barChart: any;
  user: any[] = [];
  months: { [key: string]: number } = {};
  month: any;
  year: any;

  constructor(private data: DataService) {
    this.data.getData().subscribe(
      (res: any) => {
        this.user = res;
        this.countMonths(this.user);
        this.createBarChart(Object.keys(this.months), Object.values(this.months));
      },
      (error: any) => {
        console.error('Error fetching data:', error);

      }
    );
  }

  selectedMonth(event: Event) {
    this.month = (event.target as HTMLSelectElement).value;
    this.updateChart();
  }

  selectedYear(event: Event) {
    this.year = (event.target as HTMLSelectElement).value;
    this.updateChart();
  }

  updateChart() {
    if (this.year && this.month && this.user.length > 0) {
      const filteredDates = this.user.filter((user: { registration_date: string | number | Date }) => {
        const registrationDate = new Date(user.registration_date);
        return registrationDate.getMonth() === this.month - 1 && registrationDate.getFullYear() === Number(this.year);
      }).map((user: { registration_date: any }) => user.registration_date);
      
      const dateCounts = filteredDates.reduce((counts: { [key: string]: number }, date: string) => {
        counts[date] = (counts[date] || 0) + 1;
        return counts;
      }, {});
  
      this.createBarChart(Object.keys(dateCounts),Object.values(dateCounts))
    }
  }

  countMonths(users: any[]) {
    this.months = {};
    users.forEach((user: any) => {
      const registrationDate = new Date(user.registration_date);
      const month = registrationDate.getMonth();
      const monthName = this.getMonthName(month);
      this.months[monthName] = (this.months[monthName] || 0) + 1;
    });
  }

  getMonthName(month: number): string {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months[month];
  }

  createBarChart(labels: string[], data: number[]) {
 
    const ctx = document.getElementById('MyCharts') as HTMLCanvasElement;
    if (this.barChart) {
      this.barChart.destroy(); 
    }
    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Users',
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
