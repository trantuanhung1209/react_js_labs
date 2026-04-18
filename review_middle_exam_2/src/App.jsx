import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const inputRef = useRef();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/data.json");
      if (!res.ok) throw new Error("Không thể tải dữ liệu");
      const dataJson = await res.json();
      const normalized = Array.isArray(dataJson) ? dataJson : [dataJson];
      setProducts(normalized);
      console.log(normalized);
    } catch (err) {
      setError(err.message || "Đã xảy ra lỗi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    inputRef.current?.focus();
    setTimeout(() => {
      fetchData();
    }, 300);
  }, []);

  const categories = useMemo(() => {
    return ["all", ...new Set(products.map((item) => item.category))];
  }, [products]);

  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    setSearch(value);
  });

  const handleFilter = useCallback((e) => {
    const value = e.target.value;
    setCategory(value);
  });

  const productFiltered = useMemo(() => {
    return products
      .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
      .filter((item) =>
        category === "all" ? true : item.category === category,
      );
  }, [search, category, products]);

  return (
    <>
      <div className="main">
        <h1>List products</h1>

        <form className="inner-form">
          <input
            type="text"
            placeholder="search name..."
            value={search}
            ref={inputRef}
            onChange={handleSearch}
          />
          <select value={category} onChange={handleFilter}>
            {categories.map((item, idx) => (
              <option value={item} key={idx}>
                {item}
              </option>
            ))}
          </select>
        </form>

        {loading && <div>Loading products...</div>}
        {!loading && error && (
          <div
            style={{
              color: "red",
            }}
          >
            Can not loading products!
          </div>
        )}

        {!loading && !error && (
          <div className="inner-content">
            <div className="inner-list">
              {productFiltered.map((item) => (
                <div className="inner-card" key={item.id}>
                  <div className="inner-image">
                    <img src={item.thumbnail} alt={item.title} />
                  </div>

                  <div className="inner-info">
                    <p>{item.title}</p>

                    <p>{item.brand}</p>
                    <p>{item.category}</p>
                    <p>{item.discount}</p>
                    <p>{item.rating}</p>
                    <p>{item.stock}</p>
                    <div className="" 
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                    >
                      {item.tags.map((tag, idx) => (
                        <p key={idx}>{tag}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;

//Để giữ reference của function, tránh re-render không cần thiết khi truyền xuống component con (kết hợp React.memo).