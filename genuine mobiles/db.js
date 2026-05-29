// Lightweight client-side "database" using localStorage.
// Acts as the data layer for phones, bookings, and admin auth.

const DB = {
  KEYS: { PHONES: 'gm_phones', BOOKINGS: 'gm_bookings', AUTH: 'gm_auth' },

  init() {
    if (!localStorage.getItem(this.KEYS.PHONES)) {
      const seed = [
        { id: 1, name: 'iPhone 15 Pro', brand: 'Apple', price: 134900, ram: '8GB', storage: '256GB', color: 'Titanium', stock: 12, image: '📱', desc: 'A17 Pro chip, 48MP camera, titanium body.' },
        { id: 2, name: 'Galaxy S24 Ultra', brand: 'Samsung', price: 129999, ram: '12GB', storage: '256GB', color: 'Black', stock: 8, image: '📱', desc: '200MP camera, S-Pen, Snapdragon 8 Gen 3.' },
        { id: 3, name: 'OnePlus 12', brand: 'OnePlus', price: 64999, ram: '12GB', storage: '256GB', color: 'Emerald', stock: 15, image: '📱', desc: 'Hasselblad camera, 100W charging.' },
        { id: 4, name: 'Redmi Note 13 Pro', brand: 'Xiaomi', price: 25999, ram: '8GB', storage: '128GB', color: 'Blue', stock: 30, image: '📱', desc: '200MP camera, AMOLED display.' },
        { id: 5, name: 'Pixel 8', brand: 'Google', price: 75999, ram: '8GB', storage: '128GB', color: 'Hazel', stock: 6, image: '📱', desc: 'Tensor G3, best-in-class camera AI.' },
        { id: 6, name: 'Vivo V30', brand: 'Vivo', price: 33999, ram: '8GB', storage: '128GB', color: 'Peacock', stock: 20, image: '📱', desc: 'Aura Light portrait, curved AMOLED.' },
      ];
      localStorage.setItem(this.KEYS.PHONES, JSON.stringify(seed));
    }
    if (!localStorage.getItem(this.KEYS.BOOKINGS)) {
      localStorage.setItem(this.KEYS.BOOKINGS, '[]');
    }
  },

  // Phones
  getPhones() { return JSON.parse(localStorage.getItem(this.KEYS.PHONES) || '[]'); },
  getPhone(id) { return this.getPhones().find(p => p.id == id); },
  addPhone(phone) {
    const phones = this.getPhones();
    phone.id = Date.now();
    phones.push(phone);
    localStorage.setItem(this.KEYS.PHONES, JSON.stringify(phones));
  },
  updatePhone(id, data) {
    const phones = this.getPhones().map(p => p.id == id ? { ...p, ...data, id: p.id } : p);
    localStorage.setItem(this.KEYS.PHONES, JSON.stringify(phones));
  },
  deletePhone(id) {
    const phones = this.getPhones().filter(p => p.id != id);
    localStorage.setItem(this.KEYS.PHONES, JSON.stringify(phones));
  },

  // Bookings
  getBookings() { return JSON.parse(localStorage.getItem(this.KEYS.BOOKINGS) || '[]'); },
  addBooking(b) {
    const all = this.getBookings();
    b.id = Date.now();
    b.status = 'Pending';
    b.createdAt = new Date().toISOString();
    all.unshift(b);
    localStorage.setItem(this.KEYS.BOOKINGS, JSON.stringify(all));
  },
  updateBookingStatus(id, status) {
    const all = this.getBookings().map(b => b.id == id ? { ...b, status } : b);
    localStorage.setItem(this.KEYS.BOOKINGS, JSON.stringify(all));
  },
  deleteBooking(id) {
    const all = this.getBookings().filter(b => b.id != id);
    localStorage.setItem(this.KEYS.BOOKINGS, JSON.stringify(all));
  },

  // Auth (demo only)
  login(user, pass) {
    if (user === 'admin' && pass === 'admin123') {
      localStorage.setItem(this.KEYS.AUTH, 'true');
      return true;
    }
    return false;
  },
  isAuth() { return localStorage.getItem(this.KEYS.AUTH) === 'true'; },
  logout() { localStorage.removeItem(this.KEYS.AUTH); },
};

DB.init();

function formatPrice(n) { return '₹' + Number(n).toLocaleString('en-IN'); }
