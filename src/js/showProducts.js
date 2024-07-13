import { allProducts } from "./productAPI.js";

const list = document.querySelector("[data-list]");

export default function buildCards(name, price, image, id) {
    const productLi = document.createElement("li");
    let btnId = `discard-product${id}`;
    productLi.className = "products-block";
    productLi.innerHTML = `
        <img class="products-image" src="${image}">
        <h3 class="products-description">${name}</h3>

        <div class="card-info">
            <p class="products-price">${price}</p>
            <button id="${btnId}" class="discard-product" data-id="${id}">
                <img src="../src/assets/bin.png" alt="Ícone de lixeira">
            </button>
        </div>
        `;

    const deleteButton = productLi.querySelector(`#${btnId}`);

    deleteButton.addEventListener("click", async (evento) => {
        evento.preventDefault();
        try {
            await allProducts.deleteProducts(id);
            list.removeChild(productLi); // Remove o produto da lista sem recarregar
        } catch (error) {
            console.error('Erro ao deletar produto:', error);
            // Lidar com o erro de forma adequada, sem recarregar a página
        }
    });

    return productLi;
}

async function showOnScreen() {
    try {
        list.innerHTML = ''; // Clear list before displaying
        const apiList = await allProducts.getProducts();
        apiList.forEach((elemento) =>
            list.appendChild(
                buildCards(
                    elemento.name,
                    elemento.price,
                    elemento.image,
                    elemento.id
                )
            )
        );
    } catch (error) {
        console.log(error);
        list.innerHTML = `<span>Não foi possível carregar a lista de cards</span>`;
    }
}

showOnScreen();

export const showProducts = {
    showOnScreen
}
