import { Component } from '@angular/core';

export interface Data {
  name: string;
  value: number;
  color: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'consumer-app';

  public width = 300;
  public height = 400;
  public donutHole = 40;
  public data: Data[] = [
    {
      name: 'Project1',
      value: 4,
      color: 'orange'
    },
    {
      name: 'Project2',
      value: 5,
      color: 'blue'
    },
    {
      name: 'Project3',
      value: 4,
      color: 'grey'
    },
    {
      name: 'Project4',
      value: 1,
      color: 'black'
    }
  ];
}
