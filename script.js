const products = [
  { name: "Kampas Rem Racing", price: 125000, cat: "rem", icon: "assets/images/kampas-rem-racing.png" },
  { name: "Busi Iridium", price: 85000, cat: "mesin", icon: "assets/images/busi-iridium.jpg" },
  { name: "Lampu LED Motor", price: 175000, cat: "lampu", icon: "assets/images/led_motorr.jpg" },
  { name: "Handle Grip Racing", price: 95000, cat: "aksesoris", icon: "assets/images/handle_grip.webp" },
  { name: "Rantai Motor Heavy Duty", price: 210000, cat: "mesin", icon: "assets/images/rantai.webp" },
  { name: "Spion CNC Racing", price: 145000, cat: "aksesoris", icon: "assets/images/spion.jpg" },
  { name: "Lampu Sein LED", price: 75000, cat: "lampu", icon: "assets/images/lampu_sen.jpg" },
  { name: "Disc Brake Floating", price: 390000, cat: "rem", icon: "assets/images/piringan.jpg" }
];

let cart = [];
const rupiah = n => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
const label = { mesin: "Mesin", rem: "Rem", lampu: "Lampu", aksesoris: "Aksesoris" };

function renderProducts() {
  const q = document.getElementById("search").value.toLowerCase(), c = document.getElementById("category").value;
  const list = products.filter(p => (c === "all" || p.cat === c) && p.name.toLowerCase().includes(q));
  document.getElementById("productList").innerHTML = list.map((p, i) => `
 <div class="col-sm-6 col-lg-3"><div class="product-card">
   <div class="product-img"><span class="badge-cat">${label[p.cat]}</span><img src="${p.icon}" alt="${p.name}"></div>
   <div class="product-body"><h5>${p.name}</h5><div class="price mb-3">${rupiah(p.price)}</div>
   <button class="btn-add w-100" onclick="addCart(${products.indexOf(p)})"><i class="bi bi-cart-plus"></i> Tambah</button></div>
 </div></div>`).join("") || '<div class="col-12 text-center py-5"><h4>Produk tidak ditemukan.</h4></div>';
}
function addCart(i) { cart.push(products[i]); renderCart(); new bootstrap.Offcanvas("#cart").show() }
function renderCart() {
  document.getElementById("cartCount").textContent = cart.length;
  document.getElementById("cartItems").innerHTML = cart.length ? cart.map((p, i) => `<div class="cart-row"><i class="bi ${p.icon}"></i><div><b>${p.name}</b><br><span>${rupiah(p.price)}</span></div><button class="remove" onclick="removeCart(${i})"><i class="bi bi-trash"></i></button></div>`).join("") : "<div class='text-center text-muted py-5'><i class='bi bi-cart-x fs-1'></i><p>Keranjang masih kosong.</p></div>";
  document.getElementById("cartTotal").textContent = rupiah(cart.reduce((s, p) => s + p.price, 0));
}
function removeCart(i) { cart.splice(i, 1); renderCart() }
document.getElementById("search").addEventListener("input", renderProducts);
document.getElementById("category").addEventListener("change", renderProducts);
document.getElementById("checkout").addEventListener("click", () => { if (!cart.length) return alert("Keranjang masih kosong."); alert("Terima kasih! Pesanan kamu siap diproses."); cart = []; renderCart() });
renderProducts(); renderCart();