'use strict';

document.documentElement.classList.add('js');

const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('#nav');

function setNav(open) {
  navToggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
}

navToggle.addEventListener('click', () => {
  setNav(navToggle.getAttribute('aria-expanded') === 'false');
});

nav.addEventListener('click', (event) => {
  if (event.target.closest('a') && navToggle.getAttribute('aria-expanded') === 'true') {
    const section = document.querySelector(event.target.closest('a').hash);
    setNav(false);
    if (section) {
      section.tabIndex = -1;
      section.focus({ preventScroll: true });
    }
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
    setNav(false);
    navToggle.focus();
  }
});

const filterGroup = document.querySelector('.filters');
const menuGrid = document.querySelector('.menu-grid');
const menuCards = [...document.querySelectorAll('[data-category]')];
const menuStatus = document.querySelector('#menu-status');
filterGroup.hidden = false;

filterGroup.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-filter]');
  if (!button) return;

  const category = button.dataset.filter;
  for (const control of filterGroup.querySelectorAll('button')) {
    control.setAttribute('aria-pressed', String(control === button));
  }
  for (const card of menuCards) {
    card.hidden = category !== 'all' && card.dataset.category !== category;
  }
  menuGrid.classList.toggle('is-filtered', category !== 'all');
  menuStatus.textContent = category === 'all'
    ? 'Showing all four menu categories.'
    : 'Showing ' + button.textContent.trim() + '.';
});

const form = document.querySelector('#booking');
const status = document.querySelector('#booking-status');
const date = form.elements.namedItem('date');
const time = form.elements.namedItem('time');
const nameField = form.elements.namedItem('name');
const guests = form.elements.namedItem('guests');

const karachiClock = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Karachi', year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
});
const humanDate = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'UTC', weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
});

function karachiNow() {
  const parts = Object.fromEntries(karachiClock.formatToParts().map(({ type, value }) => [type, value]));
  return { date: [parts.year, parts.month, parts.day].join('-'), time: parts.hour + ':' + parts.minute };
}

function validateBooking() {
  const now = karachiNow();
  date.min = now.date;
  const selectedDay = new Date(date.value + 'T12:00:00Z');
  date.setCustomValidity(
    date.value && date.value < now.date ? 'Choose today or a future date.' :
    date.value && selectedDay.getUTCDay() === 1 ? 'The kitchen is closed on Mondays. Choose another day.' : ''
  );

  for (const slot of time.options) {
    slot.disabled = Boolean(slot.value && date.value === now.date && slot.value <= now.time);
  }
  time.setCustomValidity(
    time.selectedOptions[0]?.disabled ? 'Choose a seating time that has not passed.' : ''
  );
  nameField.setCustomValidity(
    nameField.value && !nameField.value.trim() ? 'Enter your name.' : ''
  );
}

form.addEventListener('input', () => {
  status.textContent = '';
  validateBooking();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  validateBooking();
  if (!form.reportValidity()) return;

  const day = humanDate.format(new Date(date.value + 'T12:00:00Z'));
  const seating = time.selectedOptions[0].textContent;
  const party = guests.value === '1' ? '1 guest' : guests.value + ' guests';
  status.textContent = 'Preview: ' + party + ' on ' + day + ' at ' + seating +
    ' (Karachi time). No booking was made.';
});

validateBooking();
form.querySelector('[type=submit]').disabled = false;

// Load icons without delaying the page or the reservation form.
const iconSheet = document.createElement('link');
iconSheet.rel = 'stylesheet';
iconSheet.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css';
iconSheet.addEventListener('load', async () => {
  try {
    const fonts = await document.fonts.load('900 16px "Font Awesome 6 Free"', '\\uf0c9');
    if (fonts.length) document.documentElement.classList.add('icons-ready');
  } catch {
    // Original arrows and menu glyphs remain available offline.
  }
});
document.head.append(iconSheet);
