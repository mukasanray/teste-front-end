import {
  CreditCard,
  CrownSimple,
  Heart,
  MagnifyingGlass,
  ShieldCheck,
  ShoppingCart,
  Truck,
  UserCircle,
} from "@phosphor-icons/react";
import logo from "../../assets/Logo.png";
import "./Header.scss";

const categories = [
  "Todas Categorias",
  "Supermercado",
  "Livros",
  "Moda",
  "Lançamentos",
];

export default function Header() {
  return (
    <header className="header">
      <div className="header__top">
        <ul className="header__benefits">
          <li className="header__benefit header__benefit--muted">
            <ShieldCheck size={20} />
            <span>Compra 100% segura</span>
          </li>

          <li className="header__benefit">
            <Truck size={20} />
            <span>Frete grátis acima de R$ 200</span>
          </li>

          <li className="header__benefit">
            <CreditCard size={20} />
            <span>Parcele suas compras</span>
          </li>
        </ul>
      </div>

      <div className="header__main">
        <div className="header__container header__row">
          <a href="/" aria-label="Página inicial">
            <img className="header__logo" src={logo} alt="Econverse" />
          </a>

          <form
            className="header__search"
            role="search"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              type="search"
              placeholder="O que você está buscando?"
              aria-label="Buscar produtos"
            />

            <button type="submit" aria-label="Buscar">
              <MagnifyingGlass size={28} />
            </button>
          </form>

          <div className="header__actions">
            <button type="button" aria-label="Favoritos">
              <Heart size={32} />
            </button>

            <button type="button" aria-label="Minha conta">
              <UserCircle size={32} />
            </button>

            <button type="button" aria-label="Carrinho">
              <ShoppingCart size={32} />
            </button>
          </div>
        </div>
      </div>

      <nav className="header__nav" aria-label="Categorias">
        <ul className="header__nav-list">
          {categories.map((category) => (
            <li key={category}>
              <a href="#">{category}</a>
            </li>
          ))}

          <li>
            <a href="#" className="is-active">
              Ofertas do dia
            </a>
          </li>

          <li>
            <a href="#" className="header__subscription">
              <CrownSimple size={20} />
              <span>Assinatura</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
