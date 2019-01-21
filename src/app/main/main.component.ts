import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Spinner} from 'spin.js';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import * as $ from 'jquery';

declare var emailjs;

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    delta: number = 5;
    didScroll: boolean;
    email: string = '';
    isLoading: boolean = false;
    isMenuOpened: boolean = false;
    isMessageWritten: boolean = false;
    isNameWritten: boolean = false;
    lastScrollTop: number = 0;
    message: string = '';
    name: string = '';
    navbarHeight: number;
    hovers = {
        isBranding: false,
        isProduct: false,
        isDesign: false,
        isUi: false,
        isApps: false,
        isSocial: false,
        isUx: false,
        isWeb: false,
        isDevelopment: false
    };

    constructor(private _vcr: ViewContainerRef,
                private toastr: ToastsManager) {
        this.toastr.setRootViewContainerRef(_vcr);
    }

    // $(document).ready(function() {
    //     if (window.matchMedia("(min-width: 1250px)").matches) {
    //         $('#wrapLine').each(function () {
    //             $(this).splitLines({tag:'<span>'});
    //         });
    //     }

    // span(){
    //     document.getElementById('wrapLine')
    // }
    arrowprev(){
            document.getElementById('clients-list').style.marginLeft = '12vw';
    }
    arrownext(){
            document.getElementById('clients-list').style.marginLeft = '-67vw';
    }
    
    clearForm() {
        this.isMessageWritten = false;
        this.isNameWritten = false;
        this.message = '';
        this.name = '';
        this.email = '';
        this.isLoading = false;
    }

    hasScrolled() {
        let st;
        const ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf('chrome') > -1 || ua.indexOf('firefox') > -1) {
            st = document.documentElement.scrollTop;
        } else {
            st = document.body.scrollTop;
        }
        if (Math.abs(this.lastScrollTop - st) <= this.delta) {
            return;
        }

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
        } else if (value === 'name') {
            this.isNameWritten = true;
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
        location.href = location.href.split('/')[0] + '/#/' + page;
    }

    scrollTo(type) {
        window.scrollBy({
            // top: type === 'header' ? document.getElementById('members-list').offsetTop - document.documentElement.scrollTop :
            //     document.getElementById('case-studies-section').offsetTop - document.documentElement.scrollTop,
            top: type === 'header' ? 700-document.documentElement.scrollTop :
                document.getElementById('case-studies-section').offsetTop - document.documentElement.scrollTop,
            behavior: 'smooth'
        });
    }

    sendForm() {
        this.isLoading = true;
        const spinner = new Spinner({color: '#fff', lines: 12});
        const target = document.getElementById('loader');
        spinner.spin(target);

        const templateParams = {
            name: this.name,
            email: this.email,
            message: this.message
        };

        emailjs.send('hello_binary_vision', 'template_HsKrfsH2', templateParams)
            .then((response) => {
                console.log('SUCCESS!', response.status, response.text);
                this.clearForm();
                this.toastr.success('Email has been sent!');
                spinner.spin(target).stop();
            })
            .catch((error) => {
                console.log('FAILED...', error);
                this.clearForm();
                this.toastr.error(`Email hasn't been sent!`);
                spinner.spin(target).stop();
            });

        this.clearForm();
    }

    ngOnInit() {
        this.navbarHeight = document.getElementById('logo-nav-box').offsetHeight;
        setTimeout(() => {
            document.getElementById('logo-nav-box').style.display = 'flex';
            document.getElementById('logo-nav-box').className = 'logo-nav-box animated fadeInDown';
        }, 100);
        document.getElementById('menu-btn').onmouseover = () => {
            document.getElementById('menu-btn').setAttribute('src', 'assets/images/menu-hover.png');
        };
        document.getElementById('menu-btn').onmouseout = () => {
            document.getElementById('menu-btn').setAttribute('src', 'assets/images/menu.png');
        };
        document.getElementById('logo-nav-box').addEventListener('animationend', () => {
            document.getElementById('header-title').style.display = 'block';
            document.getElementById('header-title').className = 'title animated fadeIn';

            document.getElementById('header-subtitle').style.display = 'block';
            document.getElementById('header-subtitle').className = 'subtitle animated fadeIn';

            document.getElementById('header-subtitle-text').style.display = 'block';
            document.getElementById('header-subtitle-text').className = 'header-subtitle-text animated fadeIn';
        });

        document.getElementById('header-subtitle-text').addEventListener('animationend', () => {
            document.getElementById('main-header-top').style.display = 'block';
            document.getElementById('main-header-top').className = 'main-header-top animated fadeInDown fast';
        });

        document.getElementById('main-header-top').addEventListener('animationend', () => {
            document.getElementById('main-header-right').style.display = 'block';
            document.getElementById('main-header-right').className = 'main-header-right animated fadeInRight fast';
        });

        document.getElementById('main-header-right').addEventListener('animationend', () => {
            document.getElementById('main-header-left').style.display = 'block';
            document.getElementById('main-header-left').className = 'main-header-left animated fadeInLeft fast';
        });

        document.getElementById('background-introduce').addEventListener('animationend', () => {
            document.getElementById('wrapLine').style.display = 'block';
            document.getElementById('wrapLine').className = 'content content-introduce animated animatedFadeInUp fadeInUp';
        });
        document.getElementById('wrapLine').addEventListener('animationend', () => {
            document.getElementById('content content-introduce connectwithUs').style.display = 'block';
            document.getElementById('content content-introduce connectwithUs').className = 'content content-introduce connectwithUs animated fadeInRight';
        });

    //     var lFollowX = 0,
    //     lFollowY = 0,
    //     x = 0,
    //     y = 0,
    //     friction = 1 / 20;
    
    // function moveBackground() {
    //   x += (lFollowX - x) * friction;
    //   y += (lFollowY - y) * friction;
    
    //   var translate = 'translate(' + x + 'vw, ' + y + 'px) scale(1.1)';
    
    //   $('#clients-list').css({
    //     '-webit-transform': translate,
    //     '-moz-transform': translate,
    //     'transform': translate
    //   });
    
    //   window.requestAnimationFrame(moveBackground);
    // }
    
    // $(window).on('mousemove click', function(e) {
    
    //   var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
    //   var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
    //   lFollowX = (50 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
    //   lFollowY = (15 * lMouseY) / 100;
    
    // });
    
    // moveBackground();


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
            // const teamInfo = document.getElementById('team-info-wrapper').offsetTop -
            //     document.getElementById('header').offsetHeight + (window.innerHeight * 5 / 100);
            // if (top > teamInfo && document.getElementById('team-info').className !== 'team-info animated fadeIn') {
            //     document.getElementById('team-info').style.display = 'flex';
            //     document.getElementById('team-info').className = 'animated fadeIn';
            // }
            const membersList = document.getElementById('members-list').offsetTop -
                document.getElementById('header').offsetHeight + (window.innerHeight * 14 / 100);
            if (top > membersList) {
                for (let i = 1; i < 9; i++) {
                    setTimeout(() => {
                        document.getElementById('member-' + i).style.display = 'block';
                        document.getElementById('member-' + i).className = 'animated fadeInRight';
                    }, 300 * i);
                    if (document.getElementById('member-' + i + '-info').style.display !== 'flex') {
                        document.getElementById('member-' + i + '-info').style.display = 'flex';
                        document.getElementById('member-' + i + '-info').style.zIndex = '-1';
                    }
                    document.getElementById('member-' + i + '-info-wrapper').onmouseover = () => {
                        document.getElementById('member-' + i + '-info').style.display = 'flex';
                        document.getElementById('member-' + i + '-info').className = 'member-info animated fadeIn';
                        document.getElementById('member-' + i + '-info').style.zIndex = 'initial';
                    };
                    document.getElementById('member-' + i + '-info-wrapper').onmouseout = () => {
                        document.getElementById('member-' + i + '-info').className = 'member-info animated fadeOut';
                    };
                }
            }


            const clientsList = document.getElementById('clients-list').offsetTop -
            document.getElementById('header').offsetHeight + (window.innerHeight * 14 / 100);
        if (top > clientsList) {
            for (let i = 1; i < 15; i++) {
                setTimeout(() => {
                    document.getElementById('client-' + i).style.display = 'block';
                    document.getElementById('client-' + i).className = 'animated fadeInRight';
                }, 300 * i);
                // if (document.getElementById('client-' + i + '-info').style.display !== 'flex') {
                //     document.getElementById('client-' + i + '-info').style.display = 'flex';
                //     document.getElementById('client-' + i + '-info').style.zIndex = '-1';
                // }
                // document.getElementById('client-' + i + '-info-wrapper').onmouseover = () => {
                //     document.getElementById('client-' + i + '-info').style.display = 'flex';
                //     document.getElementById('client-' + i + '-info').className = 'client-info animated fadeIn';
                //     document.getElementById('client-' + i + '-info').style.zIndex = 'initial';
                // };
                // document.getElementById('client-' + i + '-info-wrapper').onmouseout = () => {
                //     document.getElementById('client-' + i + '-info').className = 'client-info animated fadeOut';
                // };
            }
        }
            // const skillsSection = document.getElementById('skills-section').offsetTop - document.getElementById('members-list').offsetHeight;
            const skillsSection = document.getElementById('skills-section').offsetTop - (window.innerHeight * 14 / 100) * 2;
            if (top > skillsSection) {
                document.getElementById('skills-section-title').style.display = 'block';
                document.getElementById('skills-section-title').className = 'title animated fadeInLeft';
                document.getElementById('skills-section-title').addEventListener('animationend', () => {
                    document.getElementById('skills-section-subtitle').style.display = 'block';
                    document.getElementById('skills-section-subtitle').className = 'subtitle animated fadeInLeft';
                });
                if (document.getElementsByClassName('skills-letter').length === 49) {
                    const letters = Array.from(document.getElementsByClassName('skills-letter'));
                    for (let i = 0; i < 49; i++) {
                        if (letters.length !== 0) {
                            setTimeout(() => {
                                const index = Math.floor(Math.random() * letters.length);
                                letters[index].id = 'skills-letter-' + i;
                                document.getElementById('skills-letter-' + i).style.display = 'inline-flex';
                                document.getElementById('skills-letter-' + i).className = 'animated pulse';
                                letters.splice(index, 1);
                            }, 100 * i);
                        }
                    }
                }
            }
            const caseStudiesSection = document.getElementById('case-studies-section').offsetTop;
            const caseStudiesSectionEnd = document.getElementById('case-studies-section').offsetTop +
                document.getElementById('case-studies-section').offsetHeight;
            if (top >= caseStudiesSection && top <= caseStudiesSectionEnd) {
                document.getElementById('logo-image').setAttribute('src', 'assets/images/Group 4 Copy.png');
            } else {
                document.getElementById('logo-image').setAttribute('src', 'assets/images/Group 4 Copy.png');
            }
            if (top > caseStudiesSection) {
                document.getElementById('out-of-thought-section').style.display = 'none';
                document.getElementById('footer').style.display = 'flex';
            } else {
                document.getElementById('out-of-thought-section').style.display = 'flex';
                document.getElementById('footer').style.display = 'none';
            }

            if(top>=194){
                document.getElementById('background-introduce').style.opacity="1";
                document.getElementById('background-introduce').className='background background-introduce animated fadeInRight'; 
            }
            if(top>=1128){
                document.getElementById('background-project').style.opacity="1";
                document.getElementById('background-project').className='background background-project animated fadeInRight'; 
            }
            if(top>=2560){
                document.getElementById('background-capabilities').style.opacity="1";
                document.getElementById('background-capabilities').className='background background-capabilities animated fadeInRight'; 
            }
            if(top>=4505){
                document.getElementById('background-client').style.opacity="1";
                document.getElementById('background-client').className='background background-client animated fadeInRight'; 
            }
            // const beteazeSection = document.getElementById('case-studies-section').offsetTop - (window.innerHeight * 14 / 100) -
            //     (window.innerHeight * 12 / 100) * 2;
            // if (top > beteazeSection) {
            //     document.getElementById('beteaze-image').style.display = 'block';
            //     document.getElementById('beteaze-image').className = 'animated slideInUp';
            // }
            // const arvinSection = document.getElementById('case-studies-section').offsetTop +
            //     document.getElementById('header').offsetHeight - (window.innerHeight * 14 / 100) * 2 -
            //     (window.innerHeight * 12 / 100) * 2;
            // if (top > arvinSection) {
            //     document.getElementById('arvin-image').style.display = 'block';
            //     document.getElementById('arvin-image').className = 'arvin-wrapper animated slideInUp';
            //     document.getElementById('milk-arvin').style.display = 'block';
            //     document.getElementById('milk-arvin').className = 'animated slideInUp';
            // }
            // const koffeeSection = document.getElementById('case-studies-section').offsetTop +
            //     document.getElementById('header').offsetHeight + (window.innerHeight * 14 / 100) - (window.innerHeight * 12 / 100);
            // if (top > koffeeSection) {
            //     document.getElementById('koffee-image').style.display = 'block';
            //     document.getElementById('koffee-image').className = 'koffee-wrapper animated slideInUp';
            //     document.getElementById('koffee-image').addEventListener('animationend', () => {
            //         document.getElementById('bg-koffee').style.display = 'block';
            //     });
            // }
            // document.getElementById('next-wrapper-beteaze').onmouseover = () => {
            //     document.getElementById('bg-beteaze').style.display = 'block';
            // };
            // document.getElementById('next-wrapper-beteaze').onmouseout = () => {
            //     document.getElementById('bg-beteaze').style.display = 'none';
            // };
            // document.getElementById('next-wrapper-arvin').onmouseover = () => {
            //     document.getElementById('milk-arvin').style.top = '1.6vw';
            // };
            // document.getElementById('next-wrapper-arvin').onmouseout = () => {
            //     document.getElementById('milk-arvin').style.top = '8vw';
            // };
            // document.getElementById('next-wrapper-koffee').onmouseover = () => {
            //     document.getElementById('bg-koffee').style.width = '34vw';
            // };
            // document.getElementById('next-wrapper-koffee').onmouseout = () => {
            //     document.getElementById('bg-koffee').style.width = '1vw';
            // };
        });
    }

}
