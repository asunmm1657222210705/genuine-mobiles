# Genuine Mobile's - Mobile Shop Website

A complete mobile shop website with admin dashboard.

## Features
- 🏠 Homepage with featured phones
- 📱 Phone catalog with search & brand filter
- 📋 Online service booking form
- 📞 Contact page
- 🔐 Admin dashboard (add/edit/delete phones, manage bookings)
- 💾 Built-in client-side database (localStorage)

## How to Run
Just open `index.html` in any browser. No server needed!

For best results, serve via a local server:
```
python -m http.server 8000
```
Then open http://localhost:8000

## Admin Access
- URL: `admin/login.html`
- Username: `admin`
- Password: `admin123`

## File Structure
```
genuine-mobiles/
├── index.html          (Home)
├── phones.html         (Phone catalog)
├── service.html        (Booking form)
├── contact.html        (Contact info)
├── css/style.css       (All styles)
├── js/
│   ├── db.js           (Database layer - localStorage)
│   ├── main.js         (Homepage logic)
│   ├── phones.js       (Catalog logic)
│   └── booking.js      (Booking form)
└── admin/
    ├── login.html
    ├── dashboard.html
    ├── phones.html     (Manage phones - CRUD)
    └── bookings.html   (Manage bookings)
```

## Database
Data is stored in browser localStorage:
- `gm_phones` - Phone inventory
- `gm_bookings` - Service bookings
- `gm_auth` - Admin session

To reset all data, open browser console and run: `localStorage.clear()`

## Upgrading to Real Backend
Replace `js/db.js` functions with `fetch()` calls to your API
(e.g. PHP+MySQL, Node+MongoDB, Firebase) — UI remains the same.
