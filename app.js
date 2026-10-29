const menuItems = [
  { name: "Chicken Tehari", price: 180, category: "Rice" },
  { name: "Beef Tehari", price: 220, category: "Rice" },
  { name: "Chicken Biryani", price: 200, category: "Rice" },
  { name: "Beef Haleem", price: 200, category: "Special" },
  { name: "Loitta Shutki Bhorta", price: 120, category: "Bhorta" },
  { name: "Chepa Shutki Bhorta", price: 120, category: "Bhorta" },
  { name: "Plain Polao", price: 100, category: "Rice" },
  { name: "Chicken Roast", price: 180, category: "Main" }
];

let cart = [];

const menuEl = document.getElementById("menu");
const cartEl = document.getElementById("cart");
const searchEl = document.getElementById("search");
const discountInput = document.getElementById("discountInput");
const paymentInput = document.getElementById("paymentInput");
const subtotalEl = document.getElementById("subtotal");
const discountEl = document.getElementById("discount");
const totalEl = document.getElementById("total");
const changeEl = document.getElementById("change");
const countEl = document.getElementById("count");
const toastEl = document.getElementById("toast");

function money(value) {
  return `৳${Number(value).toLocaleString("en-BD")}`;
}

function renderMenu() {
  const query = searchEl.value.trim().toLowerCase();

  const filtered = menuItems.filter(item =>
    item.name.toLowerCase().includes(query) ||
    item.category.toLowerCase().includes(query)
  );

  menuEl.innerHTML = filtered.map(item => `
    <button class="menu-card" onclick="addToCart(${menuItems.indexOf(item)})">
      <span class="category">${item.category}</span>
      <strong>${item.name}</strong>
      <span class="price">${money(item.price)}</span>
    </button>
  `).join("") || `<p class="empty">No food found.</p>`;
}

function addToCart(index) {
  const item = menuItems[index];
  const existing = cart.find(cartItem => cartItem.name === item.name);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...item, qty: 1 });
  }

  renderCart();
}

function changeQty(index, amount) {
  cart[index].qty += amount;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  renderCart();
}

function renderCart() {
  if (!cart.length) {
    cartEl.innerHTML = `
      <div class="empty">
        Your order is empty.<br>
        Select food from the menu.
      </div>
    `;
  } else {
    cartEl.innerHTML = cart.map((item, index) => `
      <div class="cart-item">
        <div>
          <strong>${item.name}</strong>
          <small>${money(item.price)} × ${item.qty}</small>
        </div>

        <div class="qty">
          <button onclick="changeQty(${index}, -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
        </div>
      </div>
    `).join("");
  }

  updateTotals();
}

function updateTotals() {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const discount = Math.max(
    0,
    Number(discountInput.value) || 0
  );

  const total = Math.max(0, subtotal - discount);

  const payment = Math.max(
    0,
    Number(paymentInput.value) || 0
  );

  const change = Math.max(0, payment - total);

  const itemCount = cart.reduce(
    (sum, item) => sum + item.qty,
    0
  );

  subtotalEl.textContent = money(subtotal);
  discountEl.textContent = money(discount);
  totalEl.textContent = money(total);
  changeEl.textContent = money(change);

  countEl.textContent =
    `${itemCount} item${itemCount === 1 ? "" : "s"}`;
}

function clearCart() {
  cart = [];

  discountInput.value = 0;
  paymentInput.value = 0;

  renderCart();
}

function completeSale() {
  if (!cart.length) {
    showToast("Add food to the order first.");
    return;
  }

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const discount = Number(discountInput.value) || 0;
  const total = Math.max(0, subtotal - discount);
  const payment = Number(paymentInput.value) || 0;

  if (payment < total) {
    showToast(
      `Payment is short by ${money(total - payment)}.`
    );
    return;
  }

  showToast(
    `Sale completed. Change: ${money(payment - total)}`
  );

  clearCart();
}

function showToast(message) {
  toastEl.textContent = message;

  toastEl.classList.add("show");

  setTimeout(() => {
    toastEl.classList.remove("show");
  }, 2500);
}

searchEl.addEventListener("input", renderMenu);

discountInput.addEventListener(
  "input",
  updateTotals
);

paymentInput.addEventListener(
  "input",
  updateTotals
);

document
  .getElementById("clear")
  .addEventListener("click", clearCart);

document
  .getElementById("checkout")
  .addEventListener("click", completeSale);

document.getElementById("today").textContent =
  new Date().toLocaleDateString("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

renderMenu();
renderCart();
