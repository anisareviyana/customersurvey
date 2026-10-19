# Relokasi & Integrasi Fitur Unggah Dokumen ke Halaman Sertifikasi & Paspor

Rencana pemindahan fitur unggah dokumen pendukung non-visa dari halaman Visa (Step 3) ke halaman Sertifikasi & Paspor (Step 2) dengan integrasi dropzone/kartu unggah yang muncul secara dinamis di bawah opsi terkait.

> [!IMPORTANT]
> **Keputusan Pengguna yang Telah Dikonfirmasi**:
> 1. **Cakupan Dokumen di Step 2**: Unggah dinamis untuk **Sertifikat BNSP**, **Scan Dokumen Paspor**, dan **Sertifikat First Aid / CPR**.
> 2. **Penempatan Input Unggah**: Kotak upload/dropzone muncul langsung di bawah opsi yang bersangkutan begitu opsi aktif dipilih oleh pengguna.
> 3. **Penyederhanaan Halaman Visa**: Bagian accordion *"Unggah Dokumen Legalitas Lainnya"* di halaman Visa (Step 3) akan dihilangkan seluruhnya sehingga Step 3 berfokus murni pada pemilihan visa dan dokumen visa saja.

---

## 1. Ikhtisar & Tujuan

### Apa yang Dilakukan
- Menghapus komponen *"Unggah Dokumen Legalitas Lainnya"* dari `components/steps/StepVisa.tsx`.
- Mentransformasi `components/steps/Step2.tsx` (Sertifikasi & Paspor) agar memiliki kontrol unggah berkas (PDF / Foto / Scan) yang kontekstual dan kondisional:
  - **Sertifikasi BNSP**: Saat opsi *"Bersertifikat Resmi BNSP"* dipilih, selain kolom Nomor Registrasi, akan muncul area unggah dokumen khusus *"Sertifikat Kompetensi BNSP"*.
  - **Dokumen Paspor**: Saat paspor berstatus aktif (*"> 1 Tahun"* atau *"< 6 Bulan"*), selain tanggal kedaluwarsa, akan muncul area unggah *"Scan / Foto Paspor"*.
  - **Pertolongan Pertama (First Aid & CPR)**: Saat opsi *"Ya, Bersertifikat Resmi (CPR & First Aid)"* dipilih, muncul area unggah *"Sertifikat First Aid / CPR"*.
- Menyediakan penampil berkas (*Document Preview Modal*) yang konsisten di Step 2 sehingga pengguna dapat langsung meninjau, mengunduh, mengganti, atau menghapus berkas yang telah diunggah.

---

## 2. Pengalaman Pengguna & Desain Visual

### Alur Interaksi Pengguna (Step-by-Step Flow)
1. **Status BNSP**:
   - Jika pengguna memilih *"Sedang Proses"* atau *"Belum Memiliki"*, tidak ada area unggah yang membebani layar.
   - Jika memilih *"Bersertifikat Resmi BNSP"*, form akan membuka input nomor registrasi dan slot unggah berkas Sertifikat BNSP (`category: 'Sertifikat BNSP'`).
2. **Status Paspor**:
   - Jika pengguna memilih *"Paspor Aktif"*, form membuka input masa berlaku serta slot unggah scan paspor (`category: 'Paspor'`).
3. **Keahlian First Aid / CPR**:
   - Jika pengguna memilih *"Ya, Bersertifikat Resmi"*, form memunculkan slot unggah sertifikat pelatihan CPR / P3K (`category: 'Sertifikat First Aid / CPR'`).
4. **Interaksi Berkas**:
   - Slot kosong berupa dropzone bergaya *dashed border* yang elegan dan kompak dengan informasi format (`.pdf`, `.jpg`, `.png`, maks. 10MB).
   - Setelah berkas diunggah, dropzone berubah menjadi kartu dokumen yang rapi, menampilkan nama berkas, ukuran, jenis dokumen, tombol Pratinjau (*Eye*), tombol Ganti Berkas (*Upload*), dan tombol Hapus (*Trash*).
   - Pengguna dapat membuka modal pratinjau untuk melihat file PDF atau scan gambar secara langsung.

---

## 3. Keputusan Desain & Pertimbangan

- **Kontekstual vs. General Uploader**:
  - *Keputusan*: Menempatkan uploader langsung di bawah masing-masing pertanyaan/opsi spesifik, bukan di satu uploader umum di bagian bawah.
  - *Alasan*: Pengguna memahami secara jelas dokumen apa yang diminta untuk setiap klaim kompetensi/legalitas yang mereka centang.
- **Konsistensi Data Model**:
  - Semua dokumen tetap tersimpan di dalam array `formData.documents` dengan struktur tipe `DocumentAttachment` yang sudah ada, dibedakan melalui field `category: 'Sertifikat BNSP' | 'Paspor' | 'Sertifikat First Aid / CPR'`.
  - Hal ini menjamin halaman Review & Submit (Step 5) dan ringkasan profil tetap bekerja mulus tanpa migrasi data yang rumit.

---

## 4. Arsitektur Teknis & Diagram Alur Data

```
┌─────────────────────────────────────────────────────────────────┐
│                    TourLeaderProfile State                      │
│                    (formData.documents: [])                     │
└────────────────┬───────────────────────────────┬────────────────┘
                 │                               │
        Step 2: Sertifikasi & Paspor      Step 3: Visa
                 │                               │
    ┌────────────┴─────────────┐          ┌──────┴─────────────┐
    │ BNSP: 'Bersertifikat'   │          │ Active Visas List  │
    │  └► Upload Sertif BNSP   │          │  └► Upload Dokumen │
    │ Paspor: 'Aktif'          │          │     per Visa       │
    │  └► Upload Scan Paspor   │          │ (Dokumen lainnya   │
    │ First Aid: 'Sertifikat'  │          │  dihapus dari sini)│
    │  └► Upload Sertif CPR    │          └────────────────────┘
    └──────────────────────────┘
```

### Rencana File yang Diubah:
1. `components/steps/StepVisa.tsx`:
   - Hapus accordion *"Unggah Dokumen Legalitas Lainnya"*, state `showOtherDocs`, dan ref `otherFileInputRef`.
   - Bersihkan dependensi icon yang tidak lagi digunakan.
2. `components/steps/Step2.tsx`:
   - Tambahkan state dan fungsi helper untuk file upload (read file as base64 data URL, update `data.documents`).
   - Tambahkan slot dokumen kondisional untuk BNSP, Paspor, dan First Aid.
   - Tambahkan komponen modal pratinjau berkas (`previewDoc`).
3. Verifikasi dengan linter (`lint_applet`) dan kompilasi (`compile_applet`).
