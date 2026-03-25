import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  memo,
} from "react";
import "./App.css";

/* ================= SEARCH ================= */
const SearchBar = memo(({ search, onSearch, inputRef }) => {
  console.log("Render SearchBar");
  return (
    <input
      type="text"
      placeholder="search title..."
      value={search}
      ref={inputRef}
      onChange={onSearch}
    />
  );
});

/* ================= FILTER ================= */
const Filter = memo(({ category, categories, onFilter }) => {
  console.log("Render Filter");
  return (
    <select value={category} onChange={onFilter}>
      <option value="all">all</option>
      {categories.map((item, index) => (
        <option key={index} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
});

/* ================= CARD ITEM ================= */
const RestaurantCard = memo(({ res }) => {
  console.log("Render Card:", res.name);
  return (
    <div className="card">
      <div className="image">
        <img src={res.image} alt={res.name} />
      </div>
      <div>{res.name}</div>
      <div>{res.cuisine}</div>
      <div>⭐ {res.rating}</div>
      <div>{res.status}</div>
    </div>
  );
});

/* ================= LIST ================= */
const RestaurantList = memo(({ data }) => {
  console.log("Render List");
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        justifyContent: "space-around"
      }}
    >
      {data.map((res) => (
        <RestaurantCard key={res.id} res={res} />
      ))}
    </div>
  );
});

/* ================= MAIN ================= */
function App() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const inputRef = useRef();

  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/data/restaurants.json`);
      if (!res.ok) throw new Error("Không thể tải dữ liệu");

      const data = await res.json();
      setRestaurants(Array.isArray(data) ? data : [data]);
    } catch (err) {
      setError(err.message || "Đã xảy ra lỗi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    inputRef.current.focus();
  }, []);

  const categories = useMemo(() => {
    return [...new Set(restaurants.map((res) => res.status))];
  }, [restaurants]);

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const handleFilter = useCallback((e) => {
    setCategory(e.target.value);
  }, []);

  const resFilter = useMemo(() => {
    return restaurants
      .filter((res) =>
        res.name.toLowerCase().includes(search.toLowerCase())
      )
      .filter((res) => {
        if (category === "all") return true;
        return res.status === category;
      });
  }, [restaurants, search, category]);

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Restaurant List</h2>

      <form
        style={{
          display: "flex",
          gap: "8px",
          justifyContent: "center",
          marginBottom: "16px",
        }}
      >
        <SearchBar
          search={search}
          onSearch={handleSearch}
          inputRef={inputRef}
        />

        <Filter
          category={category}
          categories={categories}
          onFilter={handleFilter}
        />
      </form>

      {loading && <div>Loading restaurants...</div>}

      {!loading && error && (
        <div style={{ color: "red" }}>Cannot load restaurants</div>
      )}

      {!loading && !error && <RestaurantList data={resFilter} />}
    </div>
  );
}

export default App;

//Để giữ reference của function, tránh re-render không cần thiết khi truyền xuống component con (kết hợp React.memo).

//Vì việc filter list có thể tốn tài nguyên khi data lớn. useMemo giúp chỉ tính toán lại khi dependencies thay đổi, tránh tính lại mỗi lần render.