import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import UserPosts from "./UserPosts";

// Mock fetch API
const mockData = [
  { userId: 1, id: 1, title: "Post 1", body: "Body 1" },
  { userId: 2, id: 2, title: "Post 2", body: "Body 2" },
  { userId: 1, id: 3, title: "Another post", body: "Body 3" },
];

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockData),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("UserPosts Component", () => {
  test("renders loading state initially", () => {
    render(<UserPosts />);
    expect(screen.getByText(/đang tải dữ liệu/i)).toBeInTheDocument();
  });

  test("renders posts after fetch", async () => {
    render(<UserPosts />);
    await waitFor(() => {
      expect(screen.getByText("Post 1")).toBeInTheDocument();
      expect(screen.getByText("Post 2")).toBeInTheDocument();
      expect(screen.getByText("Another post")).toBeInTheDocument();
    });
  });

  test("filters posts by userId", async () => {
    render(<UserPosts />);
    await waitFor(() => screen.getByText("Post 1"));

    // Chọn userId = 1
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "1" } });

    // Kiểm tra chỉ còn các post của userId = 1
    expect(screen.getByText("Post 1")).toBeInTheDocument();
    expect(screen.getByText("Another post")).toBeInTheDocument();
    expect(screen.queryByText("Post 2")).not.toBeInTheDocument();
  });

  test("filters posts by search input", async () => {
    render(<UserPosts />);
    await waitFor(() => screen.getByText("Post 1"));

    // Search "Another"
    fireEvent.change(screen.getByPlaceholderText(/search title/i), {
      target: { value: "Another" },
    });

    expect(screen.getByText("Another post")).toBeInTheDocument();
    expect(screen.queryByText("Post 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Post 2")).not.toBeInTheDocument();
  });

  test("shows error message if fetch fails", async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({ ok: false })
    );

    render(<UserPosts />);
    await waitFor(() => {
      expect(screen.getByText(/không thể tải dữ liệu/i)).toBeInTheDocument();
    });
  });
});