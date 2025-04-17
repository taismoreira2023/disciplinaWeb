import './style.css';


document.querySelector('#app').innerHTML = `
  <div>
    <h1>Biblia busca</h1>
    <input class="input" type="text" placeholder="Digite um livro ou assunto" name="nome" id="search-input"/>
    <div>
      <button id="button">Enviar</button>
    </div>
    <ul id="data-list"></ul>
  </div>
`;


async function searchSpotify(query) {
  try {
    const queryParam = new URLSearchParams()
    queryParam.append('q', query)
    const response = await fetch('https://openlibrary.org/search.json?' + queryParam.toString());
    const data = await response.json()    
    return data; 
  } catch (error) {
    console.error('Erro ao buscar na api:', error);
    return []
  }
}


function displayResults(results) {
  const dataList = document.querySelector('#data-list');
  dataList.innerHTML = ''; 
  const items = results.docs
  items.forEach(item => {
    const element = document.createElement('div')
    element.innerHTML = `
      <p>${item.title}</p>
    `
    dataList.append(element)
  })
}


document.querySelector('#button').addEventListener('click', async () => {
  const query = document.querySelector('#search-input').value;
  if (query) {
    const results = await searchSpotify(query);
    displayResults(results); 
  } else {
    alert("Por favor, digite o nome de uma música ou artista.");
  }
});



