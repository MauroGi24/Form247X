document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];

    utmParams.forEach(param => {
        if (urlParams.has(param)) {
            document.getElementById(param).value = urlParams.get(param);
        }
    });
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const formData = new FormData(this);
    const data = {
        nome: formData.get('nome'),
        cognome: formData.get('cognome'),
        email: formData.get('email'),
        telefono: formData.get('telefono'),
        utm_source: document.getElementById('utm_source').value,
        utm_medium: document.getElementById('utm_medium').value,
        utm_campaign: document.getElementById('utm_campaign').value,
        utm_content: document.getElementById('utm_content').value
    };

    fetch('https://hooks.zapier.com/hooks/catch/20628711/254w8qa/', {
        method: 'POST', 
        body: JSON.stringify(data)
        
    })
    .then(response => {
        if (response.ok) {
            window.location.href = 'thanks.html';
            alert('Dati inviati a Zapier')
        } else {
            console.error('Errore durante l\'invio del modulo a Zapier');
            alert('Si è verificato un errore. Riprova.');
        }
    })    
});

document.getElementById('contactForm').addEventListener('submit', function(event) {

    const formData = {
        nome: document.querySelector('input[name="nome"]').value,
        cognome: document.querySelector('input[name="cognome"]').value,
        email: document.querySelector('input[name="email"]').value,
        telefono: document.querySelector('input[name="telefono"]').value,
        utmSource: document.querySelector('input[name="utm_source"]').value
    };

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: 'formSubmit',
        formData: formData
    });

    console.log('Evento inviato a GTM:', formData); 
});
