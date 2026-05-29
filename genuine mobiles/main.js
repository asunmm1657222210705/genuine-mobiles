// Featured phones on homepage
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('featured-phones');
  if (!container) return;
  const phones = DB.getPhones().slice(0, 4);
  container.innerHTML = phones.map(p => `
    <a href="phones.html" class="phone-card">
      <div class="phone-img">${p.image || '📱'}</div>
      <div class="phone-info">
        <h3>${p.name}</h3>
        <div class="phone-brand">${p.brand}</div>
        <div class="phone-price">${formatPrice(p.price)}</div>
      </div>
    </a>
  `).join('');
});
