let data = [];

let xiLista = [];
let hiLista = [];
let FiLista = [];
let HiLista = [];
let xiPorfi = [];

let sumatorio = 0;

function MostrarGrafica() {
  new Chart(document.getElementById("grafica"), {
    type: "bar",
    data: {
      labels: data.map((row) => `[${row.start}, ${row.end})`),
      datasets: [
        {
          label: "Histograma",
          data: data.map((row) => row.count),
        },
      ],
    },
  });
}

function NEnTotal() {
  data.forEach((element) => {
    sumatorio += element.count;
  });

  return sumatorio;
}

function CalcularFi() {
  data.forEach((element) => {
    sumatorio += element.count;
    FiLista.push(sumatorio);
  });
}

function AnadirTabla() {
  let input1 = parseInt(document.getElementById("input1").value);
  let input2 = parseInt(document.getElementById("input2").value);
  let fi_entrada = parseInt(document.getElementById("fi_entrada").value);

  if (!isNaN(input1)|| !isNaN(input2) || !isNaN(fi_entrada)) {
    data.push({ start: input1, end: input2, count: fi_entrada });

    let contenido = document.getElementById("tabla");
    contenido.innerHTML = "";
    contenido.innerHTML += `
        <tr>
                            <td>Clases</td>
                            <td>fi</td>
                </tr>
        `;
    data.forEach((element) => {
      contenido.innerHTML += `
                
                        <tr>
                            <td>[${element.start}, ${element.end})</td>
                            <td>${element.count}</td>
                        </tr>
            `;
    });

  } else {
    alert("Campos vacíos, introduce los números necesarios");
  }
}

function Calcular() {
  let contenido = document.getElementById("tabla");
  contenido.innerHTML = "";
  let N = NEnTotal();
  sumatorio = 0;
  CalcularFi();
  sumatorio = 0;
  let pos = -1;
  contenido.innerHTML += `
    <tr>
                        <td>Clases</td>
                        <td>xi</td>
                        <td>fi</td>
                        <td>hi</td>
                        <td>Fi</td>
                        <td>Hi</td>
                        <td>xi · fi</td>
            </tr>
    `;
  data.forEach((element) => {
    pos++;
    let xi =
      (element.start + element.end) /
      2; /* Ej: [0, 4) -> 0 + 4 = 4 -> 4 / 2 = 2 -> xi = 2 */
    xiLista.push(xi);
    let hi = element.count / N;
    hiLista.push(hi);
    let Fi = FiLista[pos];
    FiLista.push(Fi);
    let Hi = Fi / N;
    HiLista.push(Hi);
    let xiMultfi = xiLista[pos] * element.count;
    console.log(xiMultfi);
    xiPorfi.push(xiMultfi);
    contenido.innerHTML += `
            
                    <tr>
                        <td>[${element.start}, ${element.end})</td>
                        <td>${xi}</td>
                        <td>${element.count}</td>
                        <td>${element.count} / ${N} = ${hi.toFixed(2)} -> ${(hi * 100).toFixed(0)} %</td>
                        <td>${Fi}</td>
                        <td>${Fi} / ${N}</td>
                        <td>${xiMultfi}</td>
                    </tr>
        `;
  });
}

function Grafica() {
  MostrarGrafica();
}

function GuardarEnPdf() {
  window.print();
}
