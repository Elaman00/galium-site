/* =========================================================
   GALIUM — логика сайта (без зависимостей)
   Данные — из Brand Book GALIUM 2026, Kaspi.kz и Instagram @galium.kz
   ========================================================= */
'use strict';

/* =========================================================
   1. НАСТРОЙКИ — меняйте здесь
   ========================================================= */
const CONFIG = {
  // Контакты (из брендбука). Подставляются во все ссылки с data-link / data-text
  phone: '+77719905424',
  phoneText: '+7 771 990 5424',
  whatsapp: '77719905424',            // номер WhatsApp без «+»
  email: 'zhenisgaliyev@gmail.com',
  address: 'г. Алматы, р-н Жетысу, ул. Великолукская, 56',
  instagram: 'https://www.instagram.com/galium.kz/',
  threads: 'https://www.threads.net/@galium.kz',
  kaspi: 'https://kaspi.kz/shop/p/galium-00001-sinii-42-163677370/',
  map: 'https://www.google.com/maps/search/?api=1&query=%D0%90%D0%BB%D0%BC%D0%B0%D1%82%D1%8B%2C%20%D1%83%D0%BB.%20%D0%92%D0%B5%D0%BB%D0%B8%D0%BA%D0%BE%D0%BB%D1%83%D0%BA%D1%81%D0%BA%D0%B0%D1%8F%2C%2056',

  // Отправка форм. Заполните ОДИН из способов, иначе работает демо-режим.
  formspreeEndpoint: '',              // a) напр. 'https://formspree.io/f/abcdwxyz'
  telegramBotToken: '',               // b) токен бота (виден в коде страницы!)
  telegramChatId: '',                 //    id чата для заявок

  studentDiscount: 0.10,              // студентам −10% (Instagram)
  bulkDiscount: 0.10,                 // опт −10% (брендбук)
  bulkFrom: 20,                       //   от 20 единиц
  customPriceFrom: 100,               //   от 100 единиц — цена по договорённости
  installmentMonths: 3                // рассрочка Kaspi на 3 месяца
};

const IMG = 'assets/products/';

/* Цветовая палитра — из брендбука (HEX) */
const COLORS = {
  royal:  { name: 'Royal Blue',  hex: '#1D5FD6' },
  navy:   { name: 'Navy Blue',   ru: 'Темно-синий', hex: '#15213E' },
  black:  { name: 'Black',       ru: 'Черный', hex: '#1A1A1A' },
  cobalt: { name: 'Cobalt Blue', hex: '#2244AA' },
  mint:   { name: 'Mint Green',  hex: '#5FDBA0' },
  grey:   { name: 'Carbon Grey', hex: '#8D8F92' }
};

/* Буквенная размерная сетка (брендбук: XS — XXXL) */
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];
const DEFAULT_SIZE = 'M';
const LEGACY_SIZES = { 42: 'XS', 44: 'S', 46: 'M', 48: 'L', 50: 'XL', 52: 'XXL' };

/* Товары (комплект: топ + брюки, базовая цена 35 000 ₸ — брендбук).
   photos: { цвет: [фото1, фото2] } — второе фото показывается при наведении.
   fits — крой, pants — брюки на выбор (если вариант один, выбор не показывается). */
const PRODUCTS = [
  {
    id: 'aru', model: 'henley', name: 'ARU FLOW · Henley', price: 35000, tags: ['Хит'],
    desc: 'Топ с воротником-стойкой и скрытой застёжкой-планкой, брюки-джоггеры на шнуре. Есть на Kaspi.',
    feats: ['G-Flex', '4-Way Stretch', 'Воротник-стойка'],
    fits: ['Женский'], pants: ['Jogger'],
    photos: {
      black: ['aru-black-1.jpg'],
      royal: ['aru-royal-1.jpg', 'aru-royal-2.jpg'],
      navy:  ['aru-navy-1.jpg', 'aru-navy-2.jpg']
    }
  },
  {
    id: 'vneck', model: 'vneck', name: 'V-Neck', price: 35000, tags: ['Унисекс'],
    desc: 'Классическая эргономичная модель с V-вырезом и нагрудным карманом. Мужской и женский силуэт.',
    feats: ['G-Flex', 'Нагрудный карман', 'Усиленные швы'],
    fits: ['Женский', 'Мужской'], pants: ['Jogger', 'Straight'],
    photos: {
      royal:  ['vneck-royal-couple.jpg', 'vneck-royal-man.jpg'],
      navy:   ['vneck-navy-man.jpg', 'vneck-navy-1.jpg'],
      black:  ['vneck-black-man.jpg', 'vneck-black-1.jpg'],
      cobalt: ['vneck-cobalt-couple.jpg', 'vneck-cobalt-flat.jpg'],
      mint:   ['vneck-mint-collar.jpg', 'vneck-mint-pocket.jpg']
    }
  },
  {
    id: 'carbon', model: 'vneck', name: 'Carbon Grey · мужской', price: 35000, tags: ['Мужская коллекция'],
    desc: 'Мужской меланжевый костюм: дышащий меланж, 12 технических карманов, потайная молния и усиленные швы.',
    feats: ['Дышащий меланж', '12 карманов', '4-Way Stretch'],
    fits: ['Мужской'], pants: ['Jogger'],
    photos: { grey: ['carbon-grey-man.jpg', 'grey-1.jpg'] }
  }
];

/* Фото в первом экране по кнопкам цвета */
const HERO_PHOTOS = {
  royal:  { src: 'vneck-royal-couple.jpg',  model: 'V-Neck' },
  black:  { src: 'aru-black-1.jpg',         model: 'ARU FLOW · Henley' },
  navy:   { src: 'vneck-navy-man.jpg',      model: 'V-Neck' },
  cobalt: { src: 'vneck-cobalt-couple.jpg', model: 'V-Neck' },
  grey:   { src: 'carbon-grey-man.jpg',     model: 'Carbon Grey' },
  mint:   { src: 'vneck-mint-collar.jpg',   model: 'V-Neck' }
};

/* =========================================================
   2. Утилиты
   ========================================================= */
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const money = n => Math.round(n).toLocaleString('ru-RU').replace(/ | |,/g, ' ') + ' ₸';
const colorsOf = p => Object.keys(p.photos);
const sizeLabel = s => LEGACY_SIZES[s] || s;
const findProduct = id => PRODUCTS.find(p => p.id === id);
const pantsLabel = v => ({ Jogger: 'брюки Jogger', Straight: 'брюки Straight' }[v] || v);
const store = {
  get(key, fallback) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; } },
  set(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* приватный режим */ } }
};

let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('is-show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('is-show'), 2800);
}

/* =========================================================
   3. Подстановка контактов из CONFIG
   ========================================================= */
function applyConfig() {
  const links = {
    phone: 'tel:' + CONFIG.phone,
    whatsapp: 'https://wa.me/' + CONFIG.whatsapp,
    email: 'mailto:' + CONFIG.email,
    instagram: CONFIG.instagram,
    threads: CONFIG.threads,
    kaspi: CONFIG.kaspi,
    map: CONFIG.map
  };
  $$('[data-link]').forEach(a => { const href = links[a.dataset.link]; if (href) a.href = href; });
  const texts = { phone: CONFIG.phoneText, email: CONFIG.email, address: CONFIG.address };
  $$('[data-text]').forEach(el => { const t = texts[el.dataset.text]; if (t) el.textContent = t; });
  $('#year').textContent = new Date().getFullYear();
}

/* =========================================================
   4. Hero: смена фото по цвету
   ========================================================= */
function initHero() {
  const img = $('#heroImg'), name = $('#heroColorName'), model = $('.hero__caption b'), box = $('#heroSwatches');
  box.innerHTML = Object.keys(HERO_PHOTOS).map((k, i) =>
    `<button type="button" class="swatch ${i === 0 ? 'is-active' : ''}" role="radio" aria-checked="${i === 0}" data-hero-color="${k}" style="--sw:${COLORS[k].hex}" aria-label="${COLORS[k].name}" title="${COLORS[k].name}"></button>`).join('');
  setTimeout(() => Object.values(HERO_PHOTOS).forEach(h => { const i = new Image(); i.src = IMG + h.src; }), 1500);

  box.addEventListener('click', e => {
    const btn = e.target.closest('[data-hero-color]');
    if (!btn) return;
    const key = btn.dataset.heroColor, h = HERO_PHOTOS[key];
    $$('[data-hero-color]', box).forEach(b => { const on = b === btn; b.classList.toggle('is-active', on); b.setAttribute('aria-checked', on); });
    img.classList.add('is-fading');
    setTimeout(() => {
      img.src = IMG + h.src;
      img.alt = `Медицинский костюм GALIUM ${h.model} в цвете ${COLORS[key].name}`;
      name.textContent = COLORS[key].name;
      model.textContent = h.model;
      const show = () => img.classList.remove('is-fading');
      if (img.complete) show(); else img.onload = show;
    }, 250);
  });
}

/* =========================================================
   5. Каталог
   ========================================================= */
const catalogState = { model: 'all', color: 'all' };

function mediaHTML(p, color) {
  const ph = p.photos[color];
  return `
    <img class="img-1" src="${IMG + ph[0]}" alt="${p.name}, цвет ${COLORS[color].name}" width="640" height="800" loading="lazy" decoding="async">
    ${ph[1] ? `<img class="img-2" src="${IMG + ph[1]}" alt="" aria-hidden="true" width="640" height="800" loading="lazy" decoding="async">` : ''}
    ${ph[1] ? `<div class="product__dots"><button type="button" class="is-active" data-photo="0" aria-label="Фото 1"></button><button type="button" data-photo="1" aria-label="Фото 2"></button></div>` : ''}`;
}

/** Группа кнопок-вариантов (крой, брюки). Если вариант один — просто подпись */
function optionGroup(label, key, values) {
  if (values.length < 2) return `<p class="product__fixed"><span>${label}:</span> ${values[0]}</p>`;
  return `<div><p class="product__label">${label}</p>
    <div class="seg" role="radiogroup" aria-label="${label}">
      ${values.map((v, i) => `<button type="button" class="seg__btn ${i === 0 ? 'is-active' : ''}" role="radio" aria-checked="${i === 0}" data-opt="${key}" data-value="${v}">${v}</button>`).join('')}
    </div></div>`;
}

function cardHTML(p, i) {
  const colors = colorsOf(p);
  const color = catalogState.color !== 'all' && colors.includes(catalogState.color) ? catalogState.color : colors[0];
  const tags = p.tags.map(t => `<span class="product__tag">${t}</span>`).join('') + `<span class="product__tag product__tag--light">G-Flex</span>`;
  return `
  <article class="product" data-id="${p.id}" data-color="${color}" data-size="${DEFAULT_SIZE}" data-fit="${p.fits[0]}" data-pants="${p.pants[0]}" style="animation-delay:${i * 70}ms">
    <div class="product__media ${p.photos[color][1] ? 'has-2' : ''}">
      <div class="product__tags">${tags}</div>
      ${mediaHTML(p, color)}
    </div>
    <div class="product__body">
      <div>
        <div class="product__top">
          <h3 class="product__name">${p.name}</h3>
          <span class="product__color">${COLORS[color].name}</span>
        </div>
        <p class="product__desc">${p.desc}</p>
      </div>
      <ul class="product__feats">${p.feats.map(f => `<li>${f}</li>`).join('')}</ul>
      <div>
        <p class="product__label">Цвет · ${colors.length}</p>
        <div class="product__swatches" role="radiogroup" aria-label="Цвет">
          ${colors.map(k => `<button type="button" class="swatch ${k === color ? 'is-active' : ''}" role="radio" aria-checked="${k === color}" aria-label="${COLORS[k].name}" title="${COLORS[k].name}" data-color="${k}" style="--sw:${COLORS[k].hex}"></button>`).join('')}
        </div>
      </div>
      ${optionGroup('Крой', 'fit', p.fits)}
      ${optionGroup('Брюки', 'pants', p.pants)}
      <div>
        <p class="product__label">Размер</p>
        <div class="sizes" role="radiogroup" aria-label="Размер">
          ${SIZES.map(s => `<button type="button" class="size ${s === DEFAULT_SIZE ? 'is-active' : ''}" role="radio" aria-checked="${s === DEFAULT_SIZE}" aria-label="Размер ${s}" data-size="${s}">${s}</button>`).join('')}
        </div>
      </div>
      <div class="product__foot">
        <p class="product__price">${money(p.price)}<small>или ${money(p.price / CONFIG.installmentMonths)}/мес · ${CONFIG.installmentMonths} мес</small></p>
        <button type="button" class="btn btn--primary product__add">В корзину</button>
      </div>
    </div>
  </article>`;
}

function renderProducts() {
  const list = PRODUCTS.filter(p =>
    (catalogState.model === 'all' || p.model === catalogState.model) &&
    (catalogState.color === 'all' || colorsOf(p).includes(catalogState.color)));
  $('#productsEmpty').hidden = list.length > 0;
  $('#products').innerHTML = list.map(cardHTML).join('');
}

function setCardColor(card, color) {
  const p = findProduct(card.dataset.id);
  card.dataset.color = color;
  $$('.swatch', card).forEach(s => { const on = s.dataset.color === color; s.classList.toggle('is-active', on); s.setAttribute('aria-checked', on); });
  $('.product__color', card).textContent = COLORS[color].name;
  const media = $('.product__media', card);
  $$('img, .product__dots', media).forEach(el => el.remove());
  media.insertAdjacentHTML('beforeend', mediaHTML(p, color));
  media.classList.toggle('has-2', !!p.photos[color][1]);
}

function selectIn(group, btn) {
  $$('[role="radio"]', group).forEach(b => { const on = b === btn; b.classList.toggle('is-active', on); b.setAttribute('aria-checked', on); });
}

function initCatalog() {
  // фильтр по цвету — из палитры
  $('#colorFilter').innerHTML = `<button class="chip is-active" type="button" data-filter-color="all" aria-pressed="true">Все цвета</button>` +
    Object.entries(COLORS).map(([k, c]) => `<button class="chip" type="button" data-filter-color="${k}" aria-pressed="false"><i style="--sw:${c.hex}"></i>${c.name}</button>`).join('');

  renderProducts();

  $$('[data-filter-model]').forEach(tab => tab.addEventListener('click', () => {
    catalogState.model = tab.dataset.filterModel;
    $$('[data-filter-model]').forEach(t => { const on = t === tab; t.classList.toggle('is-active', on); t.setAttribute('aria-selected', on); });
    renderProducts();
  }));

  $('#colorFilter').addEventListener('click', e => {
    const chip = e.target.closest('[data-filter-color]');
    if (!chip) return;
    catalogState.color = chip.dataset.filterColor;
    $$('[data-filter-color]').forEach(c => { const on = c === chip; c.classList.toggle('is-active', on); c.setAttribute('aria-pressed', on); });
    renderProducts();
  });

  $('#products').addEventListener('click', e => {
    const card = e.target.closest('.product');
    if (!card) return;

    const sw = e.target.closest('.swatch');
    if (sw) return setCardColor(card, sw.dataset.color);

    const size = e.target.closest('.size');
    if (size) { card.dataset.size = size.dataset.size; return selectIn(size.parentElement, size); }

    const opt = e.target.closest('[data-opt]');
    if (opt) { card.dataset[opt.dataset.opt] = opt.dataset.value; return selectIn(opt.parentElement, opt); }

    const dot = e.target.closest('[data-photo]');
    if (dot) { // переключение фото точками (на телефоне нет наведения)
      $('.img-2', card).style.opacity = dot.dataset.photo === '1' ? 1 : '';
      $$('[data-photo]', card).forEach(d => d.classList.toggle('is-active', d === dot));
      return;
    }

    const add = e.target.closest('.product__add');
    if (add) {
      const d = card.dataset;
      cart.add({ id: d.id, color: d.color, size: d.size, fit: d.fit, pants: d.pants });
      add.classList.add('is-added');
      add.textContent = 'Добавлено ✓';
      setTimeout(() => { add.classList.remove('is-added'); add.textContent = 'В корзину'; }, 1400);
    }
  });

  // «Добавить в корзину» в блоке цен — V-Neck Royal Blue, размер по умолчанию
  $$('[data-add-default]').forEach(b => b.addEventListener('click', () =>
    cart.add({ id: 'vneck', color: 'royal', size: DEFAULT_SIZE, fit: 'Женский', pants: 'Jogger' }, true)));
}

/* Палитра в блоке «Модели» */
function renderPalette() {
  $('#palette').innerHTML = `<p class="palette__title">Цветовая палитра · ${Object.keys(COLORS).length} цветов G-Flex</p>
    <ul class="palette__list">${Object.values(COLORS).map(c =>
      `<li><span class="palette__chip" style="--sw:${c.hex}"></span><b>${c.ru || c.name}</b><small>${c.hex}</small></li>`).join('')}</ul>`;
}

/* =========================================================
   6. Корзина (localStorage)
   ========================================================= */
const itemKey = i => [i.id, i.color, i.size, i.fit, i.pants].join('|');
const itemMeta = i => [COLORS[i.color].name, `размер ${sizeLabel(i.size)}`, i.fit, pantsLabel(i.pants)].join(' · ');

const cart = {
  items: store.get('galium-cart', []),
  student: store.get('galium-student', false),

  save() { store.set('galium-cart', this.items); store.set('galium-student', this.student); this.render(); },
  add(opts, open = false) {
    const item = { ...opts, qty: 1 };
    item.key = itemKey(item);
    const found = this.items.find(i => i.key === item.key);
    if (found) found.qty += 1; else this.items.push(item);
    this.save();
    toast(`${findProduct(item.id).name} · ${COLORS[item.color].name} · ${item.size} — в корзине`);
    const c = $('#cartCount'); c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump');
    if (open) openCart();
  },
  change(key, delta) {
    const it = this.items.find(i => i.key === key);
    if (!it) return;
    it.qty += delta;
    if (it.qty < 1) this.items = this.items.filter(i => i.key !== key);
    this.save();
  },
  remove(key) { this.items = this.items.filter(i => i.key !== key); this.save(); },
  clear() { this.items = []; this.save(); },
  count() { return this.items.reduce((s, i) => s + i.qty, 0); },
  subtotal() { return this.items.reduce((s, i) => s + (findProduct(i.id)?.price || 0) * i.qty, 0); },
  /** Скидки не суммируются: действует одна — оптовая (от 20 ед.) или студенческая */
  discountInfo() {
    if (this.count() >= CONFIG.bulkFrom) return { rate: CONFIG.bulkDiscount, label: `Оптовая скидка (от ${CONFIG.bulkFrom} ед.)` };
    if (this.student) return { rate: CONFIG.studentDiscount, label: 'Скидка студента' };
    return { rate: 0, label: '' };
  },
  discount() { return Math.round(this.subtotal() * this.discountInfo().rate); },
  total() { return this.subtotal() - this.discount(); },

  /** приводим сохранённые позиции к текущему формату (старые версии сайта) */
  normalize() {
    this.items = this.items.reduce((acc, raw) => {
      const p = findProduct(raw.id);
      if (!p || !p.photos[raw.color]) return acc;
      const i = { ...raw, size: LEGACY_SIZES[raw.size] || raw.size, fit: raw.fit || p.fits[0], pants: raw.pants || p.pants[0] };
      i.key = itemKey(i);
      const same = acc.find(x => x.key === i.key);
      if (same) same.qty += i.qty; else acc.push(i);
      return acc;
    }, []);
  },

  render() {
    this.normalize();
    const count = this.count();
    const badge = $('#cartCount');
    badge.textContent = count;
    badge.classList.toggle('has-items', count > 0);
    $('#cartToggle').setAttribute('aria-label', `Открыть корзину, товаров: ${count}`);

    const empty = this.items.length === 0;
    $('#cartEmpty').hidden = !empty;
    $('#cartFoot').hidden = empty;
    $('#studentToggle').checked = this.student;

    $('#cartItems').innerHTML = this.items.map(i => {
      const p = findProduct(i.id);
      return `
      <li class="cart-item" data-key="${i.key}">
        <img class="cart-item__img" src="${IMG + p.photos[i.color][0]}" alt="" width="72" height="90" loading="lazy">
        <div>
          <p class="cart-item__name">${p.name}</p>
          <p class="cart-item__meta">${itemMeta(i)}</p>
          <p class="cart-item__price">${money(p.price * i.qty)}</p>
        </div>
        <div class="cart-item__right">
          <button type="button" class="cart-item__remove" data-act="remove" aria-label="Удалить ${p.name}"><svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/></svg></button>
          <div class="qty">
            <button type="button" data-act="dec" aria-label="Уменьшить количество"><svg viewBox="0 0 24 24"><path d="M5 12h14"/></svg></button>
            <span aria-live="polite">${i.qty}</span>
            <button type="button" data-act="inc" aria-label="Увеличить количество"><svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg></button>
          </div>
        </div>
      </li>`;
    }).join('');

    // подсказка об оптовых условиях
    const hint = $('#bulkHint');
    if (count >= CONFIG.customPriceFrom) hint.textContent = `От ${CONFIG.customPriceFrom} единиц цена по договорённости — менеджер предложит индивидуальные условия.`;
    else if (count >= CONFIG.bulkFrom) hint.textContent = `Применена оптовая скидка ${CONFIG.bulkDiscount * 100}%. Можно добавить вышивку логотипа клиники.`;
    else hint.textContent = `Оптовая скидка ${CONFIG.bulkDiscount * 100}% — от ${CONFIG.bulkFrom} единиц (ещё ${CONFIG.bulkFrom - count}).`;

    const d = this.discountInfo();
    $('#cartSubtotal').textContent = money(this.subtotal());
    $('#discountRow').hidden = !d.rate;
    $('#discountLabel').textContent = d.label;
    $('#cartDiscount').textContent = '−' + money(this.discount());
    $('#cartTotal').textContent = money(this.total());
  },

  /** Текст заказа — для WhatsApp и отправки формы */
  summaryText() {
    const lines = this.items.map(i => `• ${findProduct(i.id).name}: ${itemMeta(i)} × ${i.qty} = ${money(findProduct(i.id).price * i.qty)}`);
    const d = this.discountInfo();
    if (d.rate) lines.push(`${d.label}: −${money(this.discount())}`);
    lines.push(`Итого: ${money(this.total())}`);
    return lines.join('\n');
  }
};

function openCart() {
  closeMenu();
  const el = $('#cart');
  el.classList.add('is-open');
  el.setAttribute('aria-hidden', 'false');
  $('#cartOverlay').hidden = false;
  document.body.classList.add('no-scroll');
  lastFocus = document.activeElement;
  setTimeout(() => $('[data-close-cart]', el).focus(), 50);
}
function closeCart() {
  const el = $('#cart');
  if (!el.classList.contains('is-open')) return;
  el.classList.remove('is-open');
  el.setAttribute('aria-hidden', 'true');
  $('#cartOverlay').hidden = true;
  document.body.classList.remove('no-scroll');
  if (lastFocus) lastFocus.focus();
}

function initCart() {
  cart.render();
  $('#cartToggle').addEventListener('click', openCart);
  $('#cartOverlay').addEventListener('click', closeCart);
  $$('[data-close-cart]').forEach(b => b.addEventListener('click', closeCart));
  $('#cartItems').addEventListener('click', e => {
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const key = btn.closest('.cart-item').dataset.key;
    if (btn.dataset.act === 'inc') cart.change(key, 1);
    if (btn.dataset.act === 'dec') cart.change(key, -1);
    if (btn.dataset.act === 'remove') { cart.remove(key); toast('Товар удалён из корзины'); }
  });
  $('#studentToggle').addEventListener('change', e => { cart.student = e.target.checked; cart.save(); });
  // подтверждение прямо на кнопке (системный confirm() работает не везде)
  let clearArmed = null;
  $('#clearCart').addEventListener('click', e => {
    const b = e.currentTarget;
    if (!clearArmed) {
      b.textContent = 'Точно очистить? Нажмите ещё раз';
      clearArmed = setTimeout(() => { b.textContent = 'Очистить корзину'; clearArmed = null; }, 3000);
      return;
    }
    clearTimeout(clearArmed); clearArmed = null;
    b.textContent = 'Очистить корзину';
    cart.clear(); toast('Корзина очищена');
  });
  $('#checkoutBtn').addEventListener('click', () => {
    if (!cart.items.length) return;
    closeCart();
    const d = cart.discountInfo();
    $('#checkoutSummary').innerHTML = cart.items.map(i => {
      const p = findProduct(i.id);
      return `<div><span>${p.name} · ${itemMeta(i)} × ${i.qty}</span><b>${money(p.price * i.qty)}</b></div>`;
    }).join('') + (d.rate ? `<div><span>${d.label}</span><b>−${money(cart.discount())}</b></div>` : '') +
      `<div class="total"><span>Итого</span><span>${money(cart.total())}</span></div>`;
    openModal('checkout');
  });
}

/* =========================================================
   7. Шапка, меню, активный пункт, тема
   ========================================================= */
function closeMenu() {
  const nav = $('#nav'), burger = $('#burger');
  if (!nav.classList.contains('is-open')) return;
  nav.classList.remove('is-open');
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-label', 'Открыть меню');
  $('#header').classList.remove('menu-open');
  document.body.classList.remove('no-scroll');
}
function initHeader() {
  const header = $('#header'), nav = $('#nav'), burger = $('#burger'), toTop = $('#toTop');

  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 20);
    toTop.classList.toggle('is-show', y > 700);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  burger.addEventListener('click', () => {
    if (nav.classList.contains('is-open')) return closeMenu();
    nav.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Закрыть меню');
    header.classList.add('menu-open');
    document.body.classList.add('no-scroll');
  });
  $$('.nav__link', nav).forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('click', e => {
    if (!nav.classList.contains('is-open')) return;
    if (e.target === nav || (!nav.contains(e.target) && !burger.contains(e.target))) closeMenu();
  });
  matchMedia('(min-width: 1100px)').addEventListener('change', e => { if (e.matches) closeMenu(); });

  // Подсветка активного раздела (+ первый экран — снимает подсветку)
  const links = $$('.nav__link');
  const sections = [$('#top'), ...links.map(a => $(a.getAttribute('href')))].filter(Boolean);
  const spy = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      links.forEach(a => {
        const on = a.getAttribute('href') === '#' + en.target.id;
        a.classList.toggle('is-active', on);
        if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => spy.observe(s));
}

function initTheme() {
  const btn = $('#themeToggle');
  const sync = () => {
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    btn.setAttribute('aria-label', dark ? 'Включить светлую тему' : 'Включить тёмную тему');
    $('meta[name="theme-color"]').setAttribute('content', dark ? '#100B0B' : '#970505');
  };
  sync();
  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('galium-theme', next); } catch (e) { /* ignore */ }
    sync();
  });
}

/* =========================================================
   8. Анимации появления и счётчики
   ========================================================= */
function initReveal() {
  $$('.benefits, .steps, .stats, .plans, .accordion, .models').forEach(group => {
    $$('.reveal', group).forEach((el, i) => el.style.setProperty('--d', (i % 6) * 0.08 + 's'));
  });
  // всё, что видно сразу при загрузке, показываем без ожидания (первый кадр и превью ссылки — полные)
  $$('.reveal').forEach(el => { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('is-visible'); });
  if (!('IntersectionObserver' in window)) { $$('.reveal').forEach(el => el.classList.add('is-visible')); return; }
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
  }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  $$('.reveal').forEach(el => io.observe(el));
}

function initCounters() {
  const run = el => {
    const target = +el.dataset.count, suffix = el.dataset.suffix || '', dur = 1600, t0 = performance.now();
    const step = now => {
      const k = Math.min((now - t0) / dur, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3))) + suffix;
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
  }), { threshold: 0.6 });
  $$('[data-count]').forEach(el => io.observe(el));
}

/* =========================================================
   9. Слайдер «Проверено в деле» (кнопки, точки, свайп, автопрокрутка)
   ========================================================= */
function initSlider() {
  const slider = $('#reviewSlider'), track = $('#reviewTrack'), dotsBox = $('#reviewDots');
  const slides = $$('.review', track);
  let index = 0, timer;

  const perView = () => (innerWidth >= 900 ? 3 : innerWidth >= 640 ? 2 : 1);
  const maxIndex = () => Math.max(0, slides.length - perView());

  function buildDots() {
    dotsBox.innerHTML = '';
    for (let i = 0; i <= maxIndex(); i++) {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', `Слайд ${i + 1}`);
      b.addEventListener('click', () => { go(i); restart(); });
      dotsBox.appendChild(b);
    }
  }
  function go(i) {
    const max = maxIndex();
    index = i > max ? 0 : i < 0 ? max : i;
    track.style.transform = `translateX(-${index * (100 / perView())}%)`;
    $$('button', dotsBox).forEach((d, k) => d.setAttribute('aria-selected', k === index));
    slides.forEach((s, k) => s.setAttribute('aria-hidden', k < index || k >= index + perView()));
  }
  const restart = () => { clearInterval(timer); timer = setInterval(() => go(index + 1), 6000); };

  $('#revPrev').addEventListener('click', () => { go(index - 1); restart(); });
  $('#revNext').addEventListener('click', () => { go(index + 1); restart(); });
  slider.addEventListener('mouseenter', () => clearInterval(timer));
  slider.addEventListener('mouseleave', restart);
  slider.addEventListener('focusin', () => clearInterval(timer));

  let x0 = null;
  track.addEventListener('pointerdown', e => { x0 = e.clientX; });
  window.addEventListener('pointerup', e => {
    if (x0 === null) return;
    const dx = e.clientX - x0; x0 = null;
    if (Math.abs(dx) > 50) { go(index + (dx < 0 ? 1 : -1)); restart(); }
  });

  let rw;
  window.addEventListener('resize', () => { clearTimeout(rw); rw = setTimeout(() => { buildDots(); go(Math.min(index, maxIndex())); }, 150); });

  buildDots(); go(0); restart();
}

/* =========================================================
   10. FAQ-аккордеон
   ========================================================= */
function toggleAcc(btn, force) {
  const item = btn.closest('.acc');
  const open = force ?? !item.classList.contains('is-open');
  item.classList.toggle('is-open', open);
  btn.setAttribute('aria-expanded', open);
}
function initFaq() {
  $$('.acc__btn').forEach(btn => btn.addEventListener('click', () => toggleAcc(btn)));
  $$('[data-open-faq]').forEach(a => a.addEventListener('click', () => toggleAcc($('#' + a.dataset.openFaq), true)));
}

/* =========================================================
   11. Модальные окна (крестик, Esc, клик по фону, ловушка фокуса)
   ========================================================= */
let lastFocus = null, activeModal = null;

function openModal(name, topic) {
  closeMenu();
  const modal = $('#modal-' + name);
  if (!modal) return;
  if (activeModal) closeModal();
  lastFocus = document.activeElement;
  const form = $('form', modal);
  if (form) resetFormView(form);
  const topicInput = $('input[name="topic"]', modal);
  if (topicInput) topicInput.value = topic || 'Заявка с сайта';
  modal.hidden = false;
  activeModal = modal;
  document.body.classList.add('no-scroll');
  setTimeout(() => $('input:not([type=hidden])', modal)?.focus(), 60);
}
function closeModal() {
  if (!activeModal) return;
  activeModal.hidden = true;
  activeModal = null;
  document.body.classList.remove('no-scroll');
  if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
}

function initModals() {
  document.addEventListener('click', e => {
    const opener = e.target.closest('[data-open-modal]');
    if (opener) { e.preventDefault(); openModal(opener.dataset.openModal, opener.dataset.topic); }
    if (e.target.closest('[data-close-modal]')) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeModal(); closeCart(); closeMenu(); }
    if (e.key === 'Tab' && activeModal) {
      const f = $$('a[href], button:not([disabled]), input:not([type=hidden]), textarea, select', activeModal).filter(el => el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
}

/* =========================================================
   12. Формы: маска телефона, валидация, отправка
   ========================================================= */
function formatPhone(value) {
  let d = value.replace(/\D/g, '');
  if (!d) return '';
  if (!value.trim().startsWith('+') && d.length === 10) d = '7' + d; // 701 111 22 33 → +7
  else if (d[0] === '8') d = '7' + d.slice(1);
  if (d[0] !== '7') d = '7' + d;
  d = d.slice(0, 11);
  let out = '+7';
  if (d.length > 1) out += ' (' + d.slice(1, 4);
  if (d.length >= 4) out += ')';
  if (d.length > 4) out += ' ' + d.slice(4, 7);
  if (d.length > 7) out += '-' + d.slice(7, 9);
  if (d.length > 9) out += '-' + d.slice(9, 11);
  return out;
}

function initPhoneMask(input) {
  input.addEventListener('input', () => { input.value = formatPhone(input.value); });
  input.addEventListener('focus', () => { if (!input.value) input.value = '+7 ('; });
  input.addEventListener('blur', () => { if (input.value.replace(/\D/g, '').length <= 1) input.value = ''; });
}

function validateField(input) {
  const field = input.closest('.field');
  if (!field) return true;
  const err = $('.field__error', field);
  const v = input.value.trim();
  let msg = '';
  if (input.name === 'name' && v.length < 2) msg = 'Введите имя — минимум 2 буквы';
  else if (input.name === 'name' && !/^[\p{L}\s'-]+$/u.test(v)) msg = 'Имя может содержать только буквы';
  else if (input.hasAttribute('data-phone') && input.value.replace(/\D/g, '').length !== 11) msg = 'Введите номер полностью: +7 (XXX) XXX-XX-XX';
  else if (input.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) msg = 'Похоже, в email ошибка. Пример: name@mail.kz';
  else if (input.name === 'city' && v.length < 2) msg = 'Укажите город доставки';
  if (err) err.textContent = msg;
  field.classList.toggle('is-invalid', !!msg);
  field.classList.toggle('is-valid', !msg && !!v);
  input.setAttribute('aria-invalid', !!msg);
  return !msg;
}

/** Отправка данных: Formspree → Telegram → демо-режим */
async function sendData(payload) {
  if (CONFIG.formspreeEndpoint) {
    const r = await fetch(CONFIG.formspreeEndpoint, {
      method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload)
    });
    if (!r.ok) throw new Error('Formspree ' + r.status);
    return;
  }
  if (CONFIG.telegramBotToken && CONFIG.telegramChatId) {
    const text = Object.entries(payload).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n');
    const r = await fetch(`https://api.telegram.org/bot${CONFIG.telegramBotToken}/sendMessage`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: CONFIG.telegramChatId, text })
    });
    if (!r.ok) throw new Error('Telegram ' + r.status);
    return;
  }
  // ДЕМО-РЕЖИМ: бэкенд не подключён — заявка дублируется кнопкой «Отправить в WhatsApp»
  console.info('[GALIUM] Демо-отправка формы (подключите Formspree или Telegram в CONFIG):', payload);
  await new Promise(r => setTimeout(r, 900));
}

const SUCCESS_ICON = '<svg viewBox="0 0 24 24"><path d="m5 12 5 5 9-10"/></svg>';
const waLink = text => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;

function showSuccess(form, title, text, extraHtml = '') {
  form.hidden = true;
  const box = document.createElement('div');
  box.className = 'form-success';
  box.setAttribute('role', 'status');
  box.innerHTML = `<div class="form-success__icon">${SUCCESS_ICON}</div><h3>${title}</h3><p>${text}</p><div class="form-success__actions">${extraHtml}</div>`;
  form.after(box);
  box.tabIndex = -1; box.focus();
}
function resetFormView(form) {
  const next = form.nextElementSibling;
  if (next && next.classList.contains('form-success')) next.remove();
  form.hidden = false;
}

function initForms() {
  $$('input[data-phone]').forEach(initPhoneMask);

  $$('form[data-form]').forEach(form => {
    const inputs = $$('input:not([type=hidden]):not([type=checkbox]), textarea', form);
    inputs.forEach(inp => {
      inp.addEventListener('blur', () => { if (inp.value) validateField(inp); });
      inp.addEventListener('input', () => { if (inp.closest('.field')?.classList.contains('is-invalid')) validateField(inp); });
    });

    form.addEventListener('submit', async e => {
      e.preventDefault();
      if (form.dataset.sending === '1') return; // защита от повторной отправки

      let ok = inputs.map(validateField).every(Boolean);
      const agree = $('input[name="agree"]', form);
      const agreeErr = $('.field__error--agree', form);
      if (agree && !agree.checked) { ok = false; agreeErr.textContent = 'Нужно согласие на обработку данных'; }
      else if (agreeErr) agreeErr.textContent = '';
      if (!ok) { $('.is-invalid input, .is-invalid textarea', form)?.focus(); return; }

      const btn = $('button[type="submit"]', form);
      const btnText = btn.textContent;
      form.dataset.sending = '1';
      btn.disabled = true; btn.classList.add('is-loading'); btn.textContent = 'Отправляем…';

      const data = Object.fromEntries(new FormData(form));
      delete data.agree;
      data.form = form.dataset.form;
      data.page = location.href;
      if (form.dataset.form === 'order') data.order = cart.summaryText();

      try {
        await sendData(data);
        if (form.dataset.form === 'order') {
          const text = `Здравствуйте! Заказ с сайта GALIUM:\n${data.order}\n\nИмя: ${data.name}\nТелефон: ${data.phone}\nГород: ${data.city}${data.comment ? '\nКомментарий: ' + data.comment : ''}`;
          cart.clear();
          showSuccess(form, 'Заказ принят!', 'Менеджер свяжется с вами для подтверждения и предоплаты. Изготовление — 5–15 рабочих дней.',
            `<a class="btn btn--primary" href="${waLink(text)}" target="_blank" rel="noopener">Отправить заказ в WhatsApp</a>`);
        } else {
          const text = `Здравствуйте! Заявка с сайта GALIUM.\nИмя: ${data.name}\nТелефон: ${data.phone}${data.topic ? '\nТема: ' + data.topic : ''}${data.message ? '\nСообщение: ' + data.message : ''}`;
          showSuccess(form, 'Спасибо, заявка отправлена!', 'Мы свяжемся с вами в ближайшее время. Хотите быстрее — напишите нам в WhatsApp.',
            `<a class="btn btn--primary" href="${waLink(text)}" target="_blank" rel="noopener">Написать в WhatsApp</a>` +
            (form.dataset.form === 'lead' ? '<button class="btn btn--ghost" type="button" data-close-modal>Закрыть</button>'
                                          : '<button class="btn btn--ghost" type="button" data-reset-form>Ещё заявка</button>'));
        }
        form.reset();
        $$('.field', form).forEach(f => f.classList.remove('is-valid', 'is-invalid'));
      } catch (err) {
        console.error(err);
        toast(`Не удалось отправить. Позвоните нам: ${CONFIG.phoneText}`);
      } finally {
        form.dataset.sending = '';
        btn.disabled = false; btn.classList.remove('is-loading'); btn.textContent = btnText;
      }
    });
  });

  document.addEventListener('click', e => {
    const r = e.target.closest('[data-reset-form]');
    if (r) { const form = r.closest('.form-success').previousElementSibling; resetFormView(form); $('input', form).focus(); }
  });
}

/* =========================================================
   13. Старт
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
  applyConfig();
  initTheme();
  initHero();
  initCatalog();
  renderPalette();
  initCart();
  initHeader();
  initReveal();
  initCounters();
  initSlider();
  initFaq();
  initModals();
  initForms();
});
