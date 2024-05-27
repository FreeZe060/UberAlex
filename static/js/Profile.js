window.onload = function() {
    choisirOnglet(0);
}

function choisirOnglet(index) {
    var info = document.getElementById("info");
    var commande = document.getElementById("commande");
    var favoris = document.getElementById("favoris");
    var boutons = document.getElementsByClassName("bouton-onglet");
    for (var i = 0; i < boutons.length; i++) {
        boutons[i].classList.remove("selected");
    }
    boutons[index].classList.add("selected");

    switch(index) {
        case 0:
            info.style.display = "block";
            commande.style.display = "none";
            favoris.style.display = "none";
            break;
        case 1:
            info.style.display = "none";
            commande.style.display = "block";
            favoris.style.display = "none";
            break;
        case 2:
            info.style.display = "none";
            commande.style.display = "none";
            favoris.style.display = "block";
            break;
        default:
            info.style.display = "block";
            commande.style.display = "none";
            favoris.style.display = "none";
            break;
    }
    
    var traitNoir = document.querySelector(".trait-noir");
    var boutonSelectionne = boutons[index];
    var boutonSelectionnePosition = boutonSelectionne.offsetLeft;
    traitNoir.style.width = boutonSelectionne.offsetWidth + "px";
    traitNoir.style.transform = "translateX(" + boutonSelectionnePosition + "px)";
}

function toggleEdit(section) {
    const display = document.getElementById(`${section}-display`);
    const edit = document.getElementById(`${section}-edit`);
    const editButton = document.getElementById(`button_edit-${section}`);
    const saveButton = document.getElementById(`save-${section}`);
    
    const isEditing = edit.style.display === 'none';
    
    display.style.display = isEditing ? 'none' : 'inline';
    edit.style.display = isEditing ? 'block' : 'none';
    editButton.style.display = isEditing ? 'none' : 'inline';
    saveButton.style.display = isEditing ? 'inline' : 'none';
}

function saveEdit(section) {
    const data = {};
    if (section === 'name') {
        data.last_name = document.getElementById('last-name').value;
        data.first_name = document.getElementById('first-name').value;
    } else if (section === 'address') {
        data.address = document.getElementById('address').value;
    } else if (section === 'email') {
        data.email = document.getElementById('email').value;
    }

    fetch(`/user/profile/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
      .then(result => {
          if (result.success) {
              if (section === 'name') {
                  document.getElementById('name-display').textContent = `${data.last_name} ${data.first_name}`;
              } else if (section === 'address') {
                  document.getElementById('address-display').textContent = data.address;
              } else if (section === 'email') {
                  document.getElementById('email-display').textContent = data.email;
              }
              toggleEdit(section);
          } else {
              alert('Erreur lors de la mise à jour');
          }
      }).catch(error => {
          console.error('Erreur:', error);
          alert('Une erreur s\'est produite lors de la mise à jour');
      });
}



