// const app = new Vue({
//     el: '#app',
//     data: {
//         greeting: 'Hello, ',
//         yourName: 'Matty',
//         myName: 'Lucie',
//         navList: [
//             'Home',
//             'Experience ▾',
//             'Projects ▾',
//             'Skills',
//             'Contact'
//         ],
//         emoji: [
//             '😊', 
//             '😔'
//         ],
//         doggy: '🐶'

//     },
// });

const vueFooter = new Vue({
    el: '#vue-footer',
    data: {
        copyrightInfo: '© 2023 Lucie Barlin ~ ',
        myEmail: 'lucie.barlin@hotmail.com',
        hrefs: {
            download_cv: 'certs/cv_lucie_barlin_202304.pdf',
            my_certs: 'certs.html',
            umbrella:'weatherapi.html',
            cake: 'cake_quiz.html',
            hangman: 'hangman.html',
            todo: 'todolist.html',
        },
        hrefsSocial: {
            github: 'https://github.com/luciebarlin',
            linkedin: 'https://www.linkedin.com/in/lucie-barlin-a292a14b/'

        },
        footerNavList: [
            {
                string: 'Download CV',
                slug: 'download_cv'
            },
            {
                string: 'My Certificates',
                slug: 'my_certs'
            },
            {
                string: 'Umbrella Checker',
                slug: 'umbrella'
            },
            {
                string: 'Cake Quiz',
                slug: 'cake'
            },
            {
                string: 'Hangman',
                slug: 'hangman'
            },
            {
                string: 'Todo List',
                slug: 'todo'
            }
        ],
        socialLogoLinks: [
            {
                image: 'images/github.png',
                alt: 'go to my GitHub page', 
                slug: 'github'
            },
            {
                image: 'images/LinkedIn_icon.svg.png',
                alt: 'go to my LinkedIn page', 
                slug: 'linkedin'
            }
        ]

    }
})




const vueCerts = new Vue({
    el: '#cert-showcase',
    data: {
        myName: 'Lucie Barlin',
        displayModal: false,
        dataTargets: 
            {
                webAccess: 'open-modal-web-access',
                html: 'open-modal-html',
                css: 'open-modal-css',
                cssInt: 'open-modal-css-int',
                cssResp: 'open-modal-css-resp',
                sass: 'open-modal-sass',
                git: 'open-modal-git',
                js: 'open-modal-js',
                jsWebsites: 'open-modal-js-websites',
                bootstrap: 'open-modal-bootstrap',
                colorDesign: 'open-modal-color-design'
            },
        
        certInfoArr: [
            {
                string: 'Web Accessibility',
                certID: 'modal-btn--web-access',
                slug: 'css',
                image: 'images/web_accessibility_cert.png',
                alt: 'a certificate of completion for an edX course on web accessibility'
            },
            {
                string: 'HTML',
                certID: 'modal-btn--html',
                slug: 'html',
                image: 'images/html.png',
                alt: 'a certificate of completion for a codecademy course on html'
            
            },
            {
                string: 'CSS',
                certID: 'modal-btn--css',
                slug: 'webAccess',
                image: 'images/css.png',
                alt: 'a certificate of completion for a codecademy course on css'
            
            },
            {
                string: 'CSS Intermediate',
                certID: 'modal-btn--css-int',
                slug: 'cssInt',
                image: 'images/css_int.png',
                alt: 'a certificate of completion for a codecademy course on intermediate css'
            
            },
            {
                string: 'CSS Responsive Design',
                certID: 'modal-btn--css-resp',
                slug: 'cssResp',
                image: 'images/css_resp.png',
                alt: 'a certificate of completion for a codecademy course on responsive css design'
            
            },
            {
                string: 'Sass',
                certID: 'modal-btn--sass',
                slug: 'sass',
                image: 'images/sass.png',
                alt: 'a certificate of completion for a codecademy course on sass'
            
            },
            {
                string: 'Git & Github',
                certID: 'modal-btn--git',
                slug: 'git',
                image: 'images/git.png',
                alt: 'a certificate of completion for a codecademy course on git and github'
            
            },
            {
                string: 'JavaScript',
                certID: 'modal-btn--js',
                slug: 'js',
                image: 'images/js.png',
                alt: 'a certificate of completion for a codecademy course on javascript'
            
            },
            {
                string: 'JavaScript Websites',
                certID: 'modal-btn--js-websites',
                slug: 'jsWebsites',
                image: 'images/js_websites.png',
                alt: 'a certificate of completion for a codecademy course on building javascript websites'
            
            },
            {
                string: 'Bootstrap',
                certID: 'modal-btn--bootstrap',
                slug: 'bootstrap',
                image: 'images/bootstrap.png',
                alt: 'a certificate of completion for a codecademy course on bootstrap'
            
            },
            {
                string: 'Color Design',
                certID: 'modal-btn--color-design',
                slug: 'colorDesign',
                image: 'images/color_design.png',
                alt: 'a certificate of completion for a codecademy course on color theory and design'
            
            },
        ]
    },
    methods: {
        sayHi: function () {
            alert(`Hello ${this.myName}`);
        },

        toggleTheModals: function () {
            // const targetModalSelector = event.target.dataset.targetModal;
            // const targetModal = document.getElementById(targetModalSelector);
            // // targetModal.style.display = "block";
            // targetModal.classList.toggle("blockDisplay");
            console.log("hi");
            this.displayModal = !this.displayModal;
        },

        

    
    } 
})