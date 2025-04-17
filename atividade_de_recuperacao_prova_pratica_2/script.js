let seletorOrigem = document.getElementById('selectOrigem');
let seletorDestino = document.getElementById('selectDestino');
let input = document.getElementById('input_moeda_origem');
const button = document.getElementById('botao');
const listaHistorico = document.getElementById('listaHistorico');


const taxas = {
  Real: { Dollar: 0.2, Iene: 30, Real: 1 },
  Dollar: { Real: 5, Iene: 150, Dollar: 1 },
  Iene: { Real: 0.033, Dollar: 0.0067, Iene: 1 }
};

let historico = [];

button.addEventListener('click', (evento) => {
  evento.preventDefault();

  const origem = seletorOrigem.value;
  const destino = seletorDestino.value;
  const valor = parseFloat(input.value);

  if (!origem || !destino || isNaN(valor)) {
    alert("Preencha todas as informações:]");
    return;
  }

  const taxa = taxas[origem][destino];
  const valorConvertido = (valor * taxa).toFixed(2);
  const data = new Date().toLocaleString();

  const conversao = {
    data,
    moedas: `${origem} → ${destino}`,
    valores: `${valor} ${origem} → ${valorConvertido} ${destino}`
  };

  historico = [...historico, conversao]; 

  exibirHistorico();
});

function exibirHistorico() {
  listaHistorico.innerHTML = "" 
  historico.forEach(({ data, moedas, valores }) => {
    listaHistorico.innerHTML += `
      <li>
        <div>
          <p>Data: ${data}</p>
          <p>Moedas: ${moedas}</p>
          <p>Valores: ${valores}</p>
        </div>
      </li>
    `
  })
}
