// Fondo tipo Matrix
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "01".split("");
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; // Conserva el efecto de desvanecimiento (rastro)
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${fontSize}px monospace`; // Fuente configurada fuera del bucle

    for (let i = 0; i < drops.length; i++) {
        // Generar carácter: 20% de probabilidad de ser "?", 80% carácter aleatorio
        const useQuestion = Math.random() < 0.05;
        const text = useQuestion ? "?" : letters[Math.floor(Math.random() * letters.length)];
        
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Cambiar color según el carácter
        if (text === "?") {
            ctx.fillStyle = "white"; // Color para los signos de interrogación
        } else {
            ctx.fillStyle = "red";  // Color predeterminado
        }

        ctx.fillText(text, x, y); // Dibujar el carácter

        // Reiniciar posición si el carácter sale del canvas
        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 50);

function updateFavicon() {
    const favCanvas = document.createElement('canvas');
    const favCtx = favCanvas.getContext('2d');
    favCanvas.width = 32;
    favCanvas.height = 32;

    favCtx.fillStyle = "black";
    favCtx.fillRect(0, 0, favCanvas.width, favCanvas.height);

    favCtx.fillStyle = "red";
    favCtx.font = "bold 16px monospace";
    favCtx.fillText(letters[Math.floor(Math.random() * letters.length)], 8, 24);

    const favicon = document.getElementById("dynamicFavicon");
    favicon.href = favCanvas.toDataURL("image/png");
}

// Actualiza el favicon cada 500ms
setInterval(updateFavicon, 500);
