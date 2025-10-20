document.getElementById('reservation-form').addEventListener('submit', function(event) {
    event.preventDefault();
  
    const nbPersonnes = document.getElementById('nb-personnes').value;
    const numeroCommande = Math.floor(100000 + Math.random() * 900000);
  
    const message = `✅ Merci ! Votre commande a été prise pour ${nbPersonnes} personne(s). 
    Votre numéro de commande est : #${numeroCommande}`;
  
    document.getElementById('confirmation-message').textContent = message;
  });
  