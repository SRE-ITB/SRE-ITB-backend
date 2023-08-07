const pool = require('../../config/database');

module.exports = {
    createKegiatanWithDokumentasi: (data, callBack) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return callBack(err);
            }

            connection.beginTransaction((err) => {
                if (err) {
                    connection.release();
                    return callBack(err);
                }

                const kegiatanData = {
                    thumbnail: data.thumbnail,
                    nama_kegiatan: data.nama_kegiatan,
                    waktu_pelaksanaan: data.waktu_pelaksanaan,
                    deskripsi_pendek: data.deskripsi_pendek,
                    deskripsi_panjang: data.deskripsi_panjang
                };

                connection.query(
                    'INSERT INTO kegiatan SET ?',
                    kegiatanData,
                    (error, results, fields) => {
                        if (error) {
                            connection.rollback(() => {
                                connection.release();
                                return callBack(error);
                            });
                        }

                        const kegiatanId = results.insertId;

                        const dokumentasiData = data.dokumentasi_kegiatan.map((dok) => {
                            return [kegiatanId, dok];
                        });

                        connection.query(
                            'INSERT INTO dokumentasi_kegiatan (id_kegiatan, url_dokumentasi) VALUES ?',
                            [dokumentasiData],
                            (error, results, fields) => {
                                if (error) {
                                    connection.rollback(() => {
                                        connection.release();
                                        return callBack(error);
                                    });
                                }

                                connection.commit((err) => {
                                    if (err) {
                                        connection.rollback(() => {
                                            connection.release();
                                            return callBack(err);
                                        });
                                    }

                                    connection.release();
                                    return callBack(null, "Kegiatan dan dokumentasi berhasil ditambahkan!");
                                });
                            }
                        );
                    }
                );
            });
        });
    },

    getKegiatanById: (kegiatanId, callBack) => {
        pool.query(
          'SELECT * FROM kegiatan LEFT JOIN dokumentasi_kegiatan ON kegiatan.id = dokumentasi_kegiatan.id_kegiatan WHERE kegiatan.id = ?',
          [kegiatanId],
          (error, results, fields) => {
            if (error) {
              console.error(error);
              return callBack(error);
            }
    
            if (results.length === 0) {
              return callBack(null, null); // Kegiatan not found
            }
    
            // Membuat objek untuk menyimpan data kegiatan beserta dokumentasi
            const kegiatanData = {
              id: results[0].id_kegiatan,
              thumbnail: results[0].thumbnail,
              nama_kegiatan: results[0].nama_kegiatan,
              waktu_pelaksanaan: results[0].waktu_pelaksanaan,
              deskripsi_pendek: results[0].deskripsi_pendek,
              deskripsi_panjang: results[0].deskripsi_panjang,
              dokumentasi_kegiatan: [],
            };
    
            // Mengumpulkan data dokumentasi kegiatan
            results.forEach((row) => {
              if (row.url_dokumentasi) {
                kegiatanData.dokumentasi_kegiatan.push(row.url_dokumentasi);
              }
            });
    
            return callBack(null, kegiatanData);
          }
        );
      },
      
      getAllKegiatan: (callBack) => {
        pool.query(
            'SELECT * FROM kegiatan',
            (error, results, fields) => {
                if (error) {
                    console.error(error);
                    return callBack(error);
                }

                const kegiatanList = [];

                results.forEach((row) => {
                    kegiatanList.push({
                        id: row.id,
                        thumbnail: row.thumbnail,
                        nama_kegiatan: row.nama_kegiatan,
                        waktu_pelaksanaan: row.waktu_pelaksanaan,
                        deskripsi_pendek: row.deskripsi_pendek,
                        deskripsi_panjang: row.deskripsi_panjang,
                    });
                });

                return callBack(null, kegiatanList);
            }
        );
    },

    updateKegiatan: (kegiatanId, data, callBack) => {
        pool.getConnection((err, connection) => {
          if (err) {
            return callBack(err);
          }
    
          connection.beginTransaction((err) => {
            if (err) {
              connection.release();
              return callBack(err);
            }
    
            const kegiatanData = {};

            if (data.thumbnail) {
            kegiatanData.thumbnail = data.thumbnail;
            }

            if (data.nama_kegiatan) {
            kegiatanData.nama_kegiatan = data.nama_kegiatan;
            }

            if (data.waktu_pelaksanaan) {
            kegiatanData.waktu_pelaksanaan = data.waktu_pelaksanaan;
            }

            if (data.deskripsi_pendek) {
            kegiatanData.deskripsi_pendek = data.deskripsi_pendek;
            }

            if (data.deskripsi_panjang) {
            kegiatanData.deskripsi_panjang = data.deskripsi_panjang;
            }
    
            connection.query(
              'UPDATE kegiatan SET ? WHERE id = ?',
              [kegiatanData, kegiatanId],
              (error, results, fields) => {
                if (error) {
                  connection.rollback(() => {
                    connection.release();
                    return callBack(error);
                  });
                }
    
                connection.commit((err) => {
                  if (err) {
                    connection.rollback(() => {
                      connection.release();
                      return callBack(err);
                    });
                  }
    
                  connection.release();
                  return callBack(null, results);
                });
              }
            );
          });
        });
      },
    
    deleteKegiatan: (kegiatanId, callBack) => {
        pool.getConnection((err, connection) => {
            if (err) {
                return callBack(err);
            }

            connection.beginTransaction((err) => {
                if (err) {
                    connection.release();
                    return callBack(err);
                }

                connection.query(
                    'DELETE FROM dokumentasi_kegiatan WHERE id_kegiatan = ?',
                    [kegiatanId],
                    (error, results, fields) => {
                        if (error) {
                            connection.rollback(() => {
                                connection.release();
                                return callBack(error);
                            });
                        }

                        connection.query(
                            'DELETE FROM kegiatan WHERE id = ?',
                            [kegiatanId],
                            (error, results, fields) => {
                                if (error) {
                                    connection.rollback(() => {
                                        connection.release();
                                        return callBack(error);
                                    });
                                }

                                connection.commit((err) => {
                                    if (err) {
                                        connection.rollback(() => {
                                            connection.release();
                                            return callBack(err);
                                        });
                                    }

                                    connection.release();
                                    return callBack(null, results);
                                });
                            }
                        );
                    }
                );
            });
        });
    },

};
