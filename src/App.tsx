import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard/ProductCard";
import Header from "./components/Header/Header";
import { getProducts } from "./services/productService";
import type { Product } from "./types/Product";
import "./App.css";

const formatPrice = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProducts() {
      try {
        setProducts(await getProducts());
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
        setError("Não foi possível carregar os produtos. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedProduct(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <main className="app">
      <Header />

      <section className="product-section" aria-label="Lista de produtos">
        <h1>Vitrine de produtos</h1>

        {loading && <p>Carregando produtos...</p>}
        {error && <p role="alert">{error}</p>}

        {!loading && !error && products.length === 0 && (
          <p>Nenhum produto encontrado.</p>
        )}

        {!loading && !error && (
          <div className="product-grid">
            {products.map((product, index) => (
              <ProductCard
                key={`${product.productName}-${index}`}
                product={product}
                onSelect={setSelectedProduct}
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
              src={selectedProduct.photo}
              alt={selectedProduct.productName}
            />

            <h2 id="modal-title">{selectedProduct.productName}</h2>
            <p>{selectedProduct.descriptionShort}</p>
            <p className="modal-price">{formatPrice(selectedProduct.price)}</p>
          </section>
        </div>
      )}
    </main>
  );
}

export default App;
