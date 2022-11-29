import { Component, OnInit, ElementRef, AfterViewInit, Input } from '@angular/core';
import * as d3 from 'd3';
import { PieArcDatum } from 'd3';

export interface Data {
  name: string;
  value: number;
  color: string;
}

@Component({
  selector: 'lib-responsive-pie-chart',
  templateUrl: './responsive-pie-chart.component.html',
  styles: [
  ]
})
export class ResponsivePieChartComponent implements OnInit, AfterViewInit {

  constructor(private eltRef: ElementRef) { }
  @Input() width: number = 100;
  @Input() height: number = 100;
  @Input() data: Data[] = [
    {
      name: 'IT',
      value: 4,
      color: 'red'
    },
    {
      name: 'Sales',
      value: 5,
      color: 'blue'
    }
  ];

  private pieData: Data[] =  [];

  ngOnInit(): void {
    this.convertData(this.data);
  }

  ngAfterViewInit(): void {
    this.buildPie();
  }

  convertData(dataList: Data[]) {//convert to percentage for pie chart
    let sum = 0;

    dataList.forEach((e: Data) => {
      sum += e.value;
    });

    dataList.forEach(e => {
      let newData = {name:e.name, value:e.value/sum, color: e.color};
      this.pieData.push(newData);
    });
  }

  buildPie() {
    let radius = Math.min(this.width, this.height) / 2;

    let g = d3.select('#pieChart')
      .append('g')
      .attr('transform', 'translate(100, 100)');

    // // Generate the pie
    let pie = d3.pie<Data>().value((d: { value: any; }) => d.value);
    let arc = d3.arc<PieArcDatum<Data>>().innerRadius(30).outerRadius(radius);
    let arcOver = d3.arc<PieArcDatum<Data>>().innerRadius(30).outerRadius(radius+5);

    // Generate groups
      let arcs = g.selectAll("arc")
      .data(pie(this.pieData))
      .enter()
      .append("g")
      .attr("class", "arc");

    //Draw arc paths
    arcs.append('path')
    .attr('d', <any>arc)
    .attr("fill", function(d: { data: { color: any; }; }) {
      return d.data.color;
    })
    .attr("stroke", "white")
    .style("stroke-width", "1px")
    .on("click", function(event, d){
      d3.select(this)
       .transition()
       .duration(100)
       .attr("stroke", "grey")
       .style("stroke-width", "2px")
       ;
 
      d3.select('#tooltip')
        .transition().duration(0)
        .style('left', event.offsetX + 'px')
        .style('top', event.offsetY + 'px')
        .style('opacity', 1)
        .text(d.data.name + ": " + d.data.value*100+'%')
        ;
     })
     .on("mouseover", function(event, d){
      d3.select(this)
      .transition()
      .duration(100)
      .attr("d", <any>arcOver)
      .attr("stroke", "grey")
      ;

      d3.select('#tooltip')
        .transition().duration(0)
        .style('left', event.offsetX + 'px')
        .style('top', event.offsetY+10 + 'px')
        .style('opacity', 1)
        .text(d.data.name + ": " + (d.data.value*100).toFixed(2)+'%')
        ;

      d3.select('#indicator')
        .style('opacity', 1)
        .text(d.data.name + ": " + (d.data.value*100).toFixed(2)+'%');
    })
    .on("mouseout", function(event: any, d: any){
      d3.select(this)
      .transition()
      .duration(100)
      .attr("d", <any>arc)
      .attr("stroke", "white")
      ;

      d3.select('#tooltip')
      .style('opacity', 0);

      d3.select('#indicator')
      .style('opacity', 0)
      ;
    });
  }

}


