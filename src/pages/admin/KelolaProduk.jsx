import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Pencil,
  Trash2,
  Plus,
  Package,
  Image as ImageIcon,
} from "lucide-react";

import AdminLayout from "../../components/AdminLayout";
import ProductCard from "../../components/ProductCard";
import ProductModal from "../../components/ProductModal";
import { useProduk } from "../../context/ProdukContext";
import { getProductImage } from "../../utils/productImages";

const CATEGORY_GROUPS = {
  kambing: [
    {
      key: "kambingSusuPupuk",
      title: "Susu & Pupuk",
      description: "Produk susu segar dan pupuk kandang kambing.",
    },
    {
      key: "kambingQurban",
      title: "Qurban & Aqiqah",
      description: "Kambing siap qurban dan aqiqah, cukup umur & sehat.",
    },
  ],
  
  ayam: [
    {
      key: "ayamJual",
      title: "Ayam Kampung",
      description: "Ayam kampung untuk kebutuhan konsumsi.",
    },
    {
      key: "ayamPupuk",
      title: "Pupuk Ayam",
      description: "Pupuk organik dari kotoran ayam.",
    },
  ],
  maggot: [
    {
      key: "maggotProduk",
      title: "Produk Maggot",
      description: "Maggot basah dan maggot kering.",
    },
  ],
};

const PAGE_INFO = {
  kambing: {
    title: "Produk Kambing",
    subtitle: "Kelola produk kambing Juragan Kambing Sei Siak.",
    icon: "🐐",
  },
  ayam: {
    title: "Produk Ayam",
    subtitle: "Kelola produk ayam kampung dan pupuk ayam.",
    icon: "🐔",
  },
  maggot: {
    title: "Produk Maggot",
    subtitle: "Kelola produk maggot basah dan kering.",
    icon: "🪱",
  },
};

export default function KelolaProduk() {
  const { kategori } = useParams();
  const { data, addProduk, editProduk, deleteProduk } = useProduk();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  const groups = CATEGORY_GROUPS[kategori] || [];

  const pageInfo = PAGE_INFO[kategori] || {
    title: "Kelola Produk",
    subtitle: "Kelola produk Juragan Kambing Sei Siak.",
    icon: "📦",
  };

  const totalProduk = groups.reduce((total, group) => {
    return total + (data[group.key] || []).length;
  }, 0);

  function handleAdd(sectionKey) {
    setActiveSection(sectionKey);
    setEditingProduct(null);
    setModalOpen(true);
  }

  function handleEdit(product, sectionKey) {
    setActiveSection(sectionKey);
    setEditingProduct(product);
    setModalOpen(true);
  }

  function handleDelete(product, sectionKey) {
    const confirmDelete = window.confirm(
      `Apakah kamu yakin ingin menghapus "${product.nama}"?`
    );
    if (!confirmDelete) return;
    deleteProduk(sectionKey, product.id);
  }

  function handleSave(fields) {
    if (!activeSection) return;

    if (editingProduct) {
      editProduk(activeSection, editingProduct.id, fields);
    } else {
      addProduk(activeSection, fields);
    }

    setModalOpen(false);
    setEditingProduct(null);
    setActiveSection(null);
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-2xl ring-1 ring-primary/10"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, rgba(228,33,42,0.14), transparent 60%), #FBE1E2",
                  }}
                >
                  {pageInfo.icon}
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-primary">
                    Admin Panel
                  </p>
                  <h1 className="text-2xl sm:text-3xl font-bold text-ink font-heading tracking-tight">
                    {pageInfo.title}
                  </h1>
                </div>
              </div>
              <p className="text-sm text-muted">{pageInfo.subtitle}</p>
            </div>
          </div>
        </div>

        {/* ================= TOTAL ================= */}
        <div
          className="relative overflow-hidden bg-white border border-line rounded-2xl p-5 mb-8 flex items-center gap-4 shadow-sm"
        >
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#0072BC 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
          <div className="relative w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center">
            <Package size={23} className="text-primary" />
          </div>
          <div className="relative">
            <p className="text-xs text-muted uppercase tracking-wide">
              Total Produk
            </p>
            <p className="text-3xl font-bold text-ink tracking-tight">
              {totalProduk}
            </p>
          </div>
        </div>

        {/* ================= GROUP ================= */}
        <div className="space-y-10">
          {groups.map((group) => {
            const products = data[group.key] || [];

            return (
              <section key={group.key}>

                {/* SECTION HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary-tint flex items-center justify-center ring-1 ring-secondary/10">
                        <Package size={18} className="text-secondary-dark" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-ink">
                          {group.title}
                        </h2>
                        <p className="text-xs text-muted">
                          {products.length} produk
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted mt-3">
                      {group.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleAdd(group.key)}
                    className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
                  >
                    <Plus size={17} />
                    Tambah Produk
                  </button>
                </div>

                {/* ================= EMPTY ================= */}
                {products.length === 0 ? (
                  <div className="rounded-2xl border-2 border-dashed border-primary/30 bg-[#FDF9F2] p-10 text-center">
                    <div className="w-14 h-14 mx-auto rounded-full bg-white shadow-sm ring-1 ring-line flex items-center justify-center mb-4">
                      <Package size={25} className="text-muted" />
                    </div>
                    <h3 className="font-bold text-ink">Belum ada produk</h3>
                    <p className="text-sm text-muted mt-1 mb-5">
                      Tambahkan produk pertama pada kategori ini.
                    </p>
                    <button
                      onClick={() => handleAdd(group.key)}
                      className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-colors"
                    >
                      <Plus size={16} />
                      Tambah Produk
                    </button>
                  </div>
                ) : (
                  /* ================= PRODUCT GRID ================= */
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {products.map((product) => (
                      <div
                        key={`${group.key}-${product.id}`}
                        className="relative"
                      >
                        <ProductCard
                          item={product}
                          image={product.image || getProductImage(product)}
                          waMessage={(item) =>
                            `Halo, saya ingin pesan ${item.nama} (${item.harga}).`
                          }
                        />

                        {/* ACTION */}
                        <div className="absolute top-3 right-3 flex gap-2">
                          <button
                            onClick={() => handleEdit(product, group.key)}
                            className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/90 backdrop-blur-sm shadow-md border border-white/60 text-primary hover:bg-primary hover:text-white transition-colors"
                            title="Edit produk"
                          >
                            <Pencil size={15} />
                          </button>

                          <button
                            onClick={() => handleDelete(product, group.key)}
                            className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/90 backdrop-blur-sm shadow-md border border-white/60 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                            title="Hapus produk"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        {/* IMAGE STATUS */}
                        {!product.image && (
                          <div className="absolute bottom-24 left-3">
                            <div className="bg-white/95 backdrop-blur-sm border border-line rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 shadow-sm">
                              <ImageIcon size={13} className="text-muted" />
                              <span className="text-[10px] text-muted">
                                Belum ada gambar
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </div>

      {/* ================= MODAL ================= */}
      <ProductModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingProduct(null);
          setActiveSection(null);
        }}
        onSave={handleSave}
        initialData={editingProduct}
      />
    </AdminLayout>
  );
}