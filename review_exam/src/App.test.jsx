import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

const mockRes = [
  {
    id: 1,
    name: "Pizza House",
    cuisine: "Italian",
    rating: 4.5,
    priceRange: "$$",
    status: "open",
    image: ""
  },
  {
    id: 2,
    name: "Sushi World",
    cuisine: "Japanese",
    rating: 4.8,
    priceRange: "$$$",
    status: "closed",
    image: ""
  },
];

describe("Products", () => {
  beforeEach(() => {
    global.fetch = jest.fn(); // ✅ quan trọng
  });

  test("renders loading then products", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true, // ✅ quan trọng
      json: async () => mockRes,
    });

    render(<App />);

    expect(screen.getByText("Loading restaurants...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Pizza House")).toBeInTheDocument();
      expect(screen.getByText("Sushi World")).toBeInTheDocument();
    });
  });
});