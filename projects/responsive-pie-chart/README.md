## Overview

This library generates a responsive pie chart based on the data you provide. When hovered over and clicked on, an context menu which displays data details will show while the corresponding pie segment highlighted. This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.0. 

A visual demo of the pie chart can be found [here](https://stackblitz.com/edit/angular-ivy-ggl4uo?file=src/app/app.component.ts). You are welcomed to play with it.

<br></br>

## Usage
Step 1: Install the library to your project by `npm i responsive-pie-chart`.  
Step 2: Import **ResponsivePieChartModule** to your module.  
Step 3: Use the library in your html file as shown below. The *data* property is mandatary, and the *width* and *height* properties are optional with default values of 100.  
```
<lib-responsive-pie-chart
    [data]="data"
    [width]="width"
    [height]="height"
></lib-responsive-pie-chart>
  ```
<br></br>
## Example of Input Data Structure
```
export interface Data {
  name: string; 
  value: number;
  color: string;
}

data: Data[] = [
    {
      name: 'IT',
      value: 4,
      color: 'orange',
    },
    {
      name: 'DevOp',
      value: 5,
      color: 'blue',
    },
    {
      name: 'UI',
      value: 4,
      color: 'green',
    }
];
```
<br></br>
## Live Demo
[https://stackblitz.com/edit/angular-ivy-ggl4uo?file=src/app/app.component.ts](https://stackblitz.com/edit/angular-ivy-ggl4uo?file=src/app/app.component.ts)
<br></br>
## Dependencies
"@angular/common": "^14.2.0",</br>
"@angular/core": "^14.2.0",</br>
"@types/d3": "^7.4.0",</br>
"d3": "^7.6.1"</br>



