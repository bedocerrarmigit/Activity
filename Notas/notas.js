document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');
    const contenedorResultados = document.getElementById('resultados');
    const resNombre = document.getElementById('res-nombre');
    const resPromedio = document.getElementById('res-promedio');
    const resEstado = document.getElementById('res-estado');

    formulario.addEventListener('submit', (evento) => {
        evento.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        const materia = document.getElementById('materia').value.trim();
        const semestre = document.getElementById('semestre').value.trim();
        const nota1 = parseFloat(document.getElementById('nota1').value);
        const nota2 = parseFloat(document.getElementById('nota2').value);
        const nota3 = parseFloat(document.getElementById('nota3').value);
        const nota4 = parseFloat(document.getElementById('nota4').value);

        if (validarNota(nota1) && validarNota(nota2) && validarNota(nota3) && validarNota(nota4)) {
            const promedio = calcularPromedio([nota1, nota2, nota3, nota4]);
            mostrarResultados(nombre, apellido, materia, semestre, promedio);
        } else {
            alert('Asegúrese de que todas las notas estén entre 1.0 y 5.0');
        }
    });

    function validarNota(nota) {
        return !isNaN(nota) && nota >= 1 && nota <= 5;
    }

    function calcularPromedio(notas) {
        const suma = notas.reduce((acumulado, actual) => acumulado + actual, 0);
        return (suma / notas.length).toFixed(1);
    }

    function numeroALetras(numero) {
        const unidades = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
        const [parteEntera, parteDecimal] = numero.toString().split('.');

        const palabraEntera = unidades[parseInt(parteEntera)];
        const palabraDecimal = parteDecimal ? unidades[parseInt(parteDecimal)] : 'cero';

        return `${palabraEntera} punto ${palabraDecimal}`;
    }

    function mostrarResultados(nombre, apellido, materia, semestre, promedio) {
        resNombre.textContent = `${nombre} ${apellido}`;
        document.getElementById('res-materia').textContent = materia;
        document.getElementById('res-semestre').textContent = `${semestre}° Semestre`;

        const promedioEnLetras = numeroALetras(promedio);
        resPromedio.textContent = `${promedio} (${promedioEnLetras})`;

        if (promedio >= 3.0) {
            resEstado.textContent = 'Aprobado';
            resEstado.className = 'estado-aprobado';
        } else {
            resEstado.textContent = 'Reprobado';
            resEstado.className = 'estado-reprobado';
        }

        contenedorResultados.style.display = 'block';
    }
});