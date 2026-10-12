import type { Product } from "../../types/Product";
import "./ProductCard.scss";

const brl = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

type Props = {
  product: Product;
  onSelect: (product: Product) => void;
};

export default function ProductCard({ product, onSelect }: Props) {
  return (
    <article className="card">
      <img
        className="card__img"
        src={product.photo}
        alt={product.productName}
        loading="lazy"
      />

      <h3 className="card__name">{product.productName}</h3>
      <p className="card__description">{product.descriptionShort}</p>

      <strong className="card__price">{brl(product.price)}</strong>
      <p className="card__installments">
        ou 2x de {brl(product.price / 2)} sem juros
      </p>
      <span className="card__shipping">Frete grátis</span>

      <button
        type="button"
        className="card__buy"
        onClick={() => onSelect(product)}
      >
        Comprar
      </button>
    </article>
  );
}
