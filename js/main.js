// Espera a que todo el HTML esté cargado antes de ejecutar JS
document.addEventListener('DOMContentLoaded', () => {

    console.log('Sitio web cargado y listo.');

    // --- 1. DATOS SIMULADOS (Mock Data) ---
    // En un proyecto real, esto vendría de una API.
    const mockHotels = [
        { 
            id: 1, 
            nombre: "Hotel Paraíso Tropical", 
            precio: 120000, 
            calificacion: 9.5, 
            habitaciones: 5,
            imagen: "images/hotel-1.jpg",
            descripcion: "Disfruta de nuestras piscinas y excelente servicio." 
        },
        { 
            id: 2, 
            nombre: "Sunset Resort", 
            precio: 150000, 
            calificacion: 9.8, 
            habitaciones: 3,
            imagen: "images/hotel-2.jpg",
            descripcion: "Vistas increíbles al atardecer." 
        },
        { 
            id: 3, 
            nombre: "Hotel Urbano Central", 
            precio: 85000, 
            calificacion: 8.9, 
            habitaciones: 10,
            imagen: "images/hotel-3.jpg",
            descripcion: "Perfecto para viajes de negocios en la ciudad." 
        }
    ];

    // --- 2. LÓGICA PARA PASAR DATOS ENTRE PÁGINAS ---
    // Usaremos `localStorage` para simular un carrito de compras.
    // También `URLSearchParams` para leer el ID del hotel de la URL (ej: hotel.html?id=1)

    const params = new URLSearchParams(window.location.search);
    const hotelId = params.get('id'); // Obtiene el 'id' de la URL

    // --- 3. LÓGICA PARA CADA PÁGINA ---

    // Si estamos en la página de un hotel específico (hotel.html)
    if (document.body.id === 'hotel-detail' && hotelId) {
        // Encontrar el hotel en nuestros datos simulados
        const hotel = mockHotels.find(h => h.id == hotelId);
        
        if (hotel) {
            // Rellenar la página con los datos
            document.getElementById('hotel-name').textContent = hotel.nombre;
            document.getElementById('main-image').src = hotel.imagen;
            document.getElementById('hotel-description').textContent = hotel.descripcion;
            document.getElementById('hotel-price').textContent = `$${hotel.precio}`;
            document.getElementById('hotel-rating').textContent = `${hotel.calificacion}/10 ★`;
            document.getElementById('hotel-stock').textContent = hotel.habitaciones;
            
            // Actualizar el botón de "Reservar" para que lleve al carrito
            document.querySelector('.btn-reservar-grande').href = `carrito.html?id=${hotel.id}`;
        }
    }

    // Si estamos en la página de resultados (resultados.html)
    if (document.getElementById('results-list')) {
        const resultsList = document.getElementById('results-list');
        resultsList.innerHTML = ''; // Limpiar el contenido de ejemplo
        
        // (Aquí filtrarías `mockHotels` basado en la búsqueda)
        // Por ahora, solo mostramos todos:
        mockHotels.forEach(hotel => {
            const hotelElement = document.createElement('article');
            hotelElement.className = 'result-item';
            hotelElement.innerHTML = `
                <img src="${hotel.imagen}" alt="${hotel.nombre}">
                <div class="result-info">
                    <h2><a href="hotel.html?id=${hotel.id}">${hotel.nombre}</a></h2>
                    <p>${hotel.descripcion}</p>
                </div>
                <div class="result-details">
                    <span>Costo x noche: $${hotel.precio}</span>
                    <span>Calificación: ${hotel.calificacion}/10 ★</span>
                    <span>Habitaciones disponibles: ${hotel.habitaciones}</span>
                    <a href="carrito.html?id=${hotel.id}" class="btn-reservar">Reservar</a>
                </div>
            `;
            resultsList.appendChild(hotelElement);
        });
    }

    // (Aquí iría más lógica para el carrito, formularios, etc.)

});