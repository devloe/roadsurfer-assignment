# Home Assignment for roadsurfer
by Juan Pablo Lozano

## 🚀 Getting Started

Install dependencies and run the project:

```bash
npm install
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) (Vite default).

---

## 🧪 Testing

- **Unit tests**: Each component has its own unit tests to validate rendering and behavior.
- **Integration tests**: The main booking flow is covered with integration tests using [MSW](https://mswjs.io/) to mock API requests and responses.

Run tests with:

```bash
npm run test
```

---

## ⚙️ Technical Decisions

### Tech Stack

- React 19
- Vite
- TypeScript
- TailwindCSS
- Vitest + Testing Library
- MSW (Mock Service Worker)

### Dependencies
- The project does **not rely on any external dependencies** (other than dev dependencies for testing and tooling).

### Routing
- A router was **not included**, since it was not strictly required to make the app functional.
- In a real-world scenario, adding routing would improve usability, e.g., direct links to booking details would allow page refreshes without repeating the flow.

### State Management
- State management libraries were **optional**, and I did not see them as necessary for this scope.
- Most logic is encapsulated in **custom hooks**, initialized at the root level (`App`), and **prop drilling is avoided via component composition**.
- If the app grows (multiple views, global cache, complex async flows), I would consider React Query or Zustand.

### Project Structure & Principles
- The codebase follows a **domain-driven structure**.
- **Separation of concerns** is applied:
    - **UI layer** → React components (views and presentational logic).
    - **Business logic** → custom hooks.
    - **Infrastructure** → API layer and mocks.
- Components are grouped by feature/domain to keep logic and UI together.

### Performance Considerations
- Components are memoized when needed using `React.memo` or `useMemo` to avoid unnecessary re-renders.
- Async data fetching is centralized in hooks, minimizing repeated calls.

### UI & Responsiveness
- The UI is designed to be responsive for mobile and desktop.
- Semantic HTML and accessibility attributes (`aria-*`, labels, buttons) are used where relevant.

---

## 📂 Folder Structure

```
src/
  components/
    bookings/
      hooks/
      tests/
        BookingDetails.tsx
        BookingDetailsScreen.tsx
      index.ts
    calendar/
      hooks/
      tests/
      index.ts
    ...
  tests/
  types/
  App.tsx
  main.tsx
```

---

## 📝 Notes

- The focus of this assignment was to deliver a **clean, maintainable, and testable implementation** rather than over-engineering with unnecessary tools.
- The design is minimal but functional, with clear separation between business logic, infrastructure, and UI.
- Please be aware that the default calendar week is June 2021 since most of the bookings returned by the API are from that year.

### Next Steps / Potential Improvements
- Add a router to support direct linking to booking details and improve navigation.
- Introduce global state management (React Query or Zustand) if the app grows in complexity.
- Enhance styling with a design system or animations for better UX.
- Add e2e tests using Cypress or Playwright to cover the full user journey.