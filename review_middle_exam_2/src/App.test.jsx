import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

const mockRes = [
  {
    "id": 1,
    "title": "iPhone 15 Pro",
    "thumbnail": "https://source.unsplash.com/300x200/?iphone",
    "brand": "Apple",
    "category": "phone",
    "price": 1099,
    "discount": 0.1,
    "rating": 4.8,
    "stock": 15,
    "tags": ["new", "premium"]
  },
  {
    "id": 2,
    "title": "Samsung Galaxy S23",
    "thumbnail": "https://source.unsplash.com/300x200/?samsung",
    "brand": "Samsung",
    "category": "phone",
    "price": 899,
    "discount": 0.15,
    "rating": 4.6,
    "stock": 0,
    "tags": ["hot"]
  },
];

describe("Products", () => {
  beforeEach(() => {
    global.fetch = jest.fn(); // ✅ quan trọng
  });

  test("Loading products...", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true, // ✅ quan trọng
      json: async () => mockRes,
    });

    render(<App />);

    // expect(screen.getByText("Loading products...")).toBeInTheDocument();

    // await waitFor(() => {
    //   expect(screen.getByText("iPhone 15 Pro")).toBeInTheDocument();
    //   expect(screen.getByText("Samsung Galaxy S23")).toBeInTheDocument();
    // });
  });
});