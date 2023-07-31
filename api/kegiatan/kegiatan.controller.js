const kegiatanService = require('./kegiatan.service');
const { validationResult } = require('express-validator');

module.exports = {
  createKegiatan: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: 0,
        message: 'Validation error',
        errors: errors.array(),
      });
    }

    const data = req.body;
    kegiatanService.createKegiatanWithDokumentasi(data, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: 0,
          message: 'Failed to create kegiatan',
        });
      }
      return res.status(201).json({
        success: 1,
        message: 'Kegiatan and dokumentasi added successfully',
      });
    });
  },

  deleteKegiatan: (req, res) => {
    const data = req.body;
    kegiatanService.deleteKegiatan(data, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: 'Database connection error',
        });
      }
      if (results.affectedRows === 0) {
        console.log('rep: ', results);
        return res.json({
          success: 0,
          message: 'Record not found',
        });
      }
      return res.json({
        success: 1,
        message: 'Kegiatan deleted successfully',
      });
    });
  },

  getKegiatanById: (req, res) => {
    const kegiatanId = req.params.id;
    kegiatanService.getKegiatanById(kegiatanId, (err, results) => {
      if (err) {
        console.error("TESSTING 2 ", err);
        return res.status(500).json({
            err : err,
          db_port : process.env.DB_PORT,
          db_host : process.env.DB_HOST,
          db_pass : process.env.DB_PASS,
          mysql_db : process.env.MYSQL_DB,
          db_user : process.env.DB_USER,
          success: 0,
          message: 'Database connection error',
        });
      }

      if (!results) {
        return res.status(404).json({
          success: 0,
          message: 'Kegiatan not found',
        });
      }

      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  }
  // Tambahkan fungsi lain sesuai kebutuhan, seperti fungsi untuk mendapatkan kegiatan berdasarkan ID atau fungsi lainnya.
};


