import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-beteaze',
  templateUrl: './beteaze.component.html',
  styleUrls: ['./beteaze.component.scss']
})
export class BeteazeComponent implements OnInit {

  delta: number = 5;
  didScroll: boolean;
  email: string;
  isMenuOpened:boolean = false;
  isMessageWritten: boolean = false;
  isNameWritten: boolean = false;
  headerAnim: any;
  headerLottieConfig: Object;
  lastScrollTop: number = 0;
  message: string;
  name: string;
  navbarHeight: number;
  oddsAnim: any;
  oddsLottieConfig: Object;
  rectanglesRows: any[] = [];

  constructor() {
    window.onbeforeunload = () => {
      window.scrollTo(0, 0);
    };
    this.headerLottieConfig = {
      path: 'assets/data.json',
      autoplay: true,
      loop: false
    };
    this.oddsLottieConfig = {
      path: 'assets/odds.json',
      autoplay: false,
      loop: false
    };
    this.generateRectanglesRows();
  }

  createRectangles() {
    const colors = ['#005399', '#75E2FF', '#FB3D3D', '#F5CC43'];
    const arr = [];
    for (let j = 0; j < 6; j++) {
      arr.push({
        color: colors[Math.floor(Math.random() * colors.length)],
        width: Math.floor(Math.random() *  19) + 15,
        marginRight: Math.floor(Math.random() * 69) + 5
      });
    }
    return arr;
  }

  generateRectanglesRows() {
    for (let i = 0; i < 10; i++) {
      this.rectanglesRows.push({
        rectangles: this.createRectangles()
      });
    }
  }

  handleAnimation(anim: any, type: string) {
    if (type === 'header') {
      this.headerAnim = anim;
    } else {
      this.oddsAnim = anim;
    }
  }

  hasScrolled() {
    let st;
    const ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf('chrome') > -1 || ua.indexOf('firefox') > -1) {
      st = document.documentElement.scrollTop;
    } else {
      st = document.body.scrollTop;
    }
    if (Math.abs(this.lastScrollTop - st) <= this.delta) { return; }

    if (st > this.lastScrollTop && st > this.navbarHeight) {
      document.getElementById('logo-nav-box').style.top = '-4vw';
      document.getElementById('menu').className = 'menu-wrapper animated fadeOutRight';
      this.isMenuOpened = false;
    } else {
      if (st < this.lastScrollTop || st < this.navbarHeight) {
        document.getElementById('logo-nav-box').style.top = '4vw';
      }
    }

    this.lastScrollTop = st;
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
      top: document.getElementById('branding-content').offsetTop - (window.innerHeight * 5 / 100) -
      document.getElementById('branding-title-box').offsetHeight - document.documentElement.scrollTop,
      behavior: 'smooth'
    });
  }

  startOnboardingAnimations(count) {
    let i = count;
    document.getElementById('rectangles-wrapper').scrollTo({
      left: i === 6 ? -document.getElementById('onboarding-section').offsetWidth :
        document.getElementById('onboarding-section').offsetWidth / 3 * i,
      behavior: 'smooth'
    });
    document.getElementById('beteaze-screens-wrapper').scrollTo({
      left: i === 6 ? -document.getElementById('beteaze-screens-wrapper').offsetWidth :
        (document.getElementById('beteaze-screens-wrapper').offsetWidth + 1) * i,
      behavior: 'smooth'
    });
    i = i === 6 ? 0 : i + 1;
      setTimeout(() => {
        this.startOnboardingAnimations(i);
      }, 1000);
  }

  ngOnInit() {
    this.navbarHeight = document.getElementById('logo-nav-box').offsetHeight;
    this.startOnboardingAnimations(0);
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
      this.didScroll = true;
      this.hasScrolled();
      this.didScroll = false;
      let top;
      const ua = navigator.userAgent.toLowerCase();
      if (ua.indexOf('chrome') > -1 || ua.indexOf('firefox') > -1) {
        top = document.documentElement.scrollTop;
      } else {
        top = document.body.scrollTop;
      }
      const brandingContent = document.getElementById('branding-content').offsetTop -
        document.getElementById('branding-content').offsetHeight;
      if (top > brandingContent) {
        for (let i = 1; i < 12; i++) {
          setTimeout(() => {
            document.getElementById('branding-image-' + i).style.display = 'block';
            document.getElementById('branding-image-' + i).className = 'animated fadeInUp';
          }, 300 * i);
        }
      }
      const oddsSection = document.getElementById('odds-section').offsetTop - (window.innerHeight * 14 / 100) * 2 -
        (window.innerHeight * 12 / 100);
      if (top > oddsSection) {
        document.getElementById('odds-section-title').style.display = 'block';
        document.getElementById('odds-section-title').className = 'title animated fadeInLeft';
        this.oddsAnim.play();
        document.getElementById('odds-section-title').addEventListener('animationend', () => {
          document.getElementById('odds-section-subtitle').style.display = 'block';
          document.getElementById('odds-section-subtitle').className = 'subtitle animated fadeInLeft';
          document.getElementById('odds-section-info').style.display = 'block';
          document.getElementById('odds-section-info').className = 'animated fadeInLeft';
        });
      }
      const onboardingSection = document.getElementById('onboarding-section').offsetTop;
      const caseStudiesSectionEnd = document.getElementById('case-studies-section').offsetTop +
        document.getElementById('case-studies-section').offsetHeight;
      if (top >= onboardingSection && top <= caseStudiesSectionEnd) {
        document.getElementById('logo-image').setAttribute('src', '../../assets/images/logo_black.png');
      } else {
        document.getElementById('logo-image').setAttribute('src', '../../assets/images/logo@2x.png');
      }
      const pickTeamSection = document.getElementById('pick-team-section').offsetTop -
        document.getElementById('branding-content').offsetHeight;
      if (top > pickTeamSection) {
        document.getElementById('pick-team-title').style.display = 'block';
        document.getElementById('pick-team-title').className = 'title animated fadeInLeft';
        document.getElementById('group-cards-image').style.display = 'block';
        document.getElementById('group-cards-image').className = 'animated fadeInUp';
        document.getElementById('pick-team-title').addEventListener('animationend', () => {
          document.getElementById('pick-team-subtitle').style.display = 'block';
          document.getElementById('pick-team-subtitle').className = 'subtitle animated fadeInLeft';
          document.getElementById('pick-team-info').style.display = 'block';
          document.getElementById('pick-team-info').className = 'animated fadeInLeft';
        });
      }
      const bracketWrapper = document.getElementById('pick-team-section').offsetTop;
      if (top > bracketWrapper) {
        document.getElementById('bracket-image').style.display = 'block';
        document.getElementById('bracket-image').className = 'animated fadeInUp';
      }
      const visitBeteazeSection = document.getElementById('visit-beteaze-section').offsetTop - (window.innerHeight * 14 / 100) * 2;
      if (top > visitBeteazeSection) {
        document.getElementById('bw-beteaze-screens-wrapper').style.display = 'flex';
        document.getElementById('bw-beteaze-screens-wrapper').className = 'bw-beteaze-screens-wrapper animated fadeInUp';
        document.getElementById('bw-beteaze-screens-wrapper').addEventListener('animationend', () => {
          document.getElementById('beteaze-screen').style.display = 'block';
          document.getElementById('beteaze-screen').className = 'animated fadeInUp';
        });
      }
      const arvinSection = document.getElementById('case-studies-section').offsetTop -
        document.getElementById('visit-beteaze-title-box').offsetHeight - (window.innerHeight * 14 / 100) * 2 -
        (window.innerHeight * 12 / 100) * 2;
      if (top > arvinSection) {
        document.getElementById('arvin-image').style.display = 'block';
        document.getElementById('arvin-image').className = 'arvin-wrapper animated slideInUp';
        document.getElementById('milk-arvin').style.display = 'block';
        document.getElementById('milk-arvin').className = 'animated slideInUp';
      }
      const koffeeSection = document.getElementById('case-studies-section').offsetTop + (window.innerHeight * 14 / 100) +
        (window.innerHeight * 12 / 100);
      if (top > koffeeSection) {
        document.getElementById('koffee-image').style.display = 'block';
        document.getElementById('koffee-image').className = 'koffee-wrapper animated slideInUp';
        document.getElementById('koffee-image').addEventListener('animationend', () => {
          document.getElementById('bg-koffee').style.display = 'block';
        });
      }
      document.getElementById('next-wrapper-arvin').onmouseover = () => {
        document.getElementById('milk-arvin').style.top = '1.6vw';
      };
      document.getElementById('next-wrapper-arvin').onmouseout = () => {
        document.getElementById('milk-arvin').style.top = '8vw';
      };
      document.getElementById('next-wrapper-koffee').onmouseover = () => {
        document.getElementById('bg-koffee').style.width = '34vw';
      };
      document.getElementById('next-wrapper-koffee').onmouseout = () => {
        document.getElementById('bg-koffee').style.width = '1vw';
      };
    });
  }

}
