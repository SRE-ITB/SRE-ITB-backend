const kegiatanService = require('./kegiatan.service');
const { validationResult } = require('express-validator');

module.exports = {
  createKegiatan: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error(err);
      return res.status(400).json({
        message: 'Validation error',
        errors: errors.array(),
      });
    }

    const data = req.body;
    kegiatanService.createKegiatanWithDokumentasi(data, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: 'Failed to create kegiatan',
        });
      }
      return res.status(201).json({
        message: 'Kegiatan and dokumentasi added successfully',
      });
    });
  },

  deleteKegiatan: (req, res) => {
    const id = req.params.id;
    kegiatanService.deleteKegiatan(id, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: 'Database connection error',
        });
      }
      if (results.affectedRows === 0) {
        return res.json({
          message: 'Record not found',
        });
      }
      return res.json({
        message: 'Kegiatan deleted successfully',
      });
    });
  },

  getKegiatanById: (req, res) => {
    const kegiatanId = req.params.id;
    kegiatanService.getKegiatanById(kegiatanId, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: 'Database connection error',
          data: null,
        });
      }

      if (!results) {
        return res.status(404).json({
          message: 'Kegiatan not found',
          data: null,
        });
      }

      return res.status(200).json({
        message: 'Kegiatan found',
        data: results,
      });
    });
  },

  //get all kegiatan 
  getAllKegiatan: (req, res) => {
    kegiatanService.getAllKegiatan((err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: 'Database connection error',
          data: null,
        });
      }

      return res.status(200).json({
        message: 'All kegiatan retrieved',
        data: results,
      });
    });
  },

  updateKegiatan: (req, res) => {
    const kegiatanId = req.params.id;
    const data = req.body;

    kegiatanService.updateKegiatan(kegiatanId, data, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: 'Database connection error',
        });
      }

      if (results.affectedRows === 0) {
        return res.json({
          message: 'Kegiatan not found or no changes were made',
        });
      }

      return res.json({
        message: 'Kegiatan updated successfully',
      });
    });
  },

  // Tambahkan fungsi lain sesuai kebutuhan, seperti fungsi untuk mendapatkan kegiatan berdasarkan ID atau fungsi lainnya.
};


