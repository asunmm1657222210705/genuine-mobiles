document.getElementById('booking-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const booking = Object.fromEntries(f.entries());
  DB.addBooking(booking);
  e.target.reset();
  document.getElementById('booking-success').style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setTimeout(() => { document.getElementById('booking-success').style.display = 'none'; }, 5000);
});
