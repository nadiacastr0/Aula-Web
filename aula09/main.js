const valorInput = document.getElementById("valor");
const converterButton = document.getElementById("converter");
const resultadoDiv = document.getElementById("resultado");

converterButton.addEventListener("click", () => {
  const valor = valorInput.value;

  if (!valor || isNaN(valor)) {
    resultadoDiv.textContent = "Por favor, insira um valor válido.";
    return;
  }

  fetch("https://economia.awesomeapi.com.br/json/all")
    .then((response) => response.json())
    .then((bory) => {
      const cotacaoDolar = bory.USD.ask;
      const cotacaoEuro = bory.EUR.ask;

      const valorEmReaisDolar = (valor * cotacaoDolar).toFixed(2);
      const valorEmReaisEuro = (valor * cotacaoEuro).toFixed(2);

      resultadoDiv.innerHTML = `
                <p> <i class="bi bi-currency-dollar"></i>${valor} dólar(s) equivale(m) a ${valorEmReaisDolar} reais.</p>
                <p> <i class="bi bi-currency-euro"></i>${valor} euro(s) equivale(m) a ${valorEmReaisEuro} reais.</p>
            `;
    })
    .catch((e) => {
      resultadoDiv.textContent =
        "Ocorreu um erro ao obter as taxas de conversão.";
      console.error(e);
    });
});
