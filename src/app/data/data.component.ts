import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-data-view',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {
  
  analysisData: Object[] = [];
  displayedColumns: String[] = [];
  dataSource;
  arrayBuffer:any;


  constructor() { 
    this.dataSource = new MatTableDataSource<Object>(this.analysisData);
  }

  ngOnInit(): void {
  }

  fileChanged($event): void{
    this.readXls($event.target);
  }

  readCsv(inputValue: any): void {
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

  readXls(inputValue: any) {        
    var self = this;
    var file: File = inputValue.files[0];
    let fileReader = new FileReader();
      fileReader.onload = (e) => {
          this.arrayBuffer = fileReader.result;
          var data = new Uint8Array(this.arrayBuffer);
          var arr = new Array();
          for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
          var bstr = arr.join("");
          var workbook = XLSX.read(bstr, {type:"binary"});
          var first_sheet_name = workbook.SheetNames[0];
          var worksheet = workbook.Sheets[first_sheet_name];
          var content:any[] = XLSX.utils.sheet_to_json(worksheet,{raw:true});
          console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));

          var keysExtracted = false;

          for (let obj of content) {
            var hydratedData:Object = {}; 
            for (let key in obj) {
                if(!keysExtracted){
                  self.displayedColumns.push(key);
                }
                hydratedData[''+key] = obj[key];
            }
            self.analysisData.push(hydratedData);
            keysExtracted = true;
        }
      }
      fileReader.readAsArrayBuffer(file);
  }

}
