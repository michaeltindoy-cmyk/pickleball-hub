# Pickleball Hub — Phase 1 (booking flow only)

Single-court booking: pick a date, pick an open hour, fill in name/contact/payment method, get a confirmation with a reservation number. No admin dashboard or online payment yet — that's Phase 2/3.

## Setup

1. **Install dependencies**
   ```
   npm install
   ```

2. **Create a Firebase project** (if you don't already have one for this)
   - console.firebase.google.com → Add project
   - Build → Firestore Database → Create database (start in test mode for now)

3. **Get your web app config**
   - Project settings → General → Your apps → Add app → Web
   - Copy the config object into `src/firebase.js`, replacing the placeholder values

4. **Set Firestore rules** (Firestore → Rules). This is intentionally open for Phase 1 since there's no login yet — lock it down once the admin dashboard (Phase 3) adds authentication:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /bookings/{bookingId} {
         allow read: if true;
         allow create: if request.resource.data.status == "confirmed";
         allow update, delete: if false; // only admin (Phase 3) can cancel/edit
       }
       match /counters/{counterId} {
         allow read: if true;
         allow write: if true;
       }
     }
   }
   ```

5. **Run it**
   ```
   npm run dev
   ```

## What's in here

- `src/lib/bookings.js` — all Firestore logic: generates the day's hour slots, live-subscribes to that day's bookings, and books a slot inside a transaction (so two people can't grab the same hour, and each booking gets a sequential daily reservation number like `PB-20260905-001`).
- `src/components/SlotGrid.jsx` — the hour-by-hour availability grid.
- `src/components/BookingForm.jsx` — name/contact/payment form shown after picking a slot.
- `src/components/Confirmation.jsx` — the confirmation screen with the reservation number.
- `src/pages/BookingPage.jsx` — wires it all together with the date picker.

## Adjusting for your actual court

Edit the constants at the top of `src/lib/bookings.js`:
- `OPEN_HOUR` / `CLOSE_HOUR` — operating hours
- `SLOT_PRICE` — price per hour (currently ₱300)
- `COURTS` — add more entries here later (e.g. a second court) and the grid gains a column automatically; no other code changes needed

## Next (not built yet)

- **Phase 2:** real payment method (GCash/PayMongo) instead of "pay at venue"
- **Phase 3:** admin dashboard — view/cancel reservations, block off maintenance slots, mark paid/unpaid, income totals. This will need Firebase Auth (or a PIN like your Smash Courts app) since the rules above block updates/deletes from the public app on purpose.
