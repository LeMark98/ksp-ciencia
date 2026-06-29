// ==========================================
// 1. BANCOS DE DATOS (TRADUCCIÓN OFICIAL KSP)
// ==========================================
const biomas = [
    "Centro Espacial Kerbal (KSC)", 
    "Plataforma de Lanzamiento", 
    "Pista de Aterrizaje", 
    "Ensamblaje de Vehículos (VAB)", 
    "Hangar de Aviones (SPH)", 
    "Estación de Seguimiento", 
    "Complejo de I+D", 
    "Complejo de Astronautas", 
    "Control de Misión", 
    "Administración", 
    "Camino de Orugas", 
];

const experimentos = [
    "Tripulación",    // (Crew Report)
    "EVA",              // (EVA Report)
    "Superficie",        // (Surface Sample)
    "Mejunje",           // (Mystery Goo)
    "Materiales",          // (Materials Study)
    "Temperatura",                  // (Temperature)
    "Presión",          // (Barometer)
    "Escaneo sísmico"               // (Seismic)
];

// const experimentos = [
//     "Informe de la tripulación",    // (Crew Report)
//     "Informe del EVA",              // (EVA Report)
//     "Muestra de superficie",        // (Surface Sample)
//     "Mejunje misterioso",           // (Mystery Goo)
//     "Bahía de materiales",          // (Materials Study)
//     "Temperatura",                  // (Temperature)
//     "Presión barométrica",          // (Barometer)
//     "Escaneo sísmico"               // (Seismic)
// ];

// Conectamos con el contenedor del HTML
const appContainer = document.getElementById('app');

// ==========================================
// 2. CREANDO LA ESTRUCTURA DE LA TABLA
// ==========================================

// Creamos la etiqueta principal <table>
const tabla = document.createElement('table');

// Creamos la fila de encabezado (La parte de arriba de la tabla)
const filaEncabezado = document.createElement('tr');

// La primera celda de arriba (Esquina superior izquierda)
const celdaEsquina = document.createElement('th');
celdaEsquina.classList.add('columna-fija');

const spanEsquina = document.createElement('span'); // También le creamos su span
spanEsquina.textContent = "Ubicación / Bioma";
celdaEsquina.appendChild(spanEsquina);
filaEncabezado.appendChild(celdaEsquina);

// El bucle corregido para los experimentos:
experimentos.forEach(exp => {
    // 1. Creamos la celda th
    const th = document.createElement('th');
    
    // 2. Creamos el contenedor span
    const span = document.createElement('span'); 
    
    // 3. Le metemos el texto AL SPAN (¡No al th!)
    span.textContent = exp;
    
    // ASIGNAR LA CLASE AL CONTENEDOR DEL TEXTO (O al th, según prefieras para tu CSS)
    span.classList.add('texto-girado');                    
    
    // 4. Metemos el span DENTRO del th
    th.appendChild(span);                         
    
    // 5. Metemos el th dentro de la fila
    filaEncabezado.appendChild(th);
});

// Metemos la fila del encabezado dentro de la tabla
tabla.appendChild(filaEncabezado);

// ==========================================
// 3. CREANDO LAS FILAS DE DATOS (BIOMAS)
// ==========================================

// Ahora vamos a crear una fila por cada bioma
biomas.forEach((bioma, bIdx) => {
    // Creamos la fila para este bioma específico
    const fila = document.createElement('tr');

    // Creamos la primera celda de la fila con el nombre del bioma
    // 1. Creas tu elemento normal
    const celdaBioma = document.createElement('td');
    celdaBioma.textContent = bioma;

    // 2. Le asignas la clase que tú quieras (por ejemplo: 'columna-fija')
    celdaBioma.classList.add('columna-fija');

    // 3. Lo metes a la fila
    fila.appendChild(celdaBioma);

    // ==========================================
    // 4. LLENANDO LA FILA CON LOS CHECKBOXES
    // ==========================================
    
    // Por cada experimento, creamos una celda con su respectivo checkbox
    experimentos.forEach((exp, eIdx) => {
        const celdaCheckbox = document.createElement('td');
        
        // Mantenemos el mismo truco de la clave única basada en su posición (bIdx y eIdx)
        const key = `ksp_key_${bIdx}_${eIdx}`;
        
        // Creamos el checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = key;

        // Recuperamos el estado de la memoria (localStorage)
        if (localStorage.getItem(key) === 'true') {
            checkbox.checked = true;
        }

        // Guardamos el estado en la memoria cuando haces clic
        checkbox.addEventListener('change', (e) => {
            localStorage.setItem(key, e.target.checked);
        });

        // Metemos el checkbox dentro de la celda, y la celda dentro de la fila
        celdaCheckbox.appendChild(checkbox);
        fila.appendChild(celdaCheckbox);
    });

    // Metemos la fila completa (con el nombre y todos sus checkboxes) en la tabla
    tabla.appendChild(fila);
});

// ==========================================
// 5. INYECTAR LA TABLA AL HTML VISIBLE
// ==========================================
appContainer.appendChild(tabla);