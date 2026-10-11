import { useEffect, useState } from "react";
import { ProductCard } from "./components/ProductCard/ProductCard";
import { getProducts } from "./services/productService";
import type { Product } from "./types/Product";
import "./App.css";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        setError("Não foi possível carregar os produtos. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const selectedProductName = selectedProduct
    ? selectedProduct.productName ??
      selectedProduct["nome do produto"] ??
      "Produto"
    : "";

  const selectedProductPrice = selectedProduct
    ? selectedProduct["Preço"].toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    : "";

  return (
    <main className="app">
      <header className="app-header">
        <h1>Vitrine de Produtos</h1>
        <p>Confira nossos produtos disponíveis.</p>
      </header>

      <section className="product-section" aria-label="Lista de produtos">
        {loading && <p>Carregando produtos...</p>}

        {error && <p role="alert">{error}</p>}

        {!loading && !error && products.length === 0 && (
          <p>Nenhum produto encontrado.</p>
        )}

        {!loading && !error && (
          <div className="product-grid">
            {products.map((product, index) => (
              <ProductCard
                key={`${product.productName ?? product["nome do produto"]}-${index}`}
                product={product}
                onClick={setSelectedProduct}
              />
            ))}
          </div>
        )}
      </section>

      {selectedProduct && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedProduct(null)}
        >
          <section
            className="product-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              type="button"
              aria-label="Fechar detalhes"
              onClick={() => setSelectedProduct(null)}
            >
              ×
            </button>

            <img
              src={selectedProduct.foto}
              alt={selectedProductName}
            />

            <h2 id="modal-title">{selectedProductName}</h2>

            <p>{selectedProduct.descriptionShort}</p>

            <p className="modal-price">{selectedProductPrice}</p>
          </section>
        </div>
      )}
    </main>
  );
}

export default App;