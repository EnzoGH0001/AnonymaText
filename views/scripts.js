function handleData(data) {
    console.log(`User ID: ${data.userId}`);
    const userIdDisplay = document.getElementById('userIdDisplay');
    if (userIdDisplay) {
        userIdDisplay.innerText = `User ID: ${data.userId}`;
    } else {
        console.error("L'élément userIdDisplay n'a pas été trouvé dans le document.");
    }
}

window.addEventListener('DOMContentLoaded', () => {
    fetch('../temp.json')
        .then(response => response.json())
        .then(data => handleData(data))
        .catch(error => console.error('Une erreur s\'est produite lors de la récupération du fichier JSON', error));
});