import { useState, useEffect } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Inter:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --coral:       #FF4757;
    --coral-dark:  #E63946;
    --coral-pale:  rgba(255,71,87,0.08);
    --blue:        #1E90FF;
    --blue-dark:   #1478E0;
    --blue-pale:   rgba(30,144,255,0.08);
    --yellow:      #FFD700;
    --yellow-dark: #F5C800;
    --green:       #2ED573;
    --green-dark:  #20C060;
    --purple:      #7B2FBE;
    --orange:      #FF6B35;
    --ink:         #1A1A2E;
    --white:       #FFFFFF;
    --off-white:   #F8F9FF;
    --light:       #F1F3FF;
    --muted:       #6B7280;
    --border:      #E5E7EB;
    --font-head:   'Nunito', sans-serif;
    --font-body:   'Inter', sans-serif;
    --radius:      16px;
    --radius-sm:   10px;
    --shadow:      0 4px 20px rgba(26,26,46,0.08);
    --shadow-lg:   0 12px 40px rgba(26,26,46,0.14);
  }

  html { scroll-behavior: smooth; }
  body { font-family: var(--font-body); background: var(--off-white); color: var(--ink); line-height: 1.6; overflow-x: hidden; }

  /* NAV */
  .nav {
    position: sticky; top: 0; width: 100%; z-index: 100;
    background: var(--white);
    box-shadow: 0 1px 0 var(--border);
    padding: 0 4rem;
  }
  .nav__inner {
    display: flex; align-items: center; justify-content: space-between;
    max-width: 1200px; margin: 0 auto; height: 72px;
  }
  .nav__logo {
    font-family: var(--font-head); font-size: 1.6rem; font-weight: 900;
    color: var(--ink); text-decoration: none; letter-spacing: -0.02em;
  }
  .nav__logo span { color: var(--coral); }
  .nav__search {
    flex: 1; max-width: 480px; margin: 0 2rem;
    display: flex; align-items: center;
    background: var(--light); border-radius: 50px;
    padding: 0.6rem 1.25rem; gap: 0.5rem;
    border: 2px solid transparent; transition: border-color 0.2s;
  }
  .nav__search:focus-within { border-color: var(--blue); background: var(--white); }
  .nav__search input {
    flex: 1; border: none; outline: none; background: none;
    font-family: var(--font-body); font-size: 0.875rem; color: var(--ink);
  }
  .nav__search input::placeholder { color: var(--muted); }
  .nav__search-icon { color: var(--muted); font-size: 1rem; }
  .nav__actions { display: flex; align-items: center; gap: 1rem; }
  .nav__action-btn {
    position: relative; background: none; border: none;
    font-size: 1.3rem; cursor: pointer; padding: 0.5rem;
    border-radius: var(--radius-sm); transition: background 0.2s;
    color: var(--ink);
  }
  .nav__action-btn:hover { background: var(--light); }
  .nav__badge {
    position: absolute; top: 0; right: 0;
    background: var(--coral); color: var(--white);
    font-size: 0.6rem; font-weight: 800; font-family: var(--font-head);
    width: 18px; height: 18px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
  }
  .nav__links { display: flex; gap: 0.25rem; list-style: none; }
  .nav__links a {
    color: var(--muted); text-decoration: none;
    font-size: 0.82rem; font-weight: 500;
    padding: 0.4rem 0.75rem; border-radius: var(--radius-sm);
    transition: all 0.2s;
  }
  .nav__links a:hover { color: var(--ink); background: var(--light); }
  .nav__links a.nav-active { color: var(--coral); background: var(--coral-pale); }

  /* HAMBURGER */
  .nav__hamburger {
    display: none; flex-direction: column; gap: 5px;
    background: none; border: none; cursor: pointer; padding: 4px; z-index: 200;
  }
  .nav__hamburger span {
    display: block; width: 24px; height: 2px;
    background: var(--ink); border-radius: 2px; transition: all 0.3s;
  }
  .nav__hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .nav__hamburger.open span:nth-child(2) { opacity: 0; }
  .nav__hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  .nav__mobile-menu {
    display: none; position: fixed; inset: 0;
    background: var(--white); z-index: 150;
    flex-direction: column; align-items: center; justify-content: center; gap: 2rem;
  }
  .nav__mobile-menu.open { display: flex; }
  .nav__mobile-menu a {
    color: var(--ink); font-size: 1.8rem;
    font-family: var(--font-head); font-weight: 800;
    text-decoration: none; transition: color 0.2s;
  }
  .nav__mobile-menu a:hover { color: var(--coral); }
  .nav__mobile-menu .nav__mobile-cta {
    margin-top: 1rem; background: var(--coral); color: var(--white);
    padding: 0.875rem 2.5rem; border-radius: 50px;
    font-size: 1rem; font-weight: 800; font-family: var(--font-head);
  }

  /* HERO */
  .hero {
    background: linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%);
    padding: 4rem;
    overflow: hidden; position: relative;
  }
  .hero__inner {
    max-width: 1200px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;
  }
  .hero__badge {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: rgba(255,215,0,0.15); border: 1px solid rgba(255,215,0,0.3);
    color: var(--yellow); font-size: 0.78rem; font-weight: 700;
    padding: 0.4rem 1rem; border-radius: 50px; margin-bottom: 1.5rem;
    font-family: var(--font-head); letter-spacing: 0.04em;
  }
  .hero__title {
    font-family: var(--font-head); font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 900; color: var(--white); line-height: 1.05;
    letter-spacing: -0.02em; margin-bottom: 1.25rem;
  }
  .hero__title span { color: var(--coral); }
  .hero__sub { color: rgba(255,255,255,0.65); font-size: 1rem; font-weight: 300; margin-bottom: 2.5rem; line-height: 1.75; max-width: 420px; }
  .hero__btns { display: flex; gap: 1rem; flex-wrap: wrap; }
  .btn-coral {
    background: var(--coral); color: var(--white);
    padding: 0.875rem 2rem; border-radius: 50px;
    font-family: var(--font-head); font-size: 0.9rem; font-weight: 800;
    text-decoration: none; border: none; cursor: pointer;
    transition: all 0.2s; display: inline-block;
    box-shadow: 0 4px 20px rgba(255,71,87,0.4);
  }
  .btn-coral:hover { background: var(--coral-dark); transform: translateY(-2px); }
  .btn-outline-white {
    background: transparent; color: var(--white);
    padding: 0.875rem 2rem; border-radius: 50px;
    font-family: var(--font-head); font-size: 0.9rem; font-weight: 700;
    text-decoration: none; border: 1px solid rgba(255,255,255,0.3); cursor: pointer;
    transition: all 0.2s; display: inline-block;
  }
  .btn-outline-white:hover { border-color: var(--yellow); color: var(--yellow); }
  .hero__stats { display: flex; gap: 2rem; margin-top: 2.5rem; }
  .hero__stat-num { font-family: var(--font-head); font-size: 1.6rem; font-weight: 900; color: var(--yellow); line-height: 1; }
  .hero__stat-label { font-size: 0.72rem; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.08em; }
  .hero__img-wrap {
    position: relative; display: flex; align-items: center; justify-content: center;
  }
  .hero__img { width: 100%; max-width: 480px; height: 400px; object-fit: cover; border-radius: var(--radius); box-shadow: var(--shadow-lg); display: block; }
  .hero__promo-card {
    position: absolute; bottom: -1rem; left: -1.5rem;
    background: var(--white); border-radius: var(--radius);
    padding: 1rem 1.25rem; box-shadow: var(--shadow-lg);
    display: flex; align-items: center; gap: 0.75rem;
  }
  .hero__promo-icon { font-size: 1.75rem; }
  .hero__promo-title { font-family: var(--font-head); font-weight: 800; font-size: 0.9rem; color: var(--ink); }
  .hero__promo-sub { font-size: 0.72rem; color: var(--muted); }

  /* ANNOUNCEMENT BAR */
  .announcement {
    background: linear-gradient(90deg, var(--coral), var(--purple), var(--blue));
    color: var(--white); text-align: center; padding: 0.6rem 1rem;
    font-family: var(--font-head); font-size: 0.82rem; font-weight: 700;
    letter-spacing: 0.04em;
  }

  /* SECTIONS */
  .section { padding: 5rem 4rem; }
  .section-inner { max-width: 1200px; margin: 0 auto; }

  .section-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2.5rem; flex-wrap: wrap; gap: 1rem; }
  .section-eyebrow { display: inline-block; background: var(--coral-pale); color: var(--coral); font-size: 0.72rem; font-weight: 700; padding: 0.3rem 0.85rem; border-radius: 50px; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 0.5rem; font-family: var(--font-head); }
  .section-title { font-family: var(--font-head); font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 900; color: var(--ink); letter-spacing: -0.02em; }
  .section-link { font-size: 0.82rem; font-weight: 700; color: var(--blue); text-decoration: none; font-family: var(--font-head); transition: color 0.2s; }
  .section-link:hover { color: var(--blue-dark); }

  /* CATEGORIES */
  .categories-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 1rem; }
  .category-card {
    border-radius: var(--radius); padding: 1.5rem 1rem;
    text-align: center; cursor: pointer; text-decoration: none;
    transition: transform 0.2s, box-shadow 0.2s;
    display: block;
  }
  .category-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
  .category-card__icon { font-size: 2.5rem; margin-bottom: 0.75rem; display: block; }
  .category-card__name { font-family: var(--font-head); font-size: 0.875rem; font-weight: 800; color: var(--white); }
  .cat-fashion { background: linear-gradient(135deg, #FF4757, #FF6B9D); }
  .cat-electronics { background: linear-gradient(135deg, #1E90FF, #00D2FF); }
  .cat-home { background: linear-gradient(135deg, #FF6B35, #FFD700); }
  .cat-beauty { background: linear-gradient(135deg, #7B2FBE, #E040FB); }
  .cat-sports { background: linear-gradient(135deg, #2ED573, #00B4DB); }
  .cat-toys { background: linear-gradient(135deg, #FFD700, #FF6B35); }

  /* PRODUCTS */
  .products-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
  .product-card {
    background: var(--white); border-radius: var(--radius);
    overflow: hidden; box-shadow: var(--shadow);
    transition: transform 0.25s, box-shadow 0.25s;
    position: relative;
  }
  .product-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
  .product-card__img-wrap { position: relative; overflow: hidden; }
  .product-card__img { width: 100%; height: 220px; object-fit: cover; display: block; transition: transform 0.5s; }
  .product-card:hover .product-card__img { transform: scale(1.05); }
  .product-card__badge {
    position: absolute; top: 0.75rem; left: 0.75rem;
    font-family: var(--font-head); font-size: 0.68rem; font-weight: 800;
    padding: 0.25rem 0.65rem; border-radius: 50px;
    letter-spacing: 0.04em; text-transform: uppercase;
  }
  .badge-sale { background: var(--coral); color: var(--white); }
  .badge-new { background: var(--green); color: var(--white); }
  .badge-hot { background: var(--yellow); color: var(--ink); }
  .product-card__wishlist {
    position: absolute; top: 0.75rem; right: 0.75rem;
    background: var(--white); border: none; border-radius: 50%;
    width: 34px; height: 34px; display: flex; align-items: center;
    justify-content: center; font-size: 1rem; cursor: pointer;
    box-shadow: var(--shadow); transition: all 0.2s;
  }
  .product-card__wishlist:hover { background: var(--coral); color: var(--white); }
  .product-card__body { padding: 1.25rem; }
  .product-card__category { font-size: 0.68rem; color: var(--muted); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 0.35rem; }
  .product-card__name { font-family: var(--font-head); font-size: 0.95rem; font-weight: 800; color: var(--ink); margin-bottom: 0.4rem; line-height: 1.3; }
  .product-card__rating { display: flex; align-items: center; gap: 0.35rem; margin-bottom: 0.75rem; }
  .product-card__stars { color: var(--yellow-dark); font-size: 0.8rem; }
  .product-card__reviews { font-size: 0.72rem; color: var(--muted); }
  .product-card__price-row { display: flex; align-items: center; justify-content: space-between; }
  .product-card__price { font-family: var(--font-head); font-size: 1.2rem; font-weight: 900; color: var(--coral); }
  .product-card__original { font-size: 0.82rem; color: var(--muted); text-decoration: line-through; margin-left: 0.35rem; }
  .product-card__cart {
    background: var(--blue); color: var(--white);
    border: none; border-radius: 50px; padding: 0.5rem 1rem;
    font-family: var(--font-head); font-size: 0.75rem; font-weight: 800;
    cursor: pointer; transition: all 0.2s;
  }
  .product-card__cart:hover { background: var(--blue-dark); transform: scale(1.05); }
  .product-card__cart.added { background: var(--green); }

  /* FLASH SALE */
  .flash-sale {
    background: linear-gradient(135deg, #1A1A2E, #16213E);
    border-radius: var(--radius); padding: 3rem;
    display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: center;
  }
  .flash-sale__eyebrow { font-size: 0.72rem; color: var(--yellow); letter-spacing: 0.14em; text-transform: uppercase; font-weight: 700; margin-bottom: 0.75rem; font-family: var(--font-head); }
  .flash-sale__title { font-family: var(--font-head); font-size: clamp(1.8rem, 3.5vw, 2.8rem); font-weight: 900; color: var(--white); margin-bottom: 0.5rem; letter-spacing: -0.02em; }
  .flash-sale__title span { color: var(--coral); }
  .flash-sale__sub { color: rgba(255,255,255,0.55); font-size: 0.9rem; margin-bottom: 2rem; }
  .countdown { display: flex; gap: 1rem; }
  .countdown-item { text-align: center; }
  .countdown-num {
    background: var(--coral); color: var(--white);
    font-family: var(--font-head); font-size: 2rem; font-weight: 900;
    width: 72px; height: 72px; border-radius: var(--radius-sm);
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 0.35rem;
  }
  .countdown-label { font-size: 0.65rem; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.1em; }
  .flash-products { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
  .flash-product {
    background: rgba(255,255,255,0.06); border-radius: var(--radius-sm);
    padding: 1rem; display: flex; gap: 1rem; align-items: center;
    border: 1px solid rgba(255,255,255,0.08); transition: border-color 0.2s;
  }
  .flash-product:hover { border-color: rgba(255,71,87,0.4); }
  .flash-product__img { width: 64px; height: 64px; object-fit: cover; border-radius: var(--radius-sm); flex-shrink: 0; }
  .flash-product__name { font-family: var(--font-head); font-size: 0.82rem; font-weight: 800; color: var(--white); margin-bottom: 0.2rem; }
  .flash-product__price { font-family: var(--font-head); font-size: 1rem; font-weight: 900; color: var(--coral); }
  .flash-product__original { font-size: 0.72rem; color: rgba(255,255,255,0.35); text-decoration: line-through; }
  .flash-product__discount { font-size: 0.65rem; background: var(--yellow); color: var(--ink); font-weight: 800; padding: 0.15rem 0.45rem; border-radius: 50px; font-family: var(--font-head); }

  /* BRANDS */
  .brands-row { display: flex; gap: 2rem; align-items: center; justify-content: center; flex-wrap: wrap; }
  .brand-item {
    background: var(--white); border-radius: var(--radius-sm);
    padding: 1.25rem 2rem; box-shadow: var(--shadow);
    font-family: var(--font-head); font-size: 1.1rem; font-weight: 900;
    color: var(--muted); letter-spacing: -0.02em;
    transition: all 0.2s; cursor: pointer;
  }
  .brand-item:hover { color: var(--ink); transform: translateY(-2px); box-shadow: var(--shadow-lg); }

  /* FEATURES */
  .features-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
  .feature-card {
    background: var(--white); border-radius: var(--radius);
    padding: 2rem; text-align: center; box-shadow: var(--shadow);
    transition: transform 0.2s;
  }
  .feature-card:hover { transform: translateY(-3px); }
  .feature-card__icon { font-size: 2.5rem; margin-bottom: 1rem; display: block; }
  .feature-card__title { font-family: var(--font-head); font-size: 0.95rem; font-weight: 800; color: var(--ink); margin-bottom: 0.35rem; }
  .feature-card__desc { font-size: 0.8rem; color: var(--muted); line-height: 1.65; }

  /* TESTIMONIALS */
  .testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
  .testi-card {
    background: var(--white); border-radius: var(--radius);
    padding: 2rem; box-shadow: var(--shadow);
    transition: transform 0.2s;
  }
  .testi-card:hover { transform: translateY(-3px); }
  .testi-card__stars { color: var(--yellow-dark); font-size: 0.9rem; margin-bottom: 1rem; }
  .testi-card__text { font-size: 0.875rem; color: var(--muted); line-height: 1.75; margin-bottom: 1.25rem; font-style: italic; }
  .testi-card__author { display: flex; align-items: center; gap: 0.75rem; }
  .testi-card__avatar { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; }
  .testi-card__name { font-family: var(--font-head); font-size: 0.9rem; font-weight: 800; color: var(--ink); }
  .testi-card__detail { font-size: 0.72rem; color: var(--muted); }

  /* NEWSLETTER */
  .newsletter {
    background: linear-gradient(135deg, var(--coral), var(--purple));
    border-radius: var(--radius); padding: 4rem 3rem; text-align: center;
  }
  .newsletter__title { font-family: var(--font-head); font-size: clamp(1.8rem, 3vw, 2.5rem); font-weight: 900; color: var(--white); margin-bottom: 0.75rem; letter-spacing: -0.02em; }
  .newsletter__sub { color: rgba(255,255,255,0.75); font-size: 0.95rem; margin-bottom: 2rem; }
  .newsletter__form { display: flex; gap: 0.75rem; max-width: 480px; margin: 0 auto; }
  .newsletter__input {
    flex: 1; background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3);
    color: var(--white); border-radius: 50px; padding: 0.875rem 1.5rem;
    font-family: var(--font-body); font-size: 0.9rem; outline: none;
    transition: border-color 0.2s;
  }
  .newsletter__input::placeholder { color: rgba(255,255,255,0.6); }
  .newsletter__input:focus { border-color: var(--yellow); }
  .newsletter__btn {
    background: var(--yellow); color: var(--ink);
    border: none; border-radius: 50px; padding: 0.875rem 1.75rem;
    font-family: var(--font-head); font-size: 0.875rem; font-weight: 900;
    cursor: pointer; transition: all 0.2s; white-space: nowrap;
  }
  .newsletter__btn:hover { background: var(--yellow-dark); transform: scale(1.03); }

  /* FOOTER */
  .footer { background: var(--ink); padding: 4rem 4rem 2rem; }
  .footer__grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; max-width: 1200px; margin: 0 auto 3rem; }
  .footer__logo { font-family: var(--font-head); font-size: 1.6rem; font-weight: 900; color: var(--white); display: block; margin-bottom: 0.75rem; text-decoration: none; letter-spacing: -0.02em; }
  .footer__logo span { color: var(--coral); }
  .footer__about { color: #4B5563; font-size: 0.875rem; line-height: 1.75; max-width: 260px; margin-bottom: 1.5rem; }
  .footer__social { display: flex; gap: 0.75rem; }
  .footer__social a {
    width: 38px; height: 38px; border-radius: 50%;
    background: rgba(255,255,255,0.06); color: #6B7280;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.8rem; font-weight: 800; text-decoration: none; transition: all 0.2s;
    font-family: var(--font-head);
  }
  .footer__social a:hover { background: var(--coral); color: var(--white); }
  .footer__heading { font-family: var(--font-head); font-size: 0.875rem; font-weight: 900; color: var(--white); margin-bottom: 1.25rem; letter-spacing: 0.02em; }
  .footer__links { list-style: none; display: flex; flex-direction: column; gap: 0.6rem; }
  .footer__links a { color: #4B5563; font-size: 0.875rem; text-decoration: none; transition: color 0.2s; }
  .footer__links a:hover { color: var(--coral); }
  .footer__bottom { max-width: 1200px; margin: 0 auto; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.06); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem; }
  .footer__copy { color: #374151; font-size: 0.78rem; }
  .footer__payments { display: flex; gap: 0.5rem; }
  .footer__payment { background: rgba(255,255,255,0.08); color: #6B7280; font-size: 0.68rem; font-weight: 700; padding: 0.3rem 0.6rem; border-radius: 4px; font-family: var(--font-head); }

  @media (max-width: 1024px) {
    .nav { padding: 0 1.5rem; }
    .nav__links, .nav__search { display: none; }
    .nav__hamburger { display: flex !important; }
    .hero { padding: 3rem 1.5rem; }
    .hero__inner { grid-template-columns: 1fr; }
    .hero__img-wrap { display: none; }
    .section { padding: 3.5rem 1.5rem; }
    .categories-grid { grid-template-columns: repeat(3, 1fr); }
    .products-grid { grid-template-columns: repeat(2, 1fr); }
    .flash-sale { grid-template-columns: 1fr; gap: 2rem; }
    .features-grid { grid-template-columns: repeat(2, 1fr); }
    .testi-grid { grid-template-columns: 1fr; }
    .footer__grid { grid-template-columns: 1fr 1fr; }
    .footer { padding: 3rem 1.5rem 1.5rem; }
    .footer__bottom { flex-direction: column; }
    .newsletter__form { flex-direction: column; }
  }

  @media (max-width: 640px) {
    .categories-grid { grid-template-columns: repeat(2, 1fr); }
    .products-grid { grid-template-columns: 1fr; }
    .flash-products { grid-template-columns: 1fr; }
    .features-grid { grid-template-columns: 1fr; }
    .footer__grid { grid-template-columns: 1fr; }
  }
`;

const categories = [
  { icon: "👗", name: "Fashion", class: "cat-fashion" },
  { icon: "📱", name: "Electronics", class: "cat-electronics" },
  { icon: "🏠", name: "Home & Living", class: "cat-home" },
  { icon: "💄", name: "Beauty", class: "cat-beauty" },
  { icon: "⚽", name: "Sports", class: "cat-sports" },
  { icon: "🧸", name: "Toys & Kids", class: "cat-toys" },
];

const products = [
  { name: "Premium Wireless Headphones", category: "Electronics", price: "$89", original: "$129", rating: "4.8", reviews: "2.4k", badge: "sale", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80" },
  { name: "Casual Linen Summer Dress", category: "Fashion", price: "$45", original: "$65", rating: "4.9", reviews: "1.8k", badge: "hot", img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&q=80" },
  { name: "Minimalist Desk Lamp", category: "Home", price: "$35", original: null, rating: "4.7", reviews: "892", badge: "new", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { name: "Vitamin C Glow Serum", category: "Beauty", price: "$28", original: "$45", rating: "4.9", reviews: "3.2k", badge: "sale", img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80" },
  { name: "Running Sneakers Pro", category: "Sports", price: "$120", original: "$160", rating: "4.8", reviews: "956", badge: "hot", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80" },
  { name: "Ceramic Coffee Mug Set", category: "Home", price: "$22", original: null, rating: "4.6", reviews: "445", badge: "new", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80" },
  { name: "Oversized Knit Sweater", category: "Fashion", price: "$55", original: "$80", rating: "4.7", reviews: "1.1k", badge: "sale", img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80" },
  { name: "Smart Fitness Tracker", category: "Electronics", price: "$65", original: "$95", rating: "4.8", reviews: "2.1k", badge: "hot", img: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&q=80" },
];

const flashProducts = [
  { name: "AirPods Pro", price: "$149", original: "$249", discount: "-40%", img: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=200&q=80" },
  { name: "Silk Slip Dress", price: "$39", original: "$89", discount: "-56%", img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=200&q=80" },
  { name: "Face Mask Kit", price: "$18", original: "$35", discount: "-49%", img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=200&q=80" },
  { name: "Yoga Mat Premium", price: "$25", original: "$55", discount: "-55%", img: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=200&q=80" },
];

const testimonials = [
  { text: "Amazing quality and super fast shipping! The dress looks even better in person. Will definitely shop here again!", name: "Sarah Johnson", detail: "Verified Buyer · Fashion", stars: "★★★★★", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80" },
  { text: "The headphones sound incredible and arrived in perfect condition. Great packaging too. 10/10 recommend!", name: "Mike Chen", detail: "Verified Buyer · Electronics", stars: "★★★★★", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" },
  { text: "Customer service was outstanding when I had a question about my order. The serum has transformed my skin!", name: "Emma Davis", detail: "Verified Buyer · Beauty", stars: "★★★★★", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" },
];

const features = [
  { icon: "🚚", title: "Free Shipping", desc: "Free delivery on all orders over $50. Fast and reliable worldwide." },
  { icon: "↩️", title: "Easy Returns", desc: "30-day hassle-free returns. No questions asked." },
  { icon: "🔒", title: "Secure Payments", desc: "Your payment info is always protected with bank-level security." },
  { icon: "🎧", title: "24/7 Support", desc: "Our friendly team is always here to help you anytime." },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [cartCount, setCartCount] = useState(0);
  const [addedProducts, setAddedProducts] = useState({});
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [countdown, setCountdown] = useState({ h: 5, m: 42, s: 17 });

  useEffect(() => {
    const sections = ["home", "categories", "products", "contact"];
    const handleScroll = () => {
      if (window.scrollY > 60) setMenuOpen(false);
      const scrollY = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollY) { setActiveSection(sections[i]); break; }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 5; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = (i) => {
    setCartCount(c => c + 1);
    setAddedProducts(prev => ({ ...prev, [i]: true }));
    setTimeout(() => setAddedProducts(prev => ({ ...prev, [i]: false })), 1500);
  };

  const pad = (n) => String(n).padStart(2, "0");
  const isActive = (s) => activeSection === s ? "nav-active" : "";

  return (
    <>
      <style>{styles}</style>

      {/* ANNOUNCEMENT */}
      <div className="announcement">
        🎉 MEGA SALE — Up to 70% OFF Everything! Free shipping on orders over $50 · Use code: SAVE20
      </div>

      {/* NAV */}
      <nav className="nav">
        <div className="nav__inner">
          <a href="#home" className="nav__logo">Shop<span>Bolt</span></a>
          <div className="nav__search">
            <span className="nav__search-icon">🔍</span>
            <input type="text" placeholder="Search for products, brands..." />
          </div>
          <ul className="nav__links">
            <li><a href="#categories" className={isActive("categories")}>Categories</a></li>
            <li><a href="#products" className={isActive("products")}>Products</a></li>
            <li><a href="#contact" className={isActive("contact")}>Deals</a></li>
          </ul>
          <div className="nav__actions">
            <button className="nav__action-btn">👤</button>
            <button className="nav__action-btn">❤️</button>
            <button className="nav__action-btn">
              🛒
              {cartCount > 0 && <span className="nav__badge">{cartCount}</span>}
            </button>
            <button className={`nav__hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>
      <div className={`nav__mobile-menu ${menuOpen ? "open" : ""}`}>
        <a href="#categories" onClick={() => setMenuOpen(false)}>Categories</a>
        <a href="#products" onClick={() => setMenuOpen(false)}>Products</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Deals</a>
        <a href="#contact" className="nav__mobile-cta" onClick={() => setMenuOpen(false)}>Shop Now</a>
      </div>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="hero__inner">
          <div>
            <div className="hero__badge">🔥 Biggest Sale of the Year</div>
            <h1 className="hero__title">
              Shop Smart,<br />Save <span>Big</span>,<br />Live Better
            </h1>
            <p className="hero__sub">Discover thousands of products across fashion, electronics, beauty, home, and more — all at unbeatable prices with fast delivery.</p>
            <div className="hero__btns">
              <a href="#products" className="btn-coral">Shop Now →</a>
              <a href="#categories" className="btn-outline-white">Browse Categories</a>
            </div>
            <div className="hero__stats">
              {[
                { num: "50K+", label: "Products" },
                { num: "200K+", label: "Happy Buyers" },
                { num: "4.9★", label: "Rating" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="hero__stat-num">{s.num}</div>
                  <div className="hero__stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="hero__img-wrap">
            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=85"
              alt="Shopping"
              className="hero__img"
            />
            <div className="hero__promo-card">
              <div className="hero__promo-icon">📦</div>
              <div>
                <div className="hero__promo-title">Free Delivery</div>
                <div className="hero__promo-sub">On orders over $50</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="section">
        <div className="section-inner">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">Browse By</span>
              <h2 className="section-title">Top Categories</h2>
            </div>
            <a href="#products" className="section-link">View All →</a>
          </div>
          <div className="categories-grid">
            {categories.map((c, i) => (
              <a href="#products" className={`category-card ${c.class}`} key={i}>
                <span className="category-card__icon">{c.icon}</span>
                <span className="category-card__name">{c.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section id="products" className="section" style={{ background: "var(--light)" }}>
        <div className="section-inner">
          <div className="section-header">
            <div>
              <span className="section-eyebrow">Hand-Picked</span>
              <h2 className="section-title">Featured Products</h2>
            </div>
            <a href="#categories" className="section-link">View All Products →</a>
          </div>
          <div className="products-grid">
            {products.map((p, i) => (
              <div className="product-card" key={i}>
                <div className="product-card__img-wrap">
                  <img src={p.img} alt={p.name} className="product-card__img" loading="lazy" />
                  <span className={`product-card__badge badge-${p.badge}`}>
                    {p.badge === "sale" ? "SALE" : p.badge === "new" ? "NEW" : "🔥 HOT"}
                  </span>
                  <button className="product-card__wishlist">♡</button>
                </div>
                <div className="product-card__body">
                  <div className="product-card__category">{p.category}</div>
                  <div className="product-card__name">{p.name}</div>
                  <div className="product-card__rating">
                    <span className="product-card__stars">★★★★★</span>
                    <span className="product-card__reviews">({p.reviews})</span>
                  </div>
                  <div className="product-card__price-row">
                    <div>
                      <span className="product-card__price">{p.price}</span>
                      {p.original && <span className="product-card__original">{p.original}</span>}
                    </div>
                    <button
                      className={`product-card__cart ${addedProducts[i] ? "added" : ""}`}
                      onClick={() => handleAddToCart(i)}
                    >
                      {addedProducts[i] ? "✓ Added" : "+ Cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLASH SALE */}
      <section id="contact" className="section">
        <div className="section-inner">
          <div className="flash-sale">
            <div>
              <div className="flash-sale__eyebrow">⚡ Flash Sale — Limited Time</div>
              <h2 className="flash-sale__title">Up to <span>70% OFF</span><br />Today Only!</h2>
              <p className="flash-sale__sub">Hurry! These deals won't last. Add to cart before time runs out.</p>
              <div className="countdown">
                {[
                  { val: pad(countdown.h), label: "Hours" },
                  { val: pad(countdown.m), label: "Mins" },
                  { val: pad(countdown.s), label: "Secs" },
                ].map((c, i) => (
                  <div className="countdown-item" key={i}>
                    <div className="countdown-num">{c.val}</div>
                    <div className="countdown-label">{c.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flash-products">
              {flashProducts.map((p, i) => (
                <div className="flash-product" key={i}>
                  <img src={p.img} alt={p.name} className="flash-product__img" loading="lazy" />
                  <div>
                    <div className="flash-product__name">{p.name}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", margin: "0.2rem 0" }}>
                      <span className="flash-product__price">{p.price}</span>
                      <span className="flash-product__original">{p.original}</span>
                    </div>
                    <span className="flash-product__discount">{p.discount}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section" style={{ background: "var(--light)" }}>
        <div className="section-inner">
          <div className="features-grid">
            {features.map((f, i) => (
              <div className="feature-card" key={i}>
                <span className="feature-card__icon">{f.icon}</span>
                <h4 className="feature-card__title">{f.title}</h4>
                <p className="feature-card__desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="section">
        <div className="section-inner">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="section-eyebrow">Trusted By</span>
            <h2 className="section-title">Our Brands</h2>
          </div>
          <div className="brands-row">
            {["ZARA", "SONY", "NIKE", "L'ORÉAL", "IKEA", "APPLE", "SAMSUNG", "UNIQLO"].map((b, i) => (
              <div className="brand-item" key={i}>{b}</div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" style={{ background: "var(--light)" }}>
        <div className="section-inner">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span className="section-eyebrow">Happy Shoppers</span>
            <h2 className="section-title">What Buyers Say ❤️</h2>
          </div>
          <div className="testi-grid">
            {testimonials.map((t, i) => (
              <div className="testi-card" key={i}>
                <div className="testi-card__stars">{t.stars}</div>
                <p className="testi-card__text">"{t.text}"</p>
                <div className="testi-card__author">
                  <img src={t.avatar} alt={t.name} className="testi-card__avatar" />
                  <div>
                    <div className="testi-card__name">{t.name}</div>
                    <div className="testi-card__detail">{t.detail}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="section">
        <div className="section-inner">
          <div className="newsletter">
            <h2 className="newsletter__title">Get Exclusive Deals! 🎁</h2>
            <p className="newsletter__sub">Subscribe and be the first to know about flash sales, new arrivals, and special promos.</p>
            {subscribed ? (
              <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: "50px", padding: "1rem 2rem", display: "inline-block", color: "var(--white)", fontFamily: "var(--font-head)", fontWeight: "800", fontSize: "1rem" }}>
                🎉 You're subscribed! Watch your inbox for deals.
              </div>
            ) : (
              <form className="newsletter__form" onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }}>
                <input className="newsletter__input" type="email" placeholder="Enter your email address" value={email} onChange={e => setEmail(e.target.value)} required />
                <button type="submit" className="newsletter__btn">Subscribe 🚀</button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer__grid">
          <div>
            <a href="#home" className="footer__logo">Shop<span>Bolt</span></a>
            <p className="footer__about">Your one-stop shop for fashion, electronics, beauty, home, and more. Fast shipping, easy returns, and unbeatable prices.</p>
            <div className="footer__social">
              <a href="#">f</a>
              <a href="#">ig</a>
              <a href="#">tw</a>
              <a href="#">yt</a>
            </div>
          </div>
          <div>
            <h6 className="footer__heading">Shop</h6>
            <ul className="footer__links">
              <li><a href="#categories">Fashion</a></li>
              <li><a href="#categories">Electronics</a></li>
              <li><a href="#categories">Home & Living</a></li>
              <li><a href="#categories">Beauty</a></li>
              <li><a href="#categories">Sports</a></li>
            </ul>
          </div>
          <div>
            <h6 className="footer__heading">Support</h6>
            <ul className="footer__links">
              <li><a href="#contact">Track Order</a></li>
              <li><a href="#contact">Returns</a></li>
              <li><a href="#contact">FAQs</a></li>
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#contact">Live Chat</a></li>
            </ul>
          </div>
          <div>
            <h6 className="footer__heading">Company</h6>
            <ul className="footer__links">
              <li><a href="#home">About Us</a></li>
              <li><a href="#home">Careers</a></li>
              <li><a href="#home">Press</a></li>
              <li><a href="#home">Privacy Policy</a></li>
              <li><a href="#home">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p className="footer__copy">© {new Date().getFullYear()} ShopBolt. All rights reserved.</p>
          <div className="footer__payments">
            {["VISA", "MC", "AMEX", "PayPal", "GCash"].map((p, i) => (
              <span key={i} className="footer__payment">{p}</span>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
