import type { Product } from "../../types/Product";
import "./ProductCard.scss";

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const productName =
    product.productName ?? product["nome do produto"] ?? "Produto";

  const formattedPrice = product["Preço"].toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <article className="product-card">
      <button
        className="product-card__button"
        type="button"
        onClick={() => onClick(product)}
        aria-label={`Ver detalhes de ${productName}`}
      >
        <img
          className="product-card__image"
          src={product.foto}
          alt={productName}
          loading="lazy"
        />

        <h2 className="product-card__title">{productName}</h2>

        <p className="product-card__description">
          {product.descriptionShort}
        </p>

        <p className="product-card__price">{formattedPrice}</p>

        <span className="product-card__action">Ver detalhes</span>
      </button>
    </article>
  );
}