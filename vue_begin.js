const app = new Vue({
    el: '#app',
    data: {
        greeting: 'Hello, ',
        yourName: 'Matty',
        myName: 'Lucie',
        navList: [
            'Home',
            'Experience ▾',
            'Projects ▾',
            'Skills',
            'Contact'
        ],
        emoji: [
            '😊', 
            '😔'
        ],
        doggy: '🐶'

    },
});

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