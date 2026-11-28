# GameHub - Game Store

| Item         | Details                    |
| ------------ | -------------------------- |
| Group number | G33                        |
| Topic        | 08 - Game Store            |
| Member 1     | Muhammad Asad (24I-2122)   |
| Member 2     | Ibrahim Shahzad (24I-2076) |
| Member 3     | Khuzaymah Umer (24I-2079)  |

## Description

GameHub is a simple online game store built with Next.js and Tailwind CSS.
Users can browse a catalogue of 16 games, search and filter them by platform, sort by price or rating, add games to a cart and place an order through a validated checkout form.
There is no backend. All data is mock data in `data/games.js` and placing an order only updates React state.

## How to run

```bash
npm install
npm run dev
```

Then open http://localhost:3000. To check the production build, run `npm run build`.

## Routes

| Route         | What it shows                                                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `/`           | Home page with hero, top rated games and platforms                                                                             |
| `/games`      | Full game catalogue with search, platform filter and sort                                                                      |
| `/games/[id]` | Game detail page (dynamic route): star rating, description, key features, game info and screenshots. Shows 404 for unknown IDs |
| `/cart`       | Cart with quantities, remove, clear and order summary                                                                          |
| `/checkout`   | Checkout form with client side validation and order confirmation                                                               |
| `/about`      | About the store                                                                                                                |
| any other URL | Custom 404 page (`app/not-found.jsx`)                                                                                          |

`app/games/loading.jsx` shows a skeleton while the games route loads.

## Components (`components/`)

| Component                        | Type   | Purpose                                                                                                   |
| -------------------------------- | ------ | --------------------------------------------------------------------------------------------------------- |
| `Navbar`                         | Server | Top navigation with links (uses `next/link`)                                                              |
| `Footer`                         | Server | Shared footer                                                                                             |
| `Button`                         | Server | Reusable button or link with `primary` / `secondary` / `danger` variants                                  |
| `PageHeader`                     | Server | Page title and subtitle, reused on Games, Cart, Checkout and About with different props                   |
| `GameCard`                       | Server | Game cover (`next/image`), title, platforms and price                                                     |
| `PlatformBadge`                  | Server | Small platform label                                                                                      |
| `PriceTag`                       | Server | Formatted price, `small` or `large` size                                                                  |
| `SearchBar`                      | Server | Controlled search input with a search icon                                                                |
| `StarRating`                     | Server | Shows the rating as star emojis plus the number                                                           |
| `Modal`                          | Client | Reusable popup dialog, closes on Escape or outside click                                                  |
| `HeroSlideshow`                  | Client | Auto-playing image slideshow on the home page with arrows and dots                                        |
| `useCart hook with localStorage` | Client | Cart state with browser localStorage                                                                      |
| `CartCount`                      | Client | Cart link in navbar showing the item count                                                                |
| `GameBrowser`                    | Client | Search, filter and sort state for the listing page                                                        |
| `AddToCartButton`                | Client | Asks for the platform in a popup, adds the game, then shows an "Added to cart" popup with a Remove option |
| `CartView`                       | Client | Cart list with platform, quantity buttons and a bin icon to remove                                        |
| `CheckoutForm`                   | Client | Controlled form with validation and fake order                                                            |

### Why these are Client Components

- `useCart hook with localStorage`, `CartCount`, `CartView`: the cart is shared state that changes on clicks, so it needs `useState` and localStorage, which is accessed in the browser.
- `GameBrowser`: search text, platform and sort are `useState` values that change on input events.
- `AddToCartButton`: needs `onClick` handlers and state for the selected platform and which popup step is open.
- `Modal`: listens for the Escape key with `useEffect` and handles clicks.
- `HeroSlideshow`: keeps the current slide in `useState` and changes it with a timer in `useEffect`.
- `CheckoutForm`: controlled inputs, `onChange` / `onSubmit` handlers and error state.

Every page file (`app/**/page.jsx`) is a Server Component and exports `metadata`.

## Contribution

| Member    | Pages and components                                                                                                   |
| --------- | ---------------------------------------------------------------------------------------------------------------------- |
| Ibrahim   | Button, CartCount, GameCard, HeroSlideshow, Navbar, PlatformBadge, PriceTag, useCart hook with localStorage, Home Page |
| Asad      | AddToCartButton, GameBrowser, Modal, PageHeader, Loading, Games Listing Page, Game Details Page                        |
| Khuzaymah | CartView, CheckoutForm, Cart Page, Checkout Page, Not found page, Readme                                               |

## Links

- Repository: https://github.com/ibrahimshahzadraja/game-hub
- Video demo:
- Vercel: https://game-hub-weld-mu-47.vercel.app/
