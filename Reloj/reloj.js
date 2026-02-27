const lienzo = document.getElementById('reloj');
const ctx = lienzo.getContext('2d');
const entradaHora = document.getElementById('hora');
const entradaMinuto = document.getElementById('minuto');
const resultado = document.getElementById('resultado');

document.getElementById('calcular').addEventListener('click', calcular);

function calcular() {
  const h = parseInt(entradaHora.value);
  const m = parseInt(entradaMinuto.value);

  if (isNaN(h) || h < 1 || h > 12 || isNaN(m) || m < 0 || m > 59) {
    resultado.textContent = 'Valores inválidos';
    return;
  }

  const anguloHorario = (h % 12) * 30 + m * 0.5;
  const anguloMinutero = m * 6;

  const diferencia = Math.abs(anguloHorario - anguloMinutero);
  const angulo = Math.min(diferencia, 360 - diferencia);

  resultado.textContent = angulo.toFixed(2) + '°';
  dibujar(h, m);
}

function aRadianes(grados) {
  return (grados - 90) * Math.PI / 180;
}

function dibujar(h, m) {
  const cx = lienzo.width / 2;
  const cy = lienzo.height / 2;
  const radio = cx - 10;

  ctx.clearRect(0, 0, lienzo.width, lienzo.height);

  ctx.beginPath();
  ctx.arc(cx, cy, radio, 0, Math.PI * 2);
  ctx.fillStyle = '#1a1a1a';
  ctx.fill();
  ctx.strokeStyle = '#555';
  ctx.lineWidth = 2;
  ctx.stroke();

  for (let i = 0; i < 12; i++) {
    const angulo = aRadianes(i * 30);
    ctx.beginPath();
    ctx.moveTo(cx + (radio - 6) * Math.cos(angulo), cy + (radio - 6) * Math.sin(angulo));
    ctx.lineTo(cx + (radio - 18) * Math.cos(angulo), cy + (radio - 18) * Math.sin(angulo));
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  const anguloHorario = (h % 12) * 30 + m * 0.5;
  const anguloMinutero = m * 6;

  const radHorario = aRadianes(anguloHorario);
  const radMinutero = aRadianes(anguloMinutero);

  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.arc(cx, cy, radio * 0.35, radHorario, radMinutero);
  ctx.closePath();
  ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + radio * 0.55 * Math.cos(radHorario), cy + radio * 0.55 * Math.sin(radHorario));
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(cx + radio * 0.75 * Math.cos(radMinutero), cy + radio * 0.75 * Math.sin(radMinutero));
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, 5, 0, Math.PI * 2);
  ctx.fillStyle = '#fff';
  ctx.fill();
}
