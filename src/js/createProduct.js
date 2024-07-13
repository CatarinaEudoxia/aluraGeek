import { allProducts } from './productAPI.js';
import { showProducts } from './showProducts.js';

const forms = document.querySelector('[data-form]');

function clearForm() {
    const resetButton = document.querySelector(".reset-button");
    resetButton.addEventListener("click", () => {
        forms.reset();
    });
}

async function addNewProduct(evento) {
    evento.preventDefault();

    const productName = document.querySelector('[data-name]').value;
    const productPrice = document.querySelector('[data-price]').value;
    const productImage = document.querySelector('[data-image]').value;

    try {
        await allProducts.createProducts(productName, productPrice, productImage);
        showProducts.showOnScreen(); // Atualiza a lista de produtos na tela

        const messageSpan = document.querySelector('.message-button');
        messageSpan.innerText = "Produto cadastrado com sucesso!";
    } catch (error) {
        console.error('Erro ao cadastrar produto:', error);
        // Lidar com o erro de forma adequada, sem recarregar a página
    }

    forms.reset();
}

forms.addEventListener('submit', evento => addNewProduct(evento));
clearForm();
