// SELECIONA OS ELEMENTOS DO HTML
const form = document.querySelector('form')
const apiKeyInput = document.getElementById('api-key');
const perguntaInput = document.getElementById('pergunta');

// Seletor para a div que contém a resposta
const respostaContainer = document.querySelector('.resposta-container');
const respostaTextarea = document.getElementById('resposta-ia');


// Adiciona um evento de 'submit' ao formulário
form.addEventListener('submit', (evento) => {
  evento.preventDefault();

//OBTEM OS DADOS DOS INPUTS
const chaveDaAPI = apiKeyInput.value;
const perguntaDoUsuario = perguntaInput.value;

//Verificar se a chave e a pergunta foram preenchidas

if(!chaveDaAPI || !perguntaDoUsuario){
  respostaTextarea.value = 'Por favor, preencha a chave da API e a pergunta.';
  respostaContainer.classList.remove('hidden');
  return;
}
//REMOVENDO O OCULTAR
 respostaContainer.classList.remove('hidden');
//Exibe uma mensagem de carregamento
respostaTextarea.value = 'Aguarde, a IA está pensando';

// URL da API Gemini (modelo flash 2.0)
const urlDaAPI = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Cabeçalhos HTTP necessários pra requisição funcionar
const headers  = {
  'Content-Type': 'application/json', // Diz que estamos enviando um JSON
  'X-goog-api-key': chaveDaAPI        // Autenticação da requisição usando sua chave
};

// Corpo da requisição, com a pergunta formatada como a API exige
const body = {
  contents: [
    {
      parts: [
        {
          text: perguntaDoUsuario // Texto da pergunta enviada
        }
      ]
    }
  ]
};

// Faz a chamada para a API com método POST usando fetch
fetch(urlDaAPI, {
  method: 'POST', 
  headers: headers , 
  body: JSON.stringify(body) 
})
  .then(resposta => resposta.json())
  .then(dadosRecebidos => {
    
    const respostaIA = dadosRecebidos?.candidates?.[0]?.content?.parts?.[0]?.text || 
    'Não foi possível obter uma resposta.';

    // Exibe o resultado na textarea

    respostaTextarea.value = respostaIA;
    
  })
  .catch(erro => {
    // Se algo der errado, exibe o erro
    console.error('Erro ao chamar a API:', erro);
    respostaTextarea.value = 'Erro ao chamar a API. Verifique sua chave ou tente novamente mais tarde.';
  });
});
const limparBtn = document.querySelector('.btn-limp');
limparBtn.addEventListener('click', () => {
      respostaContainer.classList.add('hidden');
      respostaTextarea.value = '';});