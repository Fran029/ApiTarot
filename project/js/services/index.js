// URL de la API
const tarotAPIUrl = 'https://tarot-api-es.vercel.app/api/v1/cards/';

// Función para obtener la lectura de 3 cartas al azar
async function getThreeCardReading() {
try {
    const response = await fetch(tarotAPIUrl);  
    if (!response.ok) {  
    throw new Error('Error al obtener las cartas: ' + response.statusText);
    }
    const data = await response.json();

    const tarotResult = document.getElementById('tarotResult');
    tarotResult.innerHTML = ''; 

    if (data.cards && data.cards.length > 0) {
      const randomCards = getRandomCards(data.cards, 3);  // Seleccionamos 3 cartas aleatorias

    randomCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        // Verificamos que la carta tenga una imagen
        const cardImage = card.image || 'https://via.placeholder.com/150';  
        cardElement.innerHTML = `
        <img src="${cardImage}" alt="${card.name}" class="card-image">
        <p><strong>${card.name}</strong>: ${card.meaning_up}</p>
        `;
        tarotResult.appendChild(cardElement);
    });
    } else {
    tarotResult.innerHTML = '<p>No se encontraron cartas disponibles.</p>';
    }

    // Ocultamos la "initial_box" y mostramos el "retryBox"
      const initialBox = document.querySelector('.initial_box');
      const retryBox = document.getElementById('retryBox');
      if (initialBox) {
          initialBox.style.display = 'none';
      }
      if (retryBox) {
          retryBox.style.display = 'block';
      }
} catch (error) {
    console.error('Error al obtener la lectura de tarot:', error);
    const tarotResult = document.getElementById('tarotResult');
    tarotResult.innerHTML = '<p>Hubo un error al obtener las cartas. Intenta de nuevo más tarde.</p>';
}
}

// Función para obtener cartas aleatorias
function getRandomCards(cards, numberOfCards) {
  const shuffledCards = cards.sort(() => 0.5 - Math.random());  
  return shuffledCards.slice(0, numberOfCards);  
}

// Asegúrate de que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  // Verificamos si el botón existe
const button = document.getElementById('getReadingButton');
if (button) {
    // Si el botón se encuentra correctamente, agregamos el event listener
    button.addEventListener('click', getThreeCardReading);  
} else {
    console.log("No se encontró el botón con id 'getReadingButton'.");
}

    // Agregamos funcionalidad al botón de "Nueva Consulta al Tarot"
    const retryButton = document.getElementById('retryButton');
    if (retryButton) {
        retryButton.addEventListener('click', () => {
            // Reiniciamos el estado de las cajas
            const initialBox = document.querySelector('.initial_box');
            const retryBox = document.getElementById('retryBox');
            const tarotResult = document.getElementById('tarotResult');

            if (initialBox) {
                initialBox.style.display = 'block'; // Mostramos la caja inicial
            }
            if (retryBox) {
                retryBox.style.display = 'none'; // Ocultamos la caja de reinicio
            }
            if (tarotResult) {
                tarotResult.innerHTML = ''; // Limpiamos los resultados previos
            }
        });
    }
});
