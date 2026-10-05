const navbarToggle = document.querySelector(".navbar-toggle");
const navbarMenu = document.querySelector(".nav-links");

navbarToggle.addEventListener("click", () => {
  navbarToggle.classList.toggle("active");

  navbarMenu.classList.toggle("active");
});
// CART SCRIPT
let cart = [];
function toggleCart() {
  const drawer = document.getElementById("cart-drawer");
  const btn = document.getElementById("cart-toggle-btn");

  drawer.classList.toggle("open");
  btn.classList.toggle("active");
}

function toggleOrderFields(type) {
  const dineInFields = document.getElementById("dine-in-fields");
  const deliveryFields = document.getElementById("delivery-fields");
  if (dineInFields && deliveryFields) {
    if (type === "dinein") {
      dineInFields.style.display = "block";
      deliveryFields.style.display = "none";
    } else if (type === "delivery") {
      dineInFields.style.display = "none";
      deliveryFields.style.display = "block";
    }
  }
}
function submitOrder(event) {
  if (event) event.preventDefault();

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  const orderType = document.querySelector(
    'input[name="orderType"]:checked',
  )?.value;

  let orderItemsText = "";
  cart.forEach((item, index) => {
    orderItemsText += `${index + 1}. ${item.quantity}x ${item.name} - &#8358;${item.totalPrice.toLocaleString()}\n`;
  });

  const grandTotal = cart.reduce(
    (sum, item) => sum + (item.totalPrice || item.price * item.quantity),
    0,
  );

  let detailsText = "";
  if (orderType === "dinein") {
    const custName = document.getElementById("cust-name")?.value || "Customer";
    const tableNum = document.getElementById("table-num")?.value || "N/A";
    detailsText = `*Order Type:* Eat in shop\n *Customer Name:* ${custName}\n *Table Nunmber:* ${tableNum}`;
  } else {
    const address = document.getElementById("delivery-address")?.value || "N/A";
    const phone = document.getElementById("phone-num")?.value || "N/A";
    detailsText = `*Order Type:* Delivery\n *Phone:* ${phone}\n *Adderess:* ${address}`;
  }
  const message = `Hollo Niger Kitchen! New Oeder:\n\n
  *Order Items:*\n${orderItemsText}\n${detailsText}\n\n
  *Total Amount:* ${grandTotal.toLocaleString()}`;

  const whatsappUrl = `https://wa.me/2349132575207?text=${encodeURIComponent(message)}`;
  window.location.href = whatsappUrl;
}
// TIME SECTION SCRIPT
function updateStroStatus() {
  const now = new Date();
  const currentHour = now.getHours();

  const openHour = 8;
  const closeHour = 22;

  const statusDot = document.getElementById("statusDot");
  const statusText = document.getElementById("statusText");
  if (currentHour >= openHour && currentHour < closeHour) {
    statusDot.className = "status-indicator open";
    statusText.textContent = "We are OPEN for today";
    statusText.style.color = "#28a745";
  } else {
    statusDot.className = "status-indicator closed";
    statusText.textContent = "We are CLOSED for today";
    statusText.style.color = "#a50414";
  }
}
updateStroStatus();

// MENU CATEGORIES SCRIPT
function filterMenu(event, category) {
  const cards = document.querySelectorAll(".menu-cards");

  cards.forEach((card) => {
    if (card.classList.contains(category)) {
      card.style.display = "grid";
    } else {
      card.style.display = "none";
    }
  });
  const buttons = document.querySelectorAll(".cat-btn");
  buttons.forEach((btn) => {
    btn.classList.remove("active");
  });
  if (event && event.target) {
    const clickedBtn = event.target.closest(".cat-btn");
    if (clickedBtn) {
      event.target.classList.add("active");
    }
  }
}
window.addEventListener("DOMContentLoaded", () => {
  filterMenu(null, "soups");
});

function addToCart(foodName, price, selesctId) {
  let swallowChoice = "";
  if (selesctId) {
    const selectElement = document.getElementById(selesctId);
    if (selectElement && selectElement.value) {
      swallowChoice = `(${selectElement.value})`;
    }
  }
  const fullName = foodName + swallowChoice;
  const existingItem = cart.find((item) => item.name === fullName);

  if (existingItem) {
    existingItem.quantity += 1;
    existingItem.totalPrice = existingItem.quantity * existingItem.price;
  } else {
    cart.push({
      name: fullName,
      price: Number(price),
      quantity: 1,
      totalPrice: Number(price),
    });
  }
  renderCart();
}
function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}
function renderCart() {
  const badge = document.getElementById("cart-badge");
  const listContainer = document.getElementById("cart-items-list");
  const totalElement = document.getElementById("cart-total");

  let totalItems = 0;
  let grandTotal = 0;

  listContainer.innerHTML = "";

  cart.forEach((item, index) => {
    totalItems += item.quantity;
    grandTotal += item.totalPrice;

    listContainer.innerHTML += `
      <div class="cart-item-row" style="displat: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <span>${item.quantity}: ${item.name}</span>
        <div>
          <span style="margin-right: 10px;">&#8358; ${item.totalPrice.toLocaleString()}</span>
          <button onclick="removeFromCart(${index})" style="background: none; border: none; color: #ffffff; font-weight: bold; cursor: pointer; font-size: 23px;">&times;</button>
        </div>
      </div>
    `;
  });
  if (badge) badge.textContent = totalItems;
  if (totalElement) totalElement.textContent = `${grandTotal.toLocaleString()}`;
}
function submitOrder(event) {
  if (event) event.preventDefault();

  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  const orderType = document.querySelector(
    'input[name="orderType"]:checked',
  )?.value;

  let detailsText = "";
  if (orderType === "dinein") {
    const name = document.getElementById("cust-name")?.value;
    const table = document.getElementById("table-num")?.value;
    if (!name || !table) {
      alert("Please enter your Name and Table Number.");
      return;
    }
    detailsText = `*Order Type:* Eat in shop\n*Name:* ${name}\n*Table:* ${table}`;
  } else {
    const address = document.getElementById("delivery-address")?.value;
    const phone = document.getElementById("phone-num")?.value;
    if (!address || !phone) {
      alert("Please enter your Delivery Address and Phone Number.");
      return;
    }
    detailsText = `*Order Type:* Delivery\n*Phone:* ${phone}\n*Address:* ${address}`;
  }

  let orderItemsText = "";
  cart.forEach((item, index) => {
    orderItemsText += `${index + 1}. ${item.quantity}x ${item.name} - ₦${item.totalPrice.toLocaleString()}\n`;
  });

  const grandTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  const message = `Hello Niger Kitchen! New Order:\n\n*Order Items:*\n${orderItemsText}\n${detailsText}\n\n*Total Amount:* ₦${grandTotal.toLocaleString()}`;

  const whatsappUrl = `https://wa.me/2349132575207?text=${encodeURIComponent(message)}`;

  // THIS WAS MISSING: Actually launching WhatsApp!
  window.open(whatsappUrl, "_blank");
  cart = [];
  renderCart();
  toggleCart();
}
// BOOKING TABLE SCRIPT
function sendBookingWhatsApp(event) {
  event.preventDefault();
  const v = (id) => document.getElementById(id)?.value || "";
  const message = `Hello Niger Kitchen! New Table Booking Reservation:\n
  *Name:* ${v("bookName")}\n
  *Phone:* ${v("bookPhone")}\n
  *Date:* ${v("bookDate")}\n
  *Time:* ${v("bookTime")}\n
  *Guests:* ${v("bookGuests")} person(s)\n
  Please confirm my reservation!`;
  window.open(
    `https://wa.me/2349132575207?text=${encodeURIComponent(message)}`,
    "_blank",
  );
}
// CONTACT SCRIPT
function sendContactWhatsApp(event) {
  event.preventDefault();
  const x = (id) => document.getElementById(id)?.value || "";
  const message = `Hello Niger Kitchen! New Customer Contact Message:\n
  *Name:* ${x("contactName")}\n
  *Email:* ${x("contactEmail")}\n
  *Message:* ${x("contactMsg")}\n
  Please reply back when possible!`;
  window.open(
    `https://wa.me/2349132575207?text=${encodeURIComponent(message)}`,
    "_blank",
  );
}
