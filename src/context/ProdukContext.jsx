import { createContext, useContext, useState, useEffect } from "react";
import { initialProduk } from "../api/mockData";

const ProdukContext = createContext(null);

const STORAGE_KEY = "jk_produk";

function loadInitial() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      return JSON.parse(saved);
    }

    return initialProduk;
  } catch (error) {
    console.error("Gagal membaca data produk:", error);
    return initialProduk;
  }
}

export function ProdukProvider({ children }) {
  const [data, setData] = useState(loadInitial);

  // Sinkronkan data kalau ada tab lain yang mengubah localStorage
  useEffect(() => {
    function handleStorageChange(e) {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          setData(JSON.parse(e.newValue));
        } catch (error) {
          console.error("Gagal sinkronisasi data produk:", error);
        }
      }
    }

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  function persist(nextData) {
    setData(nextData);

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(nextData)
      );
    } catch (error) {
      console.error(
        "Gagal menyimpan data produk:",
        error
      );
    }
  }

  // =========================
  // TAMBAH PRODUK
  // =========================

  function addProduk(section, fields) {
    const items = data[section] || [];

    const nextId =
      items.length > 0
        ? Math.max(...items.map((p) => Number(p.id) || 0)) + 1
        : 1;

    const newProduct = {
      id: nextId,
      ...fields,
    };

    const nextData = {
      ...data,
      [section]: [
        ...items,
        newProduct,
      ],
    };

    persist(nextData);
  }

  // =========================
  // EDIT PRODUK
  // =========================

  function editProduk(section, id, fields) {
    const items = data[section] || [];

    const nextData = {
      ...data,
      [section]: items.map((product) =>
        product.id === id
          ? {
            ...product,
            ...fields,
          }
          : product
      ),
    };

    persist(nextData);
  }

  // =========================
  // HAPUS PRODUK
  // =========================

  function deleteProduk(section, id) {
    const items = data[section] || [];

    const nextData = {
      ...data,
      [section]: items.filter(
        (product) => product.id !== id
      ),
    };

    persist(nextData);
  }

  // =========================
  // RESET DATA
  // =========================

  function resetProduk() {
    localStorage.removeItem(STORAGE_KEY);
    setData(initialProduk);
  }

  return (
    <ProdukContext.Provider
      value={{
        data,
        addProduk,
        editProduk,
        deleteProduk,
        resetProduk,
      }}
    >
      {children}
    </ProdukContext.Provider>
  );
}

export function useProduk() {
  return useContext(ProdukContext);
}