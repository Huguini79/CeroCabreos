let data = []

let xiLista = []
let hiLista = []
let FiLista = []
let HiLista = []
let xiPorfi = []

let sumatorio = 0

function MostrarGrafica() {
    new Chart(
        document.getElementById('grafica'),
        {
            type: 'bar',
            data: {
                labels: data.map(row => `[${row.start}, ${row.end})`),
                datasets: [
                    {
                        label: 'Histograma',
                        data: data.map(row => row.count)
                    }
                ]
            }
        }
    )
}

function NEnTotal() {
    data.forEach((element) => {
        sumatorio += element.count
    })

    return sumatorio
}

function CalcularFi() {
    data.forEach((element) => {
        sumatorio += element.count
        FiLista.push(sumatorio)
    })
}

function AnadirTabla() {
    let input1 = parseInt(document.getElementById('input1').value)
    let input2 = parseInt(document.getElementById('input2').value)
    let fi_entrada = parseInt(document.getElementById('fi_entrada').value)

    data.push({ start: input1, end: input2, count: fi_entrada })

}

function Calcular() {
    let contenido = document.getElementById('resultado')
    contenido.innerHTML = '';
    let N = NEnTotal()
    sumatorio = 0
    CalcularFi()
    sumatorio = 0
    let pos = -1
    data.forEach((element) => {
        pos++;
        let xi = (element.start + element.end) / 2 /* Ej: [0, 4) -> 0 + 4 = 4 -> 4 / 2 = 2 -> xi = 2 */
        xiLista.push(xi);
        let hi = element.count / N
        hiLista.push(hi);
        let Fi = FiLista[pos]
        FiLista.push(Fi);
        let Hi = Fi / N
        HiLista.push(Hi)
        let xiMultfi = xiLista[pos] * element.count
        console.log(xiMultfi)
        xiPorfi.push(xiMultfi)
        contenido.innerHTML += `
                Iteración ${pos}:<br>
                <label>xi: ${xi}</label>
                <br>
                <label>fi: ${element.count}</label>
                <br>
                <label>hi: ${element.count} / ${N} = ${hi.toFixed(2)} -> ${(hi * 100).toFixed(0)} %</label>
                <br>
                <label>Fi: ${Fi}</label>
                <br>
                <label>Hi: ${Fi} / ${N}</label>
                <br>
                <label>xi · fi: ${xiMultfi}</label>
                <br><br>
        `;
    })

}

function Grafica() {
    MostrarGrafica()
}

function GuardarEnPdf() {
    window.print()
}