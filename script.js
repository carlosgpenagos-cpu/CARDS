// Textos de los poemas para cada carta
const poemas = {
    1: "Verso de la carta 1: \nEl viento sopla sobre la memoria...",
    2: "Verso de la carta 2: \nLas cenizas del tiempo caen lento...",
    3: "Verso de la carta 3: \nUn eco lejano responde en el silencio...",
    4: "Verso de la carta 4: \nY la tierra guarda lo que hemos olvidado."
};

// Componente personalizado para detectar cuándo se ve una carta
AFRAME.registerComponent('detector-cartas', {
    schema: {
        numero: { type: 'number' }
    },
    init: function () {
        let el = this.el;
        let numCarta = this.data.numero;
        let cajaTexto = document.getElementById('interfaz-poema');

        // Cuando la cámara reconoce la carta
        el.addEventListener('markerFound', () => {
            console.log("Carta " + numCarta + " encontrada");
            cajaTexto.style.display = 'block';
            // Cambia el texto según la carta detectada
            cajaTexto.innerText = poemas[numCarta];
        });

        // Opcional: Cuando la cámara pierde la carta
        el.addEventListener('markerLost', () => {
            console.log("Carta " + numCarta + " perdida");
            // Si quieres que el texto desaparezca al quitar la carta, descomenta la siguiente línea:
            // cajaTexto.style.display = 'none';
        });
    }
});