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
  styleUrls: ['./responsive-pie-chart.component.scss']
})
export class ResponsivePieChartComponent implements OnInit, AfterViewInit {
  @Input() donutHole: number = 0;
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
  private radius = 0;
  private offset = 5;
  private strokeWidth = 1;
  public svgWidth = 0;
  public svgHeight = 0;

  constructor(private eltRef: ElementRef) { }

  ngOnInit(): void {
    this.convertData(this.data);
  }

  ngAfterViewInit(): void {
    this.radius = Math.min(this.width, this.height) / 2;
    this.svgWidth = this.width + this.offset * 2 + this.strokeWidth * 2;
    this.svgHeight = this.height + this.offset * 2 + this.strokeWidth * 2;
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
    const eltRef = this.eltRef;
    let arc = d3.arc<PieArcDatum<Data>>().innerRadius(this.donutHole).outerRadius(this.radius);
    let arcOver = d3.arc<PieArcDatum<Data>>().innerRadius(this.donutHole).outerRadius(this.radius + this.offset);

    let svg = d3.select(this.eltRef.nativeElement)
      .select('#pieChart')
      .attr('viewBox', (0-this.radius-this.offset-this.strokeWidth) + " " +  (0-this.radius-this.offset-this.strokeWidth) + " " + 2 * (this.radius + this.offset + 2 * this.strokeWidth) + " " + 2 * (this.radius + this.offset + 2 * this.strokeWidth));


    let g = svg.append('g');

      // .attr('transform', 'translate(' + this.svgWidth / 2 + ',' + this.svgHeight / 2 + ')')

    // // Generate the pie
    let pie = d3.pie<Data>().value((d: { value: any; }) => d.value);

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
    .style("stroke-width", this.strokeWidth + "px")
    .on("click", function(event, d){
      d3.select(this)
       .transition()
       .duration(100)
       .attr("stroke", "grey")
      //  .style("stroke-width", "2px")
       ;
 
      d3.select(eltRef.nativeElement).select('#tooltip')
        .transition().duration(0)
        .style('left', event.offsetX + 'px')
        .style('top', event.offsetY + 'px')
        .style('opacity', 1)
        .text(d.data.name + ": " + (d.data.value*100).toFixed(2) +'%')
        ;
     })
     .on("mouseover", function(event, d){
      d3.select(this)
      .transition()
      .duration(100)
      .attr("d", <any>arcOver)
      // .attr("stroke", "grey")
      ;

      d3.select(eltRef.nativeElement).select('div#tooltip')
        .transition().duration(0)
        .style('left', event.offsetX + 'px')
        .style('top', event.offsetY+10 + 'px')
        .style('opacity', 1)
        .text(d.data.name + ": " + (d.data.value*100).toFixed(2)+'%')
        ;

      // d3.select(eltRef.nativeElement).select('#indicator')
      //   .style('opacity', 1)
      //   .text(d.data.name + ": " + (d.data.value*100).toFixed(2)+'%');
    })
    .on("mouseout", function(event: any, d: any){
      d3.select(this)
      .transition()
      .duration(100)
      .attr("d", <any>arc)
      // .attr("stroke", "white")
      ;

      d3.select(eltRef.nativeElement).select('div#tooltip')
      .style('opacity', 0);

      // d3.select(eltRef.nativeElement).select('#indicator')
      // .style('opacity', 0)
      // ;
    });
  }

}


