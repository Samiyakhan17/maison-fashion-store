
import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  Search,
  ShoppingBag,
  Menu,
  X,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "The Everyday Shirt",
    category: "Clothing",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 2,
    name: "Minimal Leather Bag",
    category: "Accessories",
    price: 2299,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 3,
    name: "Everyday Sneakers",
    category: "Footwear",
    price: 2799,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 4,
    name: "Modern Sunglasses",
    category: "Accessories",
    price: 1199,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=85",
  },
];
  
function App() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("maison-cart")) || [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const closeButtonRef = useRef(null);
  const bagButtonRef = useRef(null);
  const wasCartOpenRef = useRef(false);
  useEffect(() => {
    localStorage.setItem("maison-cart", JSON.stringify(cart));
  }, [cart]);
  
useEffect(() => {
  if (!isCartOpen) return;

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      setIsCartOpen(false);
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [isCartOpen]);

useEffect(() => {
  if (!isCartOpen) return;

  const previousOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = previousOverflow;
  };
}, [isCartOpen]);
useEffect(() => {
  if (isCartOpen) {
    closeButtonRef.current?.focus();
  }
}, [isCartOpen]);

useEffect(() => {
  if (isCartOpen) {
    wasCartOpenRef.current = true;
    return;
  }

  if (wasCartOpenRef.current) {
    bagButtonRef.current?.focus();
    wasCartOpenRef.current = false;
  }
}, [isCartOpen]);




  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });

    setIsCartOpen(true);
  };

  const updateQuantity = (productId, change) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + change }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (

    <div className="store">
      <div className="announcement">
        Complimentary shipping on orders over ₹2,999
      </div>

      <header className="navbar">
        <button className="icon-button mobile-menu" aria-label="Open menu">
          <Menu size={21} />
        </button>

        <a href="#" className="logo">
          maison<span>.</span>
        </a>

        <nav className="nav-links">
          <a href="#new-arrivals">New Arrivals</a>
          <a href="#collections">Collections</a>
          <a href="#about">Our Story</a>
        </nav>

        <div className="nav-actions">
          <button className="icon-button" aria-label="Search">
            <Search size={20} />
          </button>
          
            <button
              ref={bagButtonRef}
              className="icon-button bag-button"
               aria-label={`Shopping bag, ${cartCount} items`}
                 onClick={() => setIsCartOpen(true)}
              >
              <ShoppingBag size={20} />
                 <span className="bag-count">{cartCount}</span>
              </button>   {/* What this does: The number beside the bag will show the actual number of items, 
            and clicking the bag will open the cart once we add its panel.  */}

        </div>
      </header>

      <main>
        <section className="hero" id="collections">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=90"
            alt="Contemporary fashion collection"
          />

          <div className="hero-overlay" />

          <div className="hero-content">
            <p className="eyebrow">THE NEW SEASON · 2026</p>
            <h1>Less, but<br />better.</h1>
            <p className="hero-description">
              Thoughtful essentials. Timeless design.
              <br />
              Made for the way you live.
            </p>
            <a href="#new-arrivals" className="primary-button">
              Explore collection <ArrowRight size={17} />
            </a>
          </div>

          <span className="hero-index">01 — THE EVERYDAY EDIT</span>
        </section>

        <section className="intro-section" id="about">
          <p className="eyebrow">A MORE CONSIDERED WARDROBE</p>
          <h2>
            Everyday pieces,
            <br />
            <span>extraordinary simplicity.</span>
          </h2>
          <p>
            We believe great style isn't about having more.
            It's about choosing better.
          </p>
        </section>

        <section className="products-section" id="new-arrivals">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CURATED FOR YOU</p>
              <h2>New arrivals</h2>
            </div>
            <a href="#new-arrivals" className="text-link">
              View all <ArrowRight size={16} />
            </a>
          </div>

          <div className="product-grid">
            {products.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image-wrap">
                  <img src={product.image} alt={product.name} />
                    <button
                      className="quick-add"
                      aria-label={`Add ${product.name} to bag`}
                      onClick={() => addToCart(product)}
                    >
                    <ShoppingBag size={17} />
                   </button>
                </div>
                <p className="product-category">{product.category}</p>
                <h3>{product.name}</h3>
                <p className="product-price">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="newsletter">
          <p className="eyebrow">A NOTE FROM MAISON</p>
          <h2>Good things, occasionally.</h2>
          <p>New collections, thoughtful stories, and a little inspiration.</p>
          <form
            className="newsletter-form"
            onSubmit={(event) => {
              event.preventDefault();
              alert("Newsletter signup will be connected in a future step.");
            }}
          >
            <input
              type="email"
              placeholder="Your email address"
              aria-label="Your email address"
              required
            />
            <button type="submit" aria-label="Subscribe">
              <ArrowRight size={19} />
            </button>
          </form>
        </section>
      </main>
      
      {isCartOpen && (
        <div
          className="cart-backdrop"
          onClick={() => setIsCartOpen(false)}
        >
          <aside
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cart-header">
              <h2 id="cart-title">Your bag ({cartCount})</h2>
              <button
                 ref={closeButtonRef}
                  className="icon-button"
                  aria-label="Close cart"
                  onClick={() => setIsCartOpen(false)}
                  >
                  <X size={21} />
                  </button>
            </div>

            {cart.length === 0 ? (
              <div className="cart-empty">
                <ShoppingBag size={35} />
                <h3>Your bag is empty</h3>
                <p>Discover something you'll love.</p>
                <button
                  className="cart-continue"
                  onClick={() => setIsCartOpen(false)}
                >
                  Continue shopping
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <article className="cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />

                      <div className="cart-item-info">
                        <h3>{item.name}</h3>
                        <p>₹{item.price.toLocaleString("en-IN")}</p>

                        <div className="quantity-control">
                          <button
                            aria-label={`Decrease ${item.name} quantity`}
                            onClick={() => updateQuantity(item.id, -1)}
                          >
                            <Minus size={14} />
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            aria-label={`Increase ${item.name} quantity`}
                            onClick={() => updateQuantity(item.id, 1)}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      <button
                        className="remove-item"
                        aria-label={`Remove ${item.name}`}
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 size={17} />
                      </button>
                    </article>
                  ))}
                </div>

                <div className="cart-summary">
                  <div className="cart-subtotal">
                    <span>Subtotal</span>
                    <strong>₹{cartTotal.toLocaleString("en-IN")}</strong>
                  </div>

                  <p>Shipping and taxes calculated at checkout.</p>

                  

<button
  className="checkout-button"
onClick={() => {
  setIsCartOpen(false);
  setIsCheckoutOpen(true);
}}
>
  Continue to checkout
  <ArrowRight size={17} />
</button>


                </div>
              </>
            )}
          </aside>
        </div>
      )}
      
      {isCheckoutOpen && (
        <div className="checkout-backdrop">
          <section className="checkout-panel" aria-labelledby="checkout-title">
            <div className="cart-header">
              <h2 id="checkout-title">Checkout</h2>
              <button
                className="icon-button"
                aria-label="Close checkout"
                onClick={() => setIsCheckoutOpen(false)}
              >
                <X size={21} />
              </button>
            </div>

            <div className="checkout-order-summary">
              <h3>Order summary</h3>
              {cart.map((item) => (
                <p key={item.id}>
                  {item.name} × {item.quantity} — ₹
                  {(item.price * item.quantity).toLocaleString("en-IN")}
                </p>
              ))}
              <p>
                <strong>
                  Total: ₹{cartTotal.toLocaleString("en-IN")}
                </strong>
              </p>
            </div>

            <form
              className="checkout-form"
              onSubmit={(event) => {
                event.preventDefault();
               alert(
                     "Thank you! Your checkout details have been validated successfully. This is a demo checkout—no order has been placed and no payment has been processed."
                   );
              }}
            >
              <label>
                Full name
                <input name="name" type="text" autoComplete="name" required />
              </label>

              <label>
                Email address
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                />
              </label>

              <label>
                Shipping address
                <textarea
                  name="address"
                  autoComplete="street-address"
                  rows={3}
                  required
                />
              </label>

              <button className="checkout-button" type="submit">
                Submit checkout details
                <ArrowRight size={17} />
              </button>
            </form>
          </section>
        </div>
      )}



      <footer className="footer">
        <a href="#" className="logo">
          maison<span>.</span>
        </a>
        <p>Considered essentials for everyday living.</p>
        <p>© 2026 Maison. Designed with intention.</p>
      </footer>
    </div>
  );
}

export default App;
