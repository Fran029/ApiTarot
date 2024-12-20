// URL de la API
const tarotAPIUrl = 'https://tarot-api-es.vercel.app/api/v1/cards/';

// Función para obtener una carta relacionada con un tema específico
async function getSingleCardReading(tema) {
  try {
    const response = await fetch(tarotAPIUrl); // Usamos la URL correcta
    if (!response.ok) { // Verificar si la respuesta es correcta
      throw new Error('Error al obtener las cartas: ' + response.statusText);
    }
    const data = await response.json();

    const consultaResultado = document.getElementById('consultaResultado');
    consultaResultado.innerHTML = ''; // Limpiar cualquier contenido anterior

    if (data.cards && data.cards.length > 0) {
      // Filtramos las cartas que correspondan al tema
      const filteredCards = data.cards.filter(card => card.keywords.includes(tema));

      if (filteredCards.length > 0) {
        // Seleccionamos una carta aleatoria
        const randomCard = filteredCards[Math.floor(Math.random() * filteredCards.length)];

        // Verificamos que la carta tenga una descripción específica del tema
        const specificMeaning = randomCard.meanings && randomCard.meanings[tema];
        const description = specificMeaning || 'No hay información específica para este tema.';

        // Verificamos que la carta tenga una imagen
        const cardImage = randomCard.image || 'https://via.placeholder.com/150';

        // Creamos el elemento HTML para mostrar la carta
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        cardElement.innerHTML = `
          <img src="${cardImage}" alt="${randomCard.name}" class="card-image">
          <div class="card-text">
            <strong>${randomCard.name}</strong>
            <p>${description}</p>
          </div>
        `;
        consultaResultado.appendChild(cardElement);
      } else {
        consultaResultado.innerHTML = `<p>No se encontraron cartas relacionadas con el tema "${tema}".</p>`;
      }
    } else {
      consultaResultado.innerHTML = '<p>No se encontraron cartas disponibles.</p>';
    }
  } catch (error) {
    console.error('Error al obtener la carta específica:', error);
    const consultaResultado = document.getElementById('consultaResultado');
    consultaResultado.innerHTML = '<p>Hubo un error al obtener la carta. Intenta de nuevo más tarde.</p>';
  }
}

// Asegúrate de que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  const consultaBtns = document.querySelectorAll('.consulta-btn');
  consultaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tema = btn.getAttribute('data-tema'); // Obtenemos el tema del atributo data-tema
      getSingleCardReading(tema); // Llamamos a la función con el tema seleccionado
    });
  });
});
