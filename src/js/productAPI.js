async function getProducts() {
    const configFetch = {
        method: "GET",
    }
    const productsData = await fetch("https://alura-geek-ochre-ten.vercel.app/db.json", configFetch);
    const allProducts = await productsData.json();
    return allProducts;
}

async function createProducts(productName, productPrice, productImage) {
    const productsData = await fetch("http://localhost:3000/produtos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: productName,
            price: `R$${productPrice}`,
            image: productImage,
        })
    });
    const allProducts = await productsData.json();
    return allProducts;
}

async function deleteProducts(id) {
    try {
        const response = await fetch(`http://localhost:3000/produtos/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Erro ao deletar produto');
        }
        return true;
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        throw error;
    }
}

export const allProducts = {
    getProducts,
    createProducts,
    deleteProducts
}
