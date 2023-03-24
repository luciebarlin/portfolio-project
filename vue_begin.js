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
            download_cv: 'certs/cv_lucie_barlin_2023_02.pdf',
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
        dataTargets: [
            {
                webAccess: 'open-modal-web-access',
                css: 'open-modal-css',
                cssInt: 'open-modal-css-int'
            }
        ],
        certInfoArr: [
            {
                string: 'Web Accessibility',
                certID: 'modal-btn--web-access',
                slug: 'css',
                image: 'images/web_accessibility_cert.png',
                alt: 'a certificate of completion for an edX course on web accessibility'
            },
            {
                string: 'CSS',
                certID: 'modal-btn--css',
                slug: 'webAccess',
                image: 'images/css.png',
                alt: 'a certificate of completion for an codecademy course on css'
            
            },
            {
                string: 'Web Accessibility',
                certID: 'modal-btn--css-int',
                slug: 'cssInt',
                image: 'images/css_int.png',
                alt: 'a certificate of completion for a codecademy course on intermediate css'
            
            }
        ]
    }
})