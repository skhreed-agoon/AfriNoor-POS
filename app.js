const menuItems = [
  // Rice
  { name: "Plain Rice", price: 50, category: "Rice" },
  { name: "Fried Rice", price: 140, category: "Rice" },
  { name: "Chicken Biryani", price: 200, category: "Rice" },
  { name: "Chicken Bhuna Khichuri", price: 260, category: "Rice" },
  { name: "Plain Khichuri Rice", price: 100, category: "Rice" },
  { name: "Plain Polao Rice", price: 100, category: "Rice" },

  // Bhorta
  { name: "Dal Bhorta", price: 30, category: "Bhorta" },
  { name: "Alu Bhorta", price: 30, category: "Bhorta" },
  { name: "Begun Bhorta", price: 40, category: "Bhorta" },
  { name: "Tomato Bhorta", price: 50, category: "Bhorta" },
  { name: "Chepa Shutki Bhorta", price: 50, category: "Bhorta" },
  { name: "Egg Bhorta", price: 80, category: "Bhorta" },
  { name: "Loitta Shutki Bhorta", price: 50, category: "Bhorta" },

  // Curry
  { name: "Rui Fish Curry", price: 250, category: "Curry" },
  { name: "Chingri Bhuna", price: 350, category: "Curry" },
  { name: "Doi Masala Egg Bhuna", price: 100, category: "Curry" },
  { name: "Lemon Daal", price: 70, category: "Curry" },
  { name: "Egg with Fulkopi Curry", price: 120, category: "Curry" },
  { name: "Broiler Chicken Curry", price: 170, category: "Curry" },
  { name: "Chicken Roast", price: 180, category: "Curry" },
  { name: "Deshi Chicken Curry", price: 300, category: "Curry" },
  { name: "Beef Laal Bhuna", price: 300, category: "Curry" },
  { name: "Mutton Laal Bhuna", price: 330, category: "Curry" },
  { name: "Mixed Vegetable", price: 80, category: "Curry" },
  { name: "Duck Bhuna", price: 400, category: "Curry" },
  { name: "Egg Bhuna", price: 60, category: "Curry" },
  { name: "Beef Bot Bhuna", price: 280, category: "Curry" },
  { name: "Plain Daal", price: 40, category: "Curry" },
  { name: "Daal Bhuna", price: 50, category: "Curry" },
  { name: "Sonali Chicken Curry", price: 220, category: "Curry" },
  { name: "Creamy Butter Cheese Chicken", price: 380, category: "Curry" },
  { name: "Pabda Fish Curry", price: 230, category: "Curry" },

  // Combo
  { name: "Combo 1", price: 260, category: "Combo" },
  { name: "Combo 2", price: 300, category: "Combo" },
  { name: "Combo 3", price: 180, category: "Combo" },
  { name: "Combo 4", price: 350, category: "Combo" },
  { name: "Combo 5", price: 250, category: "Combo" },
  { name: "Combo 6", price: 400, category: "Combo" },

  // Snacks
  { name: "Chef's Special Fried Chicken", price: 280, category: "Snacks" },
  { name: "Piyaju", price: 15, category: "Snacks" },
  { name: "Alu Chop", price: 15, category: "Snacks" },
  { name: "Egg Chop", price: 40, category: "Snacks" },
  { name: "Chotpoti", price: 80, category: "Snacks" },
  { name: "Egg Omelette", price: 50, category: "Snacks" },

  // Paratha
  { name: "Plain Paratha", price: 35, category: "Paratha" },
  { name: "Sweet Paratha", price: 40, category: "Paratha" },

  // Bhaji
  { name: "Begun Bhaji", price: 50, category: "Bhaji" },
  { name: "Alu Bhaji", price: 50, category: "Bhaji" },

  // Haleem
  { name: "Chef's Special Beef Haleem", price: 280, category: "Haleem", size: "250 gm" },
  { name: "Chef's Special Beef Haleem", price: 480, category: "Haleem", size: "500 gm" },
  { name: "Chef's Special Beef Haleem", price: 680, category: "Haleem", size: "750 gm" },

  { name: "Chef's Special Beef Bot Haleem", price: 250, category: "Haleem", size: "250 gm" },
  { name: "Chef's Special Beef Bot Haleem", price: 450, category: "Haleem", size: "500 gm" },
  { name: "Chef's Special Beef Bot Haleem", price: 650, category: "Haleem", size: "750 gm" },

  { name: "Chef's Special Mutton Haleem", price: 350, category: "Haleem", size: "250 gm" },
  { name: "Chef's Special Mutton Haleem", price: 650, category: "Haleem", size: "500 gm" },
  { name: "Chef's Special Mutton Haleem", price: 850, category: "Haleem", size: "750 gm" }
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
const todayEl = document.getElementById("today");
const clearBtn = document.getElementById("clear");
const checkoutBtn = document.getElementById("checkout");

function money(amount) {
  return `৳${Number(amount).toLocaleString("en-BD")}`;
}

function updateDate() {
  const now = new Date();

  todayEl.textContent = now.toLocaleDateString("en-BD", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function renderMenu(items = menuItems) {
  menuEl.innerHTML = "";

  if (items.length === 0) {
    menuEl.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:40px;color:#9ca3af;">
        No food found.
      </div>
    `;
    return;
  }

  items.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "menu-item";

    card.innerHTML = `
      <h3>${item.name}</h3>
      <p style="color:#6b7280;font-size:13px;margin-bottom:10px;">
        ${item.category}
      </p>
      <div class="price">${money(item.price)}</div>
    `;

    card.addEventListener("click", () => {
      addToCart(index, items);
    });

    menuEl.appendChild(card);
  });
}

function addToCart(index, sourceItems = menuItems) {
  const item = sourceItems[index];

  const existing = cart.find(product => product.name === item.name);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({
      name: item.name,
      price: item.price,
      quantity: 1
    });
  }

  renderCart();
}

function renderCart() {
  if (cart.length === 0) {
    cartEl.innerHTML = `
      <div class="cart-empty">
        <div style="font-size:40px;margin-bottom:10px;">🛒</div>
        <p>No items added yet.</p>
        <p style="font-size:13px;margin-top:5px;">
          Click a food item to add it.
        </p>
      </div>
    `;
  } else {
    cartEl.innerHTML = "";

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;

      const row = document.createElement("div");
      row.className = "cart-item";

      row.innerHTML = `
        <div class="cart-item-top">
          <div>
            <div class="cart-item-name">${item.name}</div>
            <div style="font-size:13px;color:#6b7280;margin-top:4px;">
              ${money(item.price)} each
            </div>
          </div>

          <div class="cart-item-price">
            ${money(itemTotal)}
          </div>
        </div>

        <div class="quantity-controls">
          <button onclick="changeQuantity(${index}, -1)">−</button>

          <strong>${item.quantity}</strong>

          <button onclick="changeQuantity(${index}, 1)">+</button>

          <button
            onclick="removeItem(${index})"
            style="
              margin-left:auto;
              background:#fee2e2;
              color:#b91c1c;
            "
          >
            ×
          </button>
        </div>
      `;

      cartEl.appendChild(row);
    });
  }

  updateTotals();
}

function changeQuantity(index, amount) {
  cart[index].quantity += amount;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

function getSubtotal() {
  return cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
}

function getDiscount() {
  const value = Number(discountInput.value);

  if (isNaN(value) || value < 0) {
    return 0;
  }

  return Math.min(value, getSubtotal());
}

function getTotal() {
  return Math.max(0, getSubtotal() - getDiscount());
}

function getPayment() {
  const value = Number(paymentInput.value);

  if (isNaN(value) || value < 0) {
    return 0;
  }

  return value;
}

function updateTotals() {
  const subtotal = getSubtotal();
  const discount = getDiscount();
  const total = getTotal();
  const payment = getPayment();
  const change = Math.max(0, payment - total);

  const itemCount = cart.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  subtotalEl.textContent = money(subtotal);
  discountEl.textContent = money(discount);
  totalEl.textContent = money(total);
  changeEl.textContent = money(change);

  countEl.textContent =
    `${itemCount} ${itemCount === 1 ? "item" : "items"}`;
}

function clearCart() {
  cart = [];

  discountInput.value = 0;
  paymentInput.value = 0;

  renderCart();
}

function showToast(message) {
  let toast = document.getElementById("toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 2500);
}

function completeSale() {
  if (cart.length === 0) {
    showToast("Please add food items first.");
    return;
  }

  const total = getTotal();
  const payment = getPayment();

  if (payment < total) {
    showToast(
      `Payment is short by ${money(total - payment)}.`
    );
    return;
  }

  const sale = {
    id: Date.now(),
    date: new Date().toISOString(),
    items: cart.map(item => ({ ...item })),
    subtotal: getSubtotal(),
    discount: getDiscount(),
    total: total,
    payment: payment,
    change: payment - total
  };

  saveSale(sale);

  showToast(
    `Sale completed! Change: ${money(sale.change)}`
  );

  setTimeout(() => {
    clearCart();
  }, 800);
}

function saveSale(sale) {
  const sales = JSON.parse(
    localStorage.getItem("afriNoorSales") || "[]"
  );

  sales.push(sale);

  localStorage.setItem(
    "afriNoorSales",
    JSON.stringify(sales)
  );
}

searchEl.addEventListener("input", () => {
  const search = searchEl.value.trim().toLowerCase();

  const filtered = menuItems.filter(item =>
    item.name.toLowerCase().includes(search) ||
    item.category.toLowerCase().includes(search)
  );

  renderMenu(filtered);
});

discountInput.addEventListener("input", updateTotals);
paymentInput.addEventListener("input", updateTotals);

clearBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    return;
  }

  if (confirm("Clear the current order?")) {
    clearCart();
  }
});

checkoutBtn.addEventListener("click", completeSale);

updateDate();
renderMenu();
renderCart();
