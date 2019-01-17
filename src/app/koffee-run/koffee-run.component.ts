import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-koffee-run',
  templateUrl: './koffee-run.component.html',
  styleUrls: ['./koffee-run.component.scss']
})
export class KoffeeRunComponent implements OnInit {

  dividers: any[] = [];
  email: string;
  isFixedPhoneImage: boolean = false;
  isMenuOpened:boolean = false;
  isMessageWritten: boolean = false;
  isNameWritten: boolean = false;
  message: string;
  name: string;

  constructor() {
    window.onbeforeunload = () => {
      window.scrollTo(0, 0);
    };
    this.dividers.length = 28;
  }

  nextField(value) {
    if (value === 'message') {
      this.isMessageWritten = true;
      document.getElementById('footer-name-box').style.display = 'inline-flex';
      document.getElementById('footer-name-box').className = 'name-box animated fadeIn';
    } else if (value === 'name') {
      this.isNameWritten = true;
      document.getElementById('footer-email-box').style.display = 'inline-flex';
      document.getElementById('footer-email-box').className = 'email-box animated fadeIn';
    }
  }

  openMenu() {
    if (!this.isMenuOpened) {
      document.getElementById('menu').style.display = 'flex';
      document.getElementById('menu').className = 'menu-wrapper animated fadeInRight';
    } else {
      document.getElementById('menu').className = 'menu-wrapper animated fadeOutRight';
    }
    this.isMenuOpened = !this.isMenuOpened;
  }

  replaceSpaces(value) {
    if (value === 'email') {
      this[value] = this[value].replace(/\s/gi, '');
    } else {
      this[value] = this[value].replace(/\s{2,}/gi, '');
    }
  }

  routeTo(page) {
    location.href = location.href.split('/')[0] + '/' + page;
  }

  scrollTo() {
    window.scrollBy({
      top: document.getElementById('header').offsetTop +
      document.getElementById('header').offsetHeight + (window.innerHeight * 10.6 / 100),
      behavior: 'smooth'
    });
  }

  ngOnInit() {
    setTimeout(() => {
      document.getElementById('logo-nav-box').style.display = 'flex';
      document.getElementById('logo-nav-box').className = 'logo-nav-box animated fadeInDown';
    }, 100);
    document.getElementById('menu-btn').onmouseover = () => {
      document.getElementById('menu-btn').setAttribute('src', '../../assets/images/menu-hover.png');
    };
    document.getElementById('menu-btn').onmouseout = () => {
      document.getElementById('menu-btn').setAttribute('src', '../../assets/images/menu.png');
    };
    document.getElementById('logo-nav-box').addEventListener('animationend', () => {
      document.getElementById('header-title').style.display = 'block';
      document.getElementById('header-title').className = 'title animated fadeInLeft';
    });
    document.getElementById('header-title').addEventListener('animationend', () => {
      document.getElementById('header-subtitle').style.display = 'block';
      document.getElementById('header-subtitle').className = 'subtitle animated fadeInLeft';
      document.getElementById('header-info').style.display = 'block';
      document.getElementById('header-info').className = 'animated fadeInLeft';
    });
    window.addEventListener('scroll', () => {
      let top;
      const ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf('chrome') > -1 || ua.indexOf('firefox') > -1) {
        top = document.documentElement.scrollTop;
      } else {
        top = document.body.scrollTop;
      }
      const overviewSection = document.getElementById('header').offsetTop +
        document.getElementById('header').offsetHeight + (window.innerHeight * 10.6 / 100);
      this.isFixedPhoneImage = (top > overviewSection) ? true : false;
      const overviewItem1 = document.getElementById('overview-item-1').offsetTop +
        document.getElementById('overview-item-1').offsetHeight + (window.innerHeight * 14 / 100);
      const overviewItem2 = document.getElementById('overview-item-2').offsetTop +
        document.getElementById('overview-item-2').offsetHeight + (window.innerHeight * 14 / 100);
      const overviewItem3 = document.getElementById('overview-item-3').offsetTop +
        document.getElementById('overview-item-3').offsetHeight + (window.innerHeight * 14 / 100);
      const overviewItem4 =  document.getElementById('overview-item-4').offsetTop + (window.innerHeight * 92.5 / 100);
      if (top > overviewItem4) {
        document.getElementById('phone-image').style.bottom = '2vw';
        this.isFixedPhoneImage = false;
      } else if (top > overviewItem3) {
        document.getElementById('phone-image').setAttribute('src', '../../assets/images/koffee-run/screen%20kff5@2x.png');
      } else if (top > overviewItem2) {
        document.getElementById('phone-image').setAttribute('src', '../../assets/images/koffee-run/screen%20kff4@2x.png');
      } else if (top > overviewItem1) {
        document.getElementById('phone-image').setAttribute('src', '../../assets/images/koffee-run/screen%20kff3@2x.png');
        document.getElementById('phone-image').style.height = '44vw';
      } else {
        document.getElementById('phone-image').setAttribute('src', '../../assets/images/koffee-run/screen%20kff2@2x.png');
        document.getElementById('phone-image').style.bottom = 'inherit';
        document.getElementById('phone-image').style.height = '49vw';
      }
      const beteazeSection = document.getElementById('case-studies-section').offsetTop - (window.innerHeight * 14 / 100) -
        (window.innerHeight * 12 / 100) * 2;
      if (top > beteazeSection) {
        document.getElementById('beteaze-image').style.display = 'block';
        document.getElementById('beteaze-image').className = 'animated slideInUp';
      }
      const arvinSection = document.getElementById('case-studies-section').offsetTop +
        document.getElementById('header').offsetHeight - (window.innerHeight * 14 / 100) * 2 -
        (window.innerHeight * 12 / 100) * 2;
      if (top > arvinSection) {
        document.getElementById('arvin-image').style.display = 'block';
        document.getElementById('arvin-image').className = 'arvin-wrapper animated slideInUp';
        document.getElementById('milk-arvin').style.display = 'block';
        document.getElementById('milk-arvin').className = 'animated slideInUp';
      }
      document.getElementById('next-wrapper-beteaze').onmouseover = () => {
        document.getElementById('bg-beteaze').style.display = 'block';
      };
      document.getElementById('next-wrapper-beteaze').onmouseout = () => {
        document.getElementById('bg-beteaze').style.display = 'none';
      };
      document.getElementById('next-wrapper-arvin').onmouseover = () => {
        document.getElementById('milk-arvin').style.top = '1.6vw';
      };
      document.getElementById('next-wrapper-arvin').onmouseout = () => {
        document.getElementById('milk-arvin').style.top = '8vw';
      };
    });
  }

}
