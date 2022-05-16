import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-data-view',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  
  analysisData: Object[] = [];
  displayedColumns: String[] = [];
  dataSource;

  constructor() { 
    this.dataSource = new MatTableDataSource<Object>(this.analysisData);
  }

  ngOnInit(): void {
  }

  fileChanged($event): void{
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
      var file: File = inputValue.files[0];
      var myReader: FileReader = new FileReader();
      var fileType = inputValue.parentElement.id;
      var self = this;

      myReader.onloadend = function (e) {
          var data:String = myReader.result.toString();
          var lines:String[] = data.split("\n");

          if(lines.length > 0){
            var header:String = lines[0];
            self.displayedColumns = header.split(",");
          }

          for(var i = 1; i < lines.length;i++){
            var value:String[] = lines[i].split(",");
            var entry:Object = {};
            for(var j = 0; j < value.length;j++){
              entry[''+self.displayedColumns[j]] = value[j];
            }
            self.analysisData.push(entry);
          }
      }

      myReader.readAsText(file);
  }

}
