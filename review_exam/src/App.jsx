import React, { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import ListCard from "./assets/components/ListCard";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/data/restaurants.json");
      if (!res.ok) {
        throw new Error("Không thể tải dữ liệu");
      }
      const dataJson = await res.json();
      const dataNormalized = Array.isArray(dataJson) ? dataJson : [dataJson];
      console.log(dataJson);

      setData(dataNormalized);
    } catch (error) {
      setError(error.message || "Đã xảy ra lỗi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetchData();
    }, 300);
    inputRef.current.focus();
  }, []);

  const categories = useMemo(() => {
    return ["all", ...new Set(data.map((res) => res.status))];
  }, [data])

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
  }

  const handleFilter = (e) => {
    const value = e.target.value;
    setCategory(value);
  }

  const dataFiltered = useMemo(() => {
    return data
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()) || item.cuisine.toLowerCase().includes(search.toLowerCase()))
    .filter((item) => category === "all" ? true : item.status === category);
  }, [data, search, category])

  return (
    <>
      <div className="main">
        <div className="inner-content">
          <h1
            style={{
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            List products
          </h1>

          <form style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px"
          }}>
            <input type="text" value={search}
            placeholder="search name..."
            ref={inputRef} 
            onChange={handleSearch}
            />
            <select value={category} onChange={handleFilter}>
              {categories.map((item, idx) => (
                <option value={item} key={idx}>{item}</option>
              ))}
            </select>
          </form>

          {loading && <div>Loading restaurants...</div>}

          {!loading && error && (
            <div style={{ color: "red" }}>Cannot load restaurants</div>
          )}

          {!loading && !error && (
            <ListCard data={dataFiltered} />
          )}
        </div>
      </div>
    </>
  );
}

export default App;


//Để giữ reference của function, tránh re-render không cần thiết khi truyền xuống component con (kết hợp React.memo).

//Vì việc filter list có thể tốn tài nguyên khi data lớn. useMemo giúp chỉ tính toán lại khi dependencies thay đổi, tránh tính lại mỗi lần render.
