import {Component, OnInit} from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {

  /* Show navbar */
  isShowNavbar = false;

  constructor() {
  }

  ngOnInit(): void {
    // tslint:disable-next-line:only-arrow-functions
    $(function () {
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

    // tslint:disable-next-line:only-arrow-functions
    const Script = function () {

      //    sidebar dropdown menu auto scrolling
      // @ts-ignore
      // tslint:disable-next-line:no-unused-expression
      document.querySelector('#sidebar .sub-menu > a').click(function () {
        const o = ($(this).offset());
        const diff = 250 - o.top;
        if (diff > 0) {
          $('#sidebar').scrollTo('-=' + Math.abs(diff), 500);
        } else {
          $('#sidebar').scrollTo('+=' + Math.abs(diff), 500);
        }
      });


      //    sidebar toggle
      // @ts-ignore
      // tslint:disable-next-line:no-unused-expression only-arrow-functions
      $(function () {
        function responsiveView() {
          const wSize = $(window).width();
          if (wSize <= 768) {
            $('#container').addClass('sidebar-close');
            $('#sidebar > ul').hide();
          }

          if (wSize > 768) {
            $('#container').removeClass('sidebar-close');
            $('#sidebar > ul').show();
          }
        }

        $(window).on('load', responsiveView);
        $(window).on('resize', responsiveView);
      });

      // tslint:disable-next-line:only-arrow-functions
      $('.fa-bars').click(function () {
        if ($('#sidebar > ul').is(':visible') === true) {
          $('#main-content').css({
            'margin-left': '0px'
          });
          $('#sidebar').css({
            'margin-left': '-210px'
          });
          $('#sidebar > ul').hide();
          $('#container').addClass('sidebar-closed');
        } else {
          $('#main-content').css({
            'margin-left': '210px'
          });
          $('#sidebar > ul').show();
          $('#sidebar').css({
            'margin-left': '0'
          });
          $('#container').removeClass('sidebar-closed');
        }
      });

      // custom scrollbar
      $('#sidebar').niceScroll({
        styler: 'fb',
        cursorcolor: '#4ECDC4',
        cursorwidth: '3',
        cursorborderradius: '10px',
        background: '#404040',
        spacebarenabled: false,
        cursorborder: ''
      });
      // tslint:disable-next-line:max-line-length
      //  $("html").niceScroll({styler:"fb",cursorcolor:"#4ECDC4", cursorwidth: '6', cursorborderradius: '10px', background: '#404040', spacebarenabled:false,  cursorborder: '', zindex: '1000'});

      // widget tools

      // @ts-ignore
      // tslint:disable-next-line:no-unused-expression
      document.querySelector('.panel .tools .fa-chevron-down').click(function () {
        const el = document.querySelector(this).parents('.panel').children('.panel-body');
        if (document.querySelector(this).hasClass('fa-chevron-down')) {
          document.querySelector(this).removeClass('fa-chevron-down').addClass('fa-chevron-up');
          el.slideUp(200);
        } else {
          document.querySelector(this).removeClass('fa-chevron-up').addClass('fa-chevron-down');
          el.slideDown(200);
        }
      });

      // @ts-ignore
      // tslint:disable-next-line:no-unused-expression
      document.querySelector('.panel .tools .fa-times').click(function () {
        document.querySelector(this).parents('.panel').parent().remove();
      });


      //    tool tips

      $('.tooltips').tooltip();

      //    popovers

      $('.popovers').popover();


      // custom bar chart

      if ($('.custom-bar-chart')) {
        $('.bar').each(function () {
          const i = $(this).find('.value').html();
          $(this).find('.value').html('');
          $(this).find('.value').animate({
            height: i
          }, 2000);
        });
      }

    }();

    // tslint:disable-next-line:only-arrow-functions
    // @ts-ignore
    // tslint:disable-next-line:only-arrow-functions
    document.querySelector(document).ready(function ($) {

      // Go to top
      // tslint:disable-next-line:only-arrow-functions
      $('.go-top').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 500);
      });
    });

  }

  showNavbar() {
    this.isShowNavbar = !this.isShowNavbar;
  }
}
