import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/table';

const data = {
  "chart": {
    "caption": "Deaths reported because of insect bites in India",
    "yaxisname": "Number of deaths reported",
    "subcaption": "(As per government records)",
    "plottooltext": "<b>$dataValue</b> people died because of $seriesName in $label",
    "showsum": "0",
    "theme": "fusion"
  },
  "categories": [
    {
      "category": [
        {
          "label": "1994"
        },
        {
          "label": "1995"
        },
        {
          "label": "1996"
        },
        {
          "label": "1997"
        },
        {
          "label": "1998"
        },
        {
          "label": "1999"
        },
        {
          "label": "2000"
        },
        {
          "label": "2001"
        },
        {
          "label": "2002"
        },
        {
          "label": "2003"
        },
        {
          "label": "2004"
        },
        {
          "label": "2005"
        },
        {
          "label": "2006"
        },
        {
          "label": "2007"
        },
        {
          "label": "2008"
        },
        {
          "label": "2009"
        },
        {
          "label": "2010"
        },
        {
          "label": "2011"
        },
        {
          "label": "2012"
        },
        {
          "label": "2013"
        },
        {
          "label": "2014"
        },
        {
          "label": "2015"
        },
        {
          "label": "2016"
        },
        {
          "label": "2017"
        }
      ]
    }
  ],
  "dataset": [
    {
      "seriesname": "Hymenoptera",
      "data": [
        {
          "value": "15622"
        },
        {
          "value": "10612"
        },
        {
          "value": "15820"
        },
        {
          "value": "26723"
        },
        {
          "value": "35415"
        },
        {
          "value": "25555"
        },
        {
          "value": "81803"
        },
        {
          "value": "47950"
        },
        {
          "value": "42396"
        },
        {
          "value": "19435"
        },
        {
          "value": "9780"
        },
        {
          "value": "23243"
        },
        {
          "value": "28619"
        },
        {
          "value": "8477"
        },
        {
          "value": "3503"
        },
        {
          "value": "14278"
        },
        {
          "value": "30522"
        },
        {
          "value": "61518"
        },
        {
          "value": "24819"
        },
        {
          "value": "16437"
        },
        {
          "value": "21171"
        },
        {
          "value": "1690"
        },
        {
          "value": "2418"
        },
        {
          "value": "11253"
        }
      ]
    },
    {
      "seriesname": "Diptera",
      "data": [
        {
          "value": "36220"
        },
        {
          "value": "26120"
        },
        {
          "value": "58200"
        },
        {
          "value": "67203"
        },
        {
          "value": "54015"
        },
        {
          "value": "55505"
        },
        {
          "value": "18003"
        },
        {
          "value": "79050"
        },
        {
          "value": "20396"
        },
        {
          "value": "94035"
        },
        {
          "value": "27080"
        },
        {
          "value": "32043"
        },
        {
          "value": "86019"
        },
        {
          "value": "14707"
        },
        {
          "value": "15003"
        },
        {
          "value": "40278"
        },
        {
          "value": "95022"
        },
        {
          "value": "25018"
        },
        {
          "value": "40819"
        },
        {
          "value": "64037"
        },
        {
          "value": "61071"
        },
        {
          "value": "26090"
        },
        {
          "value": "14018"
        },
        {
          "value": "12053"
        }
      ]
    }
  ]
};

@Component({
  selector: 'app-fusion',
  templateUrl: './fusion.component.html',
  styleUrls: ['./fusion.component.css']
})
export class FusionComponent implements OnInit {

  width = "100%";
  height = "400px";
  type = 'stackedcolumn3dline';
  dataFormat = 'json';
  dataSource = data;
  title: string;

  constructor() {
    this.title = "Angular  FusionCharts Sample";
  }

  ngOnInit() {

  }
}
