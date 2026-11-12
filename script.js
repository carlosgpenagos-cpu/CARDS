// 1. LA MATRIZ DE POEMAS (4 Cartas x 3 Posiciones)
const poemario = {
    "carta-1": [
        "What carries you,", // Posición 1 (Izquierda)
        ", were all swimming in one direction,",          // Posición 2 (Centro)
        "and they all paid the price."     // Posición 3 (Derecha)
    ],
    "carta-2": [
        "Who don't know which voice to believe,",
        ", could no longer agree with itself,",
        "and could not agree on what they were seeing."
    ],
    "carta-3": [
        "And the people who seemed calm,",
        ", have a secret in their throut,",
        "and the knot revealed itself as a path."
    ],
    "carta-4": [
        "Those who are brave,",
        ", left the familiar road behind,",
        "and chose a direction before certainty arrived."
    ]
};

// 2. MEMORIA TEMPORAL (Para saber qué está viendo la cámara)
let cartasVisibles = [];

// 3. EL MOTOR DE ENSAMBLAJE
function actualizarPoema() {
    const interfaz = document.getElementById("interfaz-poema");

    // Si no hay exactamente 3 cartas en la mesa, ocultamos el poema
    if (cartasVisibles.length !== 3) {
        interfaz.style.display = "none";
        return;
    }

    // Si hay 3 cartas, buscamos en qué posición X (izquierda a derecha) están
    let cartasEnMesa = cartasVisibles.map(idCarta => {
        let elementoHTML = document.getElementById(idCarta);
        // Obtenemos sus coordenadas en el espacio 3D
        let posicion = elementoHTML.getAttribute("position"); 
        
        return {
            id: idCarta,
            x: posicion.x // Nos importa el eje X para saber el orden horizontal
        };
    });

    // Ordenamos la lista de menor a mayor X (De izquierda a derecha)
    cartasEnMesa.sort((a, b) => a.x - b.x);

    // Extraemos el verso exacto según el orden de las cartas
    let versoIzquierda = poemario[cartasEnMesa[0].id][0];
    let versoCentro    = poemario[cartasEnMesa[1].id][1];
    let versoDerecha   = poemario[cartasEnMesa[2].id][2];

    // Armamos el poema final uniendo los tres versos
    let poemaFinal = `${versoIzquierda} <br> ${versoCentro} <br> ${versoDerecha}`;

    // Lo inyectamos en la pantalla y lo hacemos visible
    interfaz.innerHTML = poemaFinal;
    interfaz.style.display = "block";
}

// 4. LOS "OJOS" DEL SISTEMA (Eventos de la cámara)
window.addEventListener("markerFound", (e) => {
    // Cuando la cámara detecta un marcador (ej. carta-1), lo anota en la lista
    let idCarta = e.target.id;
    if (idCarta && !cartasVisibles.includes(idCarta)) {
        cartasVisibles.push(idCarta);
        actualizarPoema(); // Revisa si ya hay 3 para armar el poema
    }
});

window.addEventListener("markerLost", (e) => {
    // Cuando apartas una carta de la cámara, la borra de la lista
    let idCarta = e.target.id;
    cartasVisibles = cartasVisibles.filter(id => id !== idCarta);
    actualizarPoema(); // Esconde el poema porque ya no hay 3 cartas
});