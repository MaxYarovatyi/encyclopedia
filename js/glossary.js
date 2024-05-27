document.addEventListener('DOMContentLoaded', function() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        const termElement = document.getElementById(hash);
        if (termElement) {
            termElement.classList.add('highlight');
            setTimeout(() => {
                termElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100); // Затримка для того, щоб забезпечити коректну прокрутку
        }
    }
});

document.getElementById('back').addEventListener('click', function() {
    window.history.back();
});