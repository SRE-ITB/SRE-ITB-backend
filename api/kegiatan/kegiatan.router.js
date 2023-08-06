const express = require('express');
const router = express.Router();
const { body, param } = require('express-validator');
const kegiatanController = require('./kegiatan.controller');

// Rute untuk membuat kegiatan
router.get('/', kegiatanController.getAllKegiatan);

router.get('/:id',
  [
    // Validasi parameter ID menggunakan express-validator
    param('id').isInt().withMessage('ID must be an integer'),
  ],
  kegiatanController.getKegiatanById
);

router.post(
  '/',
  [
    // Validasi input menggunakan express-validator
    body('thumbnail').notEmpty().withMessage('Thumbnail is required'),
    body('nama_kegiatan').notEmpty().withMessage('Nama kegiatan is required'),
    body('waktu_pelaksanaan').notEmpty().withMessage('Waktu pelaksanaan is required'),
    body('deskripsi_pendek').notEmpty().withMessage('Deskripsi pendek is required'),
    body('deskripsi_panjang').notEmpty().withMessage('Deskripsi panjang is required'),
    body('dokumentasi_kegiatan').isArray().withMessage('Dokumentasi kegiatan must be an array'),
    body('dokumentasi_kegiatan.*').isURL().withMessage('Each dokumentasi kegiatan must be a valid URL'),
  ],
  kegiatanController.createKegiatan
);

// Rute untuk menghapus kegiatan berdasarkan ID
router.delete('/', kegiatanController.deleteKegiatan);

// Tambahkan rute lain sesuai kebutuhan, seperti rute untuk mendapatkan kegiatan berdasarkan ID atau rute lainnya.

module.exports = router;
