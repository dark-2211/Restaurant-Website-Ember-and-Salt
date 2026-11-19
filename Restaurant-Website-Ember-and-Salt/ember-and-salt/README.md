# Ember & Salt — Restaurant Website

A fictional Karachi charcoal kitchen, built with plain HTML, CSS, and JavaScript. Extract the ZIP and open `index.html` in a modern browser. No dependencies or build step.

- **Menu:** Eight dishes across four categories with Pakistani rupee pricing. Category buttons filter the menu without reloading the page.
- **Layout:** Responsive hero and photo cards, a chef story, and three fictional guest testimonials.
- **Reservation demo:** Validates the guest details, dates and service times against the Karachi timezone. It previews the entry in the page without sending, saving, or checking availability.
- **Accessibility:** Keyboard navigation, labelled controls, live status feedback, and reduced-motion support.

## Source

- `index.html` — page structure, copy, menu prices, and time slots.
- `styles.css` — responsive grid, typography, and motion.
- `script.js` — mobile navigation, filtering, and reservation validation.
- `assets/` — locally bundled WebP photographs generated for this fictional project.

For a real restaurant, replace the sample copy and testimonials, confirm hours and pricing, and connect the form to a reservation service for actual availability and confirmations.

Further reading: [CSS-Tricks](https://css-tricks.com/).

## Icons

The interface uses [Font Awesome Free 6.7.2](https://cdnjs.com/libraries/font-awesome/6.7.2)
for the navigation, menu categories, service details, and reservation button.
An internet connection is needed for the additional icons. Offline, the page
and interactions still work and the original navigation glyphs are retained.

The type pairing uses locally bundled Noto Serif and Noto Sans. They load
without internet access. Font notices are in `assets/fonts/LICENSE-Noto.txt`.
