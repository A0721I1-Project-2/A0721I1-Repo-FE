import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    // tslint:disable-next-line:only-arrow-functions
    $(function() {
      $('#nav-accordion').dcAccordion({
        eventType: 'click',
        autoClose: true,
        saveState: true,
        disableLink: true,
        speed: 'slow',
        showCount: false,
        autoExpand: true,
        //        cookie: 'dcjq-accordion-1',
        classExpand: 'dcjq-current-parent'
      });
    });

    // @ts-ignore
    // tslint:disable-next-line:no-unused-expression only-arrow-functions
    document.querySelector('#sidebar .sub-menu > a').click(function() {
      const o = ($(this).offset());
      const diff: number = 250 - o.top;
      if (diff > 0) {
        $('#sidebar').scrollTo('-=' + Math.abs(diff), 500);
      } else {
        $('#sidebar').scrollTo('+=' + Math.abs(diff), 500);
      }
    });

    if ($('.custom-bar-chart')) {
      $('.bar').each(function() {
        let i = $(this).find('.value').html();
        $(this).find('.value').html('');
        $(this).find('.value').animate({
          height: i
        }, 2000);
      });
    }

  }
}
