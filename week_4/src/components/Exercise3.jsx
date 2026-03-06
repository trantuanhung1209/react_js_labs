import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const CartContext = createContext();

function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (existingItem) {
        // Nếu đã có trong cart, tăng quantity
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      } else {
        // Nếu chưa có, thêm mới với quantity = 1
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
        };
      }
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };

    case "INCREMENT":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };

    case "DECREMENT":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        ),
      };

    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };

    case "LOAD_FROM_STORAGE":
      return {
        ...state,
        items: action.payload,
      };

    default:
      return state;
  }
}

const initialState = {
  items: [],
};

// 5. CartProvider component
function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const savedCart = localStorage.getItem("shopping-cart");
    if (savedCart) {
      dispatch({ type: "LOAD_FROM_STORAGE", payload: JSON.parse(savedCart) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("shopping-cart", JSON.stringify(state.items));
  }, [state.items]);

  const totalPrice = state.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const totalItems = state.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{ cart: state, dispatch, totalPrice, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
}

function ProductList() {
  const { dispatch } = useCart();

  const products = [
    { id: 1, name: "iPhone 15", price: 25000000 },
    { id: 2, name: "MacBook Pro", price: 45000000 },
    { id: 3, name: "AirPods", price: 5000000 },
  ];

  return (
    <div>
      <h2>Sản phẩm</h2>
      {products.map((product) => (
        <div key={product.id}>
          {product.name} - {product.price.toLocaleString()}đ
          <button
            onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
          >
            Thêm
          </button>
        </div>
      ))}
    </div>
  );
}

function ShoppingCart() {
  const { cart, dispatch, totalPrice, totalItems } = useCart();

  if (cart.items.length === 0) {
    return (
      <div>
        <h2>Giỏ hàng trống</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>Giỏ hàng ({totalItems})</h2>
      {cart.items.map((item) => (
        <div key={item.id}>
          {item.name} - {item.price.toLocaleString()}đ x {item.quantity}
          <button
            onClick={() => dispatch({ type: "DECREMENT", payload: item.id })}
          >
            -
          </button>
          <button
            onClick={() => dispatch({ type: "INCREMENT", payload: item.id })}
          >
            +
          </button>
          <button
            onClick={() =>
              dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
            }
          >
            Xóa
          </button>
        </div>
      ))}
      <h3>Tổng: {totalPrice.toLocaleString()}đ</h3>
      <button onClick={() => dispatch({ type: "CLEAR_CART" })}>
        Xóa tất cả
      </button>
    </div>
  );
}

function Exercise3() {
  return (
    <>
      <CartProvider>
        <h1>Shopping Cart</h1>
        <div className=""
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}
        >
          <ProductList />
          <ShoppingCart />
        </div>
      </CartProvider>
    </>
  );
}

export default Exercise3;
