// 1. LA MATRIZ DE POEMAS
const poemario = {
    "carta-1": [
        "What carries you,", 
        "were all swimming in one direction,",          
        "and they all paid the price."     
    ],
    "carta-2": [
        "Who don't know which voice to believe,",
        "could no longer agree with itself,",
        "and could not agree on what they were seeing."
    ],
    "carta-3": [
        "And the people who seemed calm,",
        "have a secret in their throat,", 
        "and the knot revealed itself as a path."
    ],
    "carta-4": [
        "Those who are brave,",
        "left the familiar road behind,",
        "and chose a direction before certainty arrived."
    ]
};

// 2. MEMORIA TEMPORAL 
let cartasEscaneadas = [];

// 3. EL MOTOR DE ENSAMBLAJE
function actualizarPoema() {
    const interfaz = document.getElementById("interfaz-poema");
    
    if (cartasEscaneadas.length === 0) {
        interfaz.style.display = "none";
        return;
    }

    let poemaConstruido = "";

    // Armamos los versos
    for (let i = 0; i < cartasEscaneadas.length; i++) {
        let idCarta = cartasEscaneadas[i];
        let verso = poemario[idCarta][i]; 
        poemaConstruido += verso + "<br>";
    }

    // Instrucciones dinámicas actualizadas
    if (cartasEscaneadas.length === 3) {
         poemaConstruido += "<span class='instrucciones'>Tap to ask a new question</span>";
    } else {
         poemaConstruido += "<span class='instrucciones'>Please read the next card.</span>";
    }

    interfaz.innerHTML = poemaConstruido;
    interfaz.style.display = "block";
}

// 4. EVENTOS DE LA CÁMARA
window.addEventListener("markerFound", (e) => {
    let idCarta = e.target.id; 
    
    if (idCarta && idCarta.startsWith("carta-") && !cartasEscaneadas.includes(idCarta)) {
        if (cartasEscaneadas.length < 3) {
            cartasEscaneadas.push(idCarta);
            actualizarPoema(); 
        }
    }
});

// 5. REINICIO MANUAL CON NUEVO TEXTO
document.addEventListener('DOMContentLoaded', () => {
    let interfaz = document.getElementById('interfaz-poema');
    interfaz.addEventListener('click', () => {
        if (cartasEscaneadas.length === 3) {
            cartasEscaneadas = []; 
            // Nuevo mensaje al limpiar la memoria
            interfaz.innerHTML = "<span class='instrucciones'>Think about your previous answer and, if you want, ask something else.</span>";
            setTimeout(() => {
                actualizarPoema(); 
            }, 3500); // Le di 3.5 segundos en lugar de 2 para que alcancen a leer el texto completo
        }
    });
});