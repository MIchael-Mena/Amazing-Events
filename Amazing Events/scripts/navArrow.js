const pages = ['index', 'upcoming-events', 'past-event', 'contact', 'stats'];
const url = window.location.href.toString();
const route = url.substring(0, url.lastIndexOf('/')+1);
const currentPage = () => window.location.href.toString().split(route)[1].split('.html')[0];

function previousPage() {
    if(currentPage() === 'index') {
        return;
    }
    window.location.href = route + pages[pages.indexOf(currentPage()) - 1] + '.html';
}

function nextPage() {
    if(currentPage() === 'stats') {
        return;
    }
    window.location.href = route + pages[pages.indexOf(currentPage()) + 1] + '.html';
}