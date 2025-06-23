const body = document.querySelector('body')
const wrapper = document.querySelector('.wrapper')
const theme = document.querySelector('#theme')

theme.addEventListener('click', (e) => {
    body.classList.toggle('light-mode')
    if(body.classList.contains('light-mode')) {
        theme.innerHTML = '<img src="assets/dark-mode.svg">'
    } else {
        theme.innerHTML = '<img src="assets/light-mode.svg">'
    }
})