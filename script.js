class Produtos {
    currentPage =
        "https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1";
    nextPage = "";
    data = [];
    service = null;

    constructor() {
        this.service = new DataService();
        this.onInit();
    }
    onInit = () => {
        const button = document.getElementById("button-more-products");
        const productsContainer = document.getElementById("grid-products");

        this.loadProducts(this.currentPage, productsContainer);

        button.onclick = () => {
            this.loadProducts(this.nextPage, productsContainer);
        };
    };
    productComponentBuilder = ({
        id,
        name,
        description,
        image,
        oldPrice,
        price,
        installments,
    }) => {
        const productElement = document.createElement("section");
        productElement.className = "product";
        productElement.innerHTML = `
            <header>
                <figure>
                    <img src="http:${image}"
                        alt="product ${id} image">
                </figure>
            </header>
            <section>
                <h5 class="product__title">${name}</h5>
                <p class="product__description">
                    ${description}
                </p>
                <div class="product_price">De: R$${oldPrice}</div>
                <div class="product_atual_price text-bold">Por: R$${price}</div>
                <div class="product_payment_form">ou ${installments.count}x de R$${installments.value}</div>
                <div>
                    <button class="button button-small width-100 font-size-big text-center" href="#" target="_blank"
                        rel="noopener noreferrer">Comprar</button>
                </div>
            </section>
        `;
        return productElement;
    };
    loadProducts = async (url, container = null) => {
        const { products, nextPage } = await this.service.getProducts(url);
        this.currentPage = `${url}`;
        this.nextPage = `https://${nextPage}`;

        this.data = products;
        const elements = this.data.map((product) =>
            this.productComponentBuilder(product)
        );
        elements.forEach((element) => container.appendChild(element));
    };
}

class DataService {
    constructor() {}
    fetchData = async (url) => await fetch(url);
    getProducts = async (resource) =>
        await (await this.fetchData(resource)).json();
}

(function () {
    return new Produtos();
})();