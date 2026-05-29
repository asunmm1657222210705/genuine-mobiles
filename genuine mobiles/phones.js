const listEl = document.getElementById('phone-list');
const searchEl = document.getElementById('search');
const brandEl = document.getElementById('brand-filter');

function render() {
  const all = DB.getPhones();
  const q = (searchEl.value || '').toLowerCase();
  const b = brandEl.value;
  const filtered = all.filter(p =>
    (!q || p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)) &&
    (!b || p.brand === b)
  );
  listEl.innerHTML = filtered.length ? filtered.map(p => `
    <div class="phone-card" onclick="showPhone(${p.id})">
      <div class="phone-img">${p.image || '📱'}</div>
      <div class="phone-info">
        <h3>${p.name}</h3>
        <div class="phone-brand">${p.brand}</div>
        <div class="phone-price">${formatPrice(p.price)}</div>
        <span class="phone-stock ${p.stock > 0 ? 'in-stock' : 'out-stock'}">
          ${p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}
        </span>
      </div>
    </div>
  `).join('') : '<p style="text-align:center;padding:40px;color:#999">No phones found</p>';
}

function showPhone(id) {
  const p = DB.getPhone(id);
  if (!p) return;
  document.getElementById('phone-detail').innerHTML = `
    <div class="phone-img" style="height:240px;border-radius:8px;margin-bottom:16px">${p.image || '📱'}</div>
    <h2>${p.name}</h2>
    <p class="phone-brand" style="margin:6px 0">${p.brand} · ${p.color}</p>
    <p class="phone-price" style="font-size:28px;margin:12px 0">${formatPrice(p.price)}</p>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:16px 0">
      <div><strong>RAM:</strong> ${p.ram}</div>
      <div><strong>Storage:</strong> ${p.storage}</div>
      <div><strong>Color:</strong> ${p.color}</div>
      <div><strong>Stock:</strong> ${p.stock}</div>
    </div>
    <p style="color:#555;margin-bottom:16px">${p.desc || ''}</p>
    <a href="service.html" class="btn btn-primary btn-block">Book / Enquire</a>
  `;
  document.getElementById('phone-modal').classList.add('active');
}
function closePhoneModal() { document.getElementById('phone-modal').classList.remove('active'); }

// init
const brands = [...new Set(DB.getPhones().map(p => p.brand))];
brandEl.innerHTML = '<option value="">All Brands</option>' + brands.map(b => `<option>${b}</option>`).join('');
searchEl.addEventListener('input', render);
brandEl.addEventListener('change', render);
render();
