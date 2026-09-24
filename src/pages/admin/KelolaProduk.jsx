import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Pencil,
  Trash2,
  Plus,
  Package,
  Image as ImageIcon,
  X,
  Eye,
  Tag,
  CircleDollarSign,
  Layers,
  Scale,
  UserRound,
  CalendarDays,
} from "lucide-react";

import AdminLayout from "../../components/AdminLayout";
import ProductModal from "../../components/ProductModal";
import { useProduk } from "../../context/ProdukContext";
import { useKategori } from "../../context/KategoriContext";
import { getProductImage } from "../../utils/productImages";

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

  const {
    data,
    addProduk,
    editProduk,
    deleteProduk,
  } = useProduk();

  const {
    getByAnimal,
    loading: loadingKategori,
  } = useKategori();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [activeSection, setActiveSection] = useState(null);

  // Produk yang sedang dilihat detailnya
  const [detailProduct, setDetailProduct] = useState(null);

  // =========================================================
  // KATEGORI PRODUK
  // =========================================================

  const groups = getByAnimal(kategori)
    .filter((k) => k.tipe === "produk")
    .map((k) => ({
      key: k.section_key,
      title: k.judul,
      description: k.deskripsi,
    }));

  const pageInfo =
    PAGE_INFO[kategori] || {
      title: "Kelola Produk",
      subtitle: "Kelola produk Juragan Kambing Sei Siak.",
      icon: "📦",
    };

  // =========================================================
  // TOTAL PRODUK
  // =========================================================

  const totalProduk = groups.reduce((total, group) => {
    return total + (data[group.key] || []).length;
  }, 0);

  // =========================================================
  // TAMBAH PRODUK
  // =========================================================

  function handleAdd(sectionKey) {
    setActiveSection(sectionKey);
    setEditingProduct(null);
    setModalOpen(true);
  }

  // =========================================================
  // EDIT PRODUK
  // =========================================================

  function handleEdit(product, sectionKey) {
    setActiveSection(sectionKey);
    setEditingProduct(product);
    setModalOpen(true);
  }

  // =========================================================
  // HAPUS PRODUK
  // =========================================================

  function handleDelete(product, sectionKey) {
    const confirmDelete = window.confirm(
      `Apakah kamu yakin ingin menghapus "${product.nama}"?`
    );

    if (!confirmDelete) return;

    deleteProduk(sectionKey, product.id);
  }

  // =========================================================
  // SIMPAN PRODUK
  // =========================================================

  function handleSave(fields) {
    if (!activeSection) return;

    if (editingProduct) {
      editProduk(
        activeSection,
        editingProduct.id,
        fields
      );
    } else {
      addProduk(
        activeSection,
        fields
      );
    }

    setModalOpen(false);
    setEditingProduct(null);
    setActiveSection(null);
  }

  // =========================================================
  // TUTUP MODAL TAMBAH / EDIT
  // =========================================================

  function closeProductModal() {
    setModalOpen(false);
    setEditingProduct(null);
    setActiveSection(null);
  }

  // =========================================================
  // TUTUP DETAIL
  // =========================================================

  function closeDetail() {
    setDetailProduct(null);
  }

  return (
    <AdminLayout>

      <div className="max-w-7xl mx-auto">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="mb-8">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

            <div>

              <div className="flex items-center gap-3 mb-3">

                <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center text-2xl">
                  {pageInfo.icon}
                </div>

                <div>

                  <p className="text-xs font-bold uppercase tracking-wider text-primary">
                    Admin Panel
                  </p>

                  <h1 className="text-2xl sm:text-3xl font-bold text-ink font-heading">
                    {pageInfo.title}
                  </h1>

                </div>

              </div>

              <p className="text-sm text-muted">
                {pageInfo.subtitle}
              </p>

            </div>

          </div>

        </div>


        {/* =====================================================
            TOTAL PRODUK
        ====================================================== */}

        <div className="bg-white border border-line rounded-2xl p-5 mb-8 flex items-center gap-4 shadow-sm">

          <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center">

            <Package
              size={23}
              className="text-primary"
            />

          </div>

          <div>

            <p className="text-xs text-muted uppercase tracking-wide">
              Total Produk
            </p>

            <p className="text-2xl font-bold text-ink">
              {totalProduk}
            </p>

          </div>

        </div>


        {/* =====================================================
            EMPTY KATEGORI
        ====================================================== */}

        {!loadingKategori &&
          groups.length === 0 && (

            <div className="bg-white border border-line rounded-2xl p-10 text-center">

              <p className="text-sm text-muted mb-4">
                Belum ada kategori produk untuk {kategori}.
                Tambahkan dulu lewat menu "Pengaturan Tab".
              </p>

              <a
                href={`/admin/kategori/${kategori}`}
                className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-dark transition-colors"
              >
                Buka Pengaturan Tab
              </a>

            </div>

          )}


        {/* =====================================================
            GROUP PRODUK
        ====================================================== */}

        <div className="space-y-10">

          {groups.map((group) => {

            const products = data[group.key] || [];

            return (

              <section key={group.key}>

                {/* =================================================
                    SECTION HEADER
                ================================================== */}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">

                  <div>

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-xl bg-white border border-line flex items-center justify-center">

                        <Package
                          size={19}
                          className="text-primary"
                        />

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


                  {/* TAMBAH */}

                  <button
                    onClick={() =>
                      handleAdd(group.key)
                    }
                    className="
                      inline-flex
                      items-center
                      justify-center
                      gap-2
                      bg-primary
                      hover:bg-primary-dark
                      text-white
                      px-5
                      py-2.5
                      rounded-xl
                      text-sm
                      font-semibold
                      shadow-sm
                      transition-all
                      hover:-translate-y-0.5
                    "
                  >

                    <Plus size={17} />

                    Tambah Produk

                  </button>

                </div>


                {/* =================================================
                    EMPTY PRODUK
                ================================================== */}

                {products.length === 0 ? (

                  <div className="bg-white border border-line rounded-2xl p-10 text-center">

                    <div className="w-14 h-14 mx-auto rounded-full bg-cream flex items-center justify-center mb-4">

                      <Package
                        size={25}
                        className="text-muted"
                      />

                    </div>

                    <h3 className="font-bold text-ink">
                      Belum ada produk
                    </h3>

                    <p className="text-sm text-muted mt-1 mb-5">
                      Tambahkan produk pertama pada kategori ini.
                    </p>

                    <button
                      onClick={() =>
                        handleAdd(group.key)
                      }
                      className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors"
                    >

                      <Plus size={16} />

                      Tambah Produk

                    </button>

                  </div>

                ) : (

                  /* =================================================
                     PRODUCT GRID ADMIN
                  ================================================== */

                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

                    {products.map((product) => {

                      const imageUrl =
                        getProductImage(product);

                      return (

                        <div
                          key={`${group.key}-${product.id}`}
                          className="
                            bg-white
                            border
                            border-line
                            rounded-2xl
                            overflow-hidden
                            shadow-sm
                            hover:shadow-md
                            transition-shadow
                          "
                        >

                          {/* IMAGE */}

                          <div className="relative h-48 bg-cream overflow-hidden">

                            {imageUrl ? (

                              <img
                                src={imageUrl}
                                alt={product.nama}
                                className="w-full h-full object-cover"
                              />

                            ) : (

                              <div className="w-full h-full flex flex-col items-center justify-center text-muted">

                                <ImageIcon
                                  size={32}
                                  className="mb-2"
                                />

                                <span className="text-xs">
                                  Belum ada gambar
                                </span>

                              </div>

                            )}

                            {!product.image &&
                              imageUrl === null && (

                                <div className="absolute bottom-3 left-3">

                                  <div className="bg-white/95 backdrop-blur-sm border border-line rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 shadow-sm">

                                    <ImageIcon
                                      size={13}
                                      className="text-muted"
                                    />

                                    <span className="text-[10px] text-muted">
                                      Belum ada gambar
                                    </span>

                                  </div>

                                </div>

                              )}

                          </div>


                          {/* PRODUCT INFO */}

                          <div className="p-5">

                            <div className="mb-4">

                              <h3 className="font-bold text-ink text-lg line-clamp-1">
                                {product.nama ||
                                  "Produk tanpa nama"}
                              </h3>

                              {product.deskripsi && (

                                <p className="text-sm text-muted mt-1 line-clamp-2">
                                  {product.deskripsi}
                                </p>

                              )}

                            </div>


                            {/* HARGA */}

                            {product.harga && (

                              <div className="flex items-center gap-2 mb-2">

                                <CircleDollarSign
                                  size={16}
                                  className="text-primary"
                                />

                                <span className="text-sm font-semibold text-primary">
                                  {product.harga}
                                </span>

                              </div>

                            )}


                            {/* INFORMASI TAMBAHAN */}

                            <div className="space-y-1.5 mb-4">

                              {product.bobot && (

                                <div className="flex items-center gap-2">

                                  <Scale
                                    size={15}
                                    className="text-muted"
                                  />

                                  <span className="text-xs text-muted">
                                    Bobot:{" "}
                                    <span className="font-semibold text-ink">
                                      {product.bobot}
                                    </span>
                                  </span>

                                </div>

                              )}

                              {product.jenis_kelamin && (

                                <div className="flex items-center gap-2">

                                  <UserRound
                                    size={15}
                                    className="text-muted"
                                  />

                                  <span className="text-xs text-muted">
                                    Jenis Kelamin:{" "}
                                    <span className="font-semibold text-ink">
                                      {product.jenis_kelamin}
                                    </span>
                                  </span>

                                </div>

                              )}

                              {product.umur && (

                                <div className="flex items-center gap-2">

                                  <CalendarDays
                                    size={15}
                                    className="text-muted"
                                  />

                                  <span className="text-xs text-muted">
                                    Umur:{" "}
                                    <span className="font-semibold text-ink">
                                      {product.umur}
                                    </span>
                                  </span>

                                </div>

                              )}

                            </div>


                            {/* KATEGORI / TIPE */}

                            {product.tipe && (

                              <div className="flex items-center gap-2 mb-2">

                                <Tag
                                  size={16}
                                  className="text-muted"
                                />

                                <span className="text-sm text-muted">
                                  {product.tipe}
                                </span>

                              </div>

                            )}


                            {/* STOK */}

                            {product.stok !== undefined &&
                              product.stok !== null &&
                              product.stok !== "" && (

                                <div className="flex items-center gap-2 mb-4">

                                  <Layers
                                    size={16}
                                    className="text-muted"
                                  />

                                  <span className="text-sm text-muted">
                                    Stok: {product.stok}
                                  </span>

                                </div>

                              )}


                            {/* ACTION ADMIN */}

                            <div className="grid grid-cols-3 gap-2 mt-4">

                              {/* DETAIL */}

                              <button
                                onClick={() =>
                                  setDetailProduct(product)
                                }
                                className="
                                  inline-flex
                                  items-center
                                  justify-center
                                  gap-1.5
                                  border
                                  border-line
                                  text-ink
                                  hover:bg-gray-50
                                  px-3
                                  py-2
                                  rounded-lg
                                  text-xs
                                  font-semibold
                                  transition-colors
                                "
                                title="Lihat detail produk"
                              >

                                <Eye size={15} />

                                Detail

                              </button>


                              {/* EDIT */}

                              <button
                                onClick={() =>
                                  handleEdit(
                                    product,
                                    group.key
                                  )
                                }
                                className="
                                  inline-flex
                                  items-center
                                  justify-center
                                  gap-1.5
                                  bg-primary-light
                                  text-primary
                                  hover:bg-primary
                                  hover:text-white
                                  px-3
                                  py-2
                                  rounded-lg
                                  text-xs
                                  font-semibold
                                  transition-colors
                                "
                                title="Edit produk"
                              >

                                <Pencil size={15} />

                                Edit

                              </button>


                              {/* HAPUS */}

                              <button
                                onClick={() =>
                                  handleDelete(
                                    product,
                                    group.key
                                  )
                                }
                                className="
                                  inline-flex
                                  items-center
                                  justify-center
                                  gap-1.5
                                  bg-red-50
                                  text-red-600
                                  hover:bg-red-600
                                  hover:text-white
                                  px-3
                                  py-2
                                  rounded-lg
                                  text-xs
                                  font-semibold
                                  transition-colors
                                "
                                title="Hapus produk"
                              >

                                <Trash2 size={15} />

                                Hapus

                              </button>

                            </div>

                          </div>

                        </div>

                      );

                    })}

                  </div>

                )}

              </section>

            );

          })}

        </div>

      </div>


      {/* =========================================================
          MODAL TAMBAH / EDIT PRODUK
      ========================================================== */}

      <ProductModal
        open={modalOpen}
        onClose={closeProductModal}
        onSave={handleSave}
        initialData={editingProduct}
      />


      {/* =========================================================
          MODAL DETAIL PRODUK
      ========================================================== */}

      {detailProduct && (

        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-black/50
            backdrop-blur-sm
            p-4
          "
          onClick={closeDetail}
        >

          <div
            className="
              w-full
              max-w-2xl
              max-h-[90vh]
              overflow-y-auto
              bg-white
              rounded-2xl
              shadow-2xl
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between p-5 border-b border-line">

              <div>

                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  Detail Produk
                </p>

                <h2 className="text-xl font-bold text-ink font-heading mt-1">
                  {detailProduct.nama || "Produk"}
                </h2>

              </div>

              <button
                onClick={closeDetail}
                className="
                  w-9
                  h-9
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  text-muted
                  hover:bg-gray-100
                  hover:text-ink
                  transition-colors
                "
                title="Tutup"
              >

                <X size={20} />

              </button>

            </div>


            {/* MODAL CONTENT */}

            <div className="p-5">

              {/* IMAGE */}

              <div className="w-full h-64 sm:h-72 bg-cream rounded-xl overflow-hidden mb-6">

                {getProductImage(detailProduct) ? (

                  <img
                    src={getProductImage(detailProduct)}
                    alt={detailProduct.nama}
                    className="w-full h-full object-cover"
                  />

                ) : (

                  <div className="w-full h-full flex flex-col items-center justify-center text-muted">

                    <ImageIcon
                      size={42}
                      className="mb-3"
                    />

                    <span className="text-sm">
                      Belum ada gambar produk
                    </span>

                  </div>

                )}

              </div>


              {/* NAMA */}

              <div className="mb-5">

                <p className="text-xs uppercase tracking-wide font-semibold text-muted mb-1">
                  Nama Produk
                </p>

                <p className="text-lg font-bold text-ink">
                  {detailProduct.nama || "-"}
                </p>

              </div>


              {/* INFORMASI GRID */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">

                {/* HARGA */}

                <div className="border border-line rounded-xl p-4">

                  <div className="flex items-center gap-2 mb-2">

                    <CircleDollarSign
                      size={17}
                      className="text-primary"
                    />

                    <p className="text-xs uppercase tracking-wide font-semibold text-muted">
                      Harga
                    </p>

                  </div>

                  <p className="font-bold text-ink">
                    {detailProduct.harga || "-"}
                  </p>

                </div>


                {/* BOBOT */}

                <div className="border border-line rounded-xl p-4">

                  <div className="flex items-center gap-2 mb-2">

                    <Scale
                      size={17}
                      className="text-primary"
                    />

                    <p className="text-xs uppercase tracking-wide font-semibold text-muted">
                      Bobot
                    </p>

                  </div>

                  <p className="font-bold text-ink">
                    {detailProduct.bobot || "-"}
                  </p>

                </div>


                {/* JENIS KELAMIN */}

                <div className="border border-line rounded-xl p-4">

                  <div className="flex items-center gap-2 mb-2">

                    <UserRound
                      size={17}
                      className="text-primary"
                    />

                    <p className="text-xs uppercase tracking-wide font-semibold text-muted">
                      Jenis Kelamin
                    </p>

                  </div>

                  <p className="font-bold text-ink">
                    {detailProduct.jenis_kelamin || "-"}
                  </p>

                </div>


                {/* UMUR */}

                <div className="border border-line rounded-xl p-4">

                  <div className="flex items-center gap-2 mb-2">

                    <CalendarDays
                      size={17}
                      className="text-primary"
                    />

                    <p className="text-xs uppercase tracking-wide font-semibold text-muted">
                      Umur
                    </p>

                  </div>

                  <p className="font-bold text-ink">
                    {detailProduct.umur || "-"}
                  </p>

                </div>


                {/* TIPE */}

                <div className="border border-line rounded-xl p-4">

                  <div className="flex items-center gap-2 mb-2">

                    <Tag
                      size={17}
                      className="text-primary"
                    />

                    <p className="text-xs uppercase tracking-wide font-semibold text-muted">
                      Tipe
                    </p>

                  </div>

                  <p className="font-bold text-ink">
                    {detailProduct.tipe || "-"}
                  </p>

                </div>


                {/* STOK */}

                <div className="border border-line rounded-xl p-4">

                  <div className="flex items-center gap-2 mb-2">

                    <Layers
                      size={17}
                      className="text-primary"
                    />

                    <p className="text-xs uppercase tracking-wide font-semibold text-muted">
                      Stok
                    </p>

                  </div>

                  <p className="font-bold text-ink">
                    {detailProduct.stok !== undefined &&
                    detailProduct.stok !== null &&
                    detailProduct.stok !== ""
                      ? detailProduct.stok
                      : "-"}
                  </p>

                </div>


                {/* ID */}

                <div className="border border-line rounded-xl p-4">

                  <div className="flex items-center gap-2 mb-2">

                    <Package
                      size={17}
                      className="text-primary"
                    />

                    <p className="text-xs uppercase tracking-wide font-semibold text-muted">
                      ID Produk
                    </p>

                  </div>

                  <p className="font-bold text-ink break-all">
                    {detailProduct.id || "-"}
                  </p>

                </div>

              </div>


              {/* DESKRIPSI */}

              {detailProduct.deskripsi && (

                <div className="border border-line rounded-xl p-4 mb-5">

                  <p className="text-xs uppercase tracking-wide font-semibold text-muted mb-2">
                    Deskripsi
                  </p>

                  <p className="text-sm text-ink leading-relaxed whitespace-pre-line">
                    {detailProduct.deskripsi}
                  </p>

                </div>

              )}

            </div>


            {/* MODAL FOOTER */}

            <div className="flex flex-col sm:flex-row justify-end gap-2 p-5 border-t border-line">

              <button
                onClick={closeDetail}
                className="
                  px-4
                  py-2.5
                  rounded-lg
                  border
                  border-line
                  text-sm
                  font-semibold
                  text-ink
                  hover:bg-gray-50
                  transition-colors
                "
              >
                Tutup
              </button>

            </div>

          </div>

        </div>

      )}

    </AdminLayout>
  );
}