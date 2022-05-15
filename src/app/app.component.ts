import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'deiWells';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  onMenuSection(btnId:string){
    const idx = btnId.indexOf('-');
    const routeId = btnId.substring(0, idx);
    onGlobalMenuSection(btnId);
    this.router.navigate(['/'+routeId]);
  }
}

export function onGlobalMenuSection(btnId:string){

  var orgClass = 'banner-button';
  var el = document.getElementById('diversity-view');
  el.className=orgClass;

  el = document.getElementById('leads-view');
  el.className=orgClass;

  el = document.getElementById('research-view');
  el.className=orgClass;

  el = document.getElementById('goals-view');
  el.className=orgClass;

  el = document.getElementById(btnId);
  el.className = 'banner-button banner-button-selection';
}
