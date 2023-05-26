const { json } = require('body-parser');
const con = require('../db/setup_db')
const router = require('express').Router();
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/verify_token').verifyToken;
require("dotenv").config();
const bcrypt = require("bcryptjs");


router.get('/adminInfo', function (req, res) {
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization.split(' ')[1],
            decoded;
        try {
            decoded = jwt.verify(authorization, process.env.TOKEN_KEY);

            console.log(decoded);
            const adminId = decoded.id;
            const username = decoded.username;

            return res.json({ userId: adminId, username: username });

        } catch (e) {
            return res.status(401).json({ errorMessage: 'unauthorized' });
        }

    }
    return res.json({ errorMessage: "Error" })
});
router.post('/toggleLock', async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(401).json({ errorMessage: "No ID provided" });
    }

    con.query('SELECT * FROM entries WHERE id = ?', [id], async function (err, data) {
        if (err) throw err;

        if (data.length === 0) {
            return res.status(401).json({ errorMessage: "Entry not found" });
        }

        const currentLockStatus = data[0].is_locked;
        const newLockStatus = currentLockStatus === 1 ? 0 : 1; // Toggle the lock status

        con.query('UPDATE entries SET is_locked = ? WHERE id = ?', [newLockStatus, id], function (error, result) {
            if (error) {
                return res.json({ errorMessage: error.message });
            }

            return res.json({ message: `Entry ${id} lock status toggled to ${newLockStatus}` });
        });
    });
});




router.post('/login', async function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    if (username && password) {
        query = `
        SELECT * FROM admin 
        WHERE username = "${username}"
        `;

        con.query(query, function (error, data) {

            if (error) {
                return res.status(400).send({
                    message: error
                })
            }

            if (data.length > 0) {

                const user = data[0];

                const verified = bcrypt.compareSync(password, user.password);


                if (!verified) {
                    return res.json({ errorMessage: "Password Not Matched" });

                }
                const payload = {
                    id: user.id,
                    email: user.email,
                    isAdmin: true,
                    username: user.username,
                    // etc.
                };
                const options = {
                    expiresIn: '360d'
                };
                console.log(process.env.TOKEN_KEY);

                const newToken = jwt.sign(payload, process.env.TOKEN_KEY, options);


                return res.status(200).json({
                    successMessage: "Logged in successfully",
                    userId: data[0].id,
                    token: newToken
                });


            }
            else {
                res.status(400).json({ errorMessage: 'Incorrect Username' });
            }
            res.end();
        });
    }
    else {
        res.json({ errorMessage: 'Please Enter user and Password Details' });
        res.end();
    }

});


router.post('/logout', function (req, res, next) {
    res.cookie('token', '', { maxAge: 0 });
    res.status(200).json({ message: "Logout Success" });
    res.end()

});

///Get Admin Info With Given ID: e.g 1
router.get('/profile/:id', verifyToken, function (req, res, next) {
    const id = req.params.id;


    if (id) {
        var query = `
        SELECT * FROM admin 
        WHERE id = "${id}"
        `;
        con.query(query, function (err, result, fields) {

            if (err) {
                res.status(500).json({ errorMessage: err });
            };

            if (result.length > 0) {
                const data = result[0];

                res.status(200).json({
                    message: "Success",
                    data
                })

            } else {
                res.status(404).json({ errorMessage: "User Not Found " })
            }

            console.log(fields);
        });

    }

});

router.get('/setting', verifyToken, async (req, res, next) => {


    var sql = `SELECT * FROM admin WHERE id=4`;
    con.query(sql, async function (err, data) {
        if (err) throw err;
        if (data.length > 0) {
            return res.status(200).json({ message: "Success", entries: data })
        }

    })
});





router.put('/update/:id', verifyToken, async (req, res, next) => {

    const { primary_email, current_password, snapchat_link, new_password, tiktok_link, instagram_link, twitter_link } = req.body;

    console.log(primary_email);
    console.log(current_password);
    console.log(new_password);
    console.log(tiktok_link);
    console.log(instagram_link);
    console.log(twitter_link);


    const userID = req.params.id;

    var sql = `SELECT * FROM admin WHERE id=${userID}`;

    con.query(sql, async function (err, data) {
        if (err) throw err;

        if (data.length > 0) {
            ///USer Found
            var sql = `UPDATE admin SET ? WHERE id= ?`;
            const user = data[0];

            ///Decrypting to be done here...
            const password = req.body.current_password;

            const verified = bcrypt.compareSync(password, user.password);

            if (verified) {

                //TODO: Encyrption of Password to be done here...
                const encryptedPassword = await bcrypt.hash(new_password, 10);

                const updateData = {
                    "email": primary_email,
                    "password": encryptedPassword,
                    "twitter_link": twitter_link,
                    "snapchat_link": snapchat_link,
                    "instagram_link": instagram_link,
                    "tiktok_link": tiktok_link,
                }
                con.query(sql, [updateData, userID], function (err, data) {
                    if (err) throw err;
                    console.log(data.affectedRows + " record(s) updated")
                });

                return res.json({
                    message: "Data Updated Successfully",
                    "rows affected": data.affectedRows
                })


            } else {
                return res.status(401).json({ errorMessage: "Current Password not match   " })
            }

        } else {
            //user Not Found
            return res.status(401).json({ errorMessage: "User not Found" });
        }

    })


});

router.get('/gameSocialLinks', (req, res) => {
    console.log("Hiting Social Links");
    var query = "select instagram_link,twitter_link,snapchat_link,tiktok_link from admin where id = 4;";

    con.query(query, function (err, result, fields) {

        if (err) {
            return res.json({ errorMessage: err });
        }


        console.log(result[0]);

        const data = result[0];
        return res.json({ message: "Success", data });

    });
});

router.get('/getPayTable', (req, res) => {
    console.log("Hiting Payments Table");
    var query = "SELECT payments.*, entries.word_phrase, entries.username, entries.link_to_photo FROM payments INNER JOIN entries ON payments.entry_id = entries.entry_id;";

    con.query(query, function (err, result, fields) {
        if (err) {
            return res.json({ errorMessage: err });
        }
        const data = result;
        return res.json({ message: "Success", data });

    });
});



router.get('/faqs', function (req, res) {
    console.log("Hitting faqs");

    // if (req.headers && req.headers.authorization) {
    //     console.log("Hitting faqs Token Found");
    //     var authorization = req.headers.authorization.split(' ')[1],
    //         decoded;
    //     try {
    //         decoded = jwt.verify(authorization, process.env.TOKEN_KEY);

    //         console.log(decoded);
    //         const adminId = decoded.id;

    //         console.log(adminId);

    var query = "SELECT * from faqs";

    con.query(query, function (error, result, feilds) {
        console.log(result);

        if (error) {
            return res.json({ message: error });
        }


        const data = result;



        return res.status(200).json({ message: "Success", data });
    });
    // const username = decoded.username;
    // } catch (e) {
    //     console.log(e);

    //     return res.status(401).json({ errorMessage: 'unauthorized' });
    // }

    // } else {
    //     return res.status(401).json({ errorMessage: 'No Token Found' });

    // }
});


router.post('/FirebaseUrl', async (req, res) => {
    const admin_id = req.body.user_ID;
    const postDate = req.body.data;

   

    if (!admin_id) {
        return res.json({ errorMessage: "Invalid user ID" });
    }

    if (req.headers && req.headers.authorization) {
        console.log("Hitting faqs Token Found");
        var authorization = req.headers.authorization.split(' ')[1],
            decoded;
        try {
            decoded = jwt.verify(authorization, process.env.TOKEN_KEY);

            console.log(decoded);
            const adminId = decoded.id;

            console.log(adminId);

            // var query1 = "Insert into `admin_url`(admin_id,video_url) values(?,?)";
            var query1 = "UPDATE `admin_url` SET video_url = ? WHERE admin_id = ?";
            con.query(query1, [postDate, admin_id], function (error, result, feilds) {
                console.log(result);

                if (error) {
                    return res.json({ errorMessage: error });
                }

                const data = result.rowsAffected;

                return res.status(200).json({ message: "Success intro video Added SuccessFully", data });
            });
        } catch (e) {
            console.log(e);

            return res.status(401).json({ errorMessage: 'unauthorized' });
        }

    } else {
        return res.status(401).json({ errorMessage: 'No Token Found' });
    }
});


  router.post('/winvideourl', async (req, res) => {
    const admin_id = req.body.user_ID;
    const winVideoUrl = req.body.winVideoUrl;
  
    if (!winVideoUrl) {
      return res.json({ errorMessage: "Win video URL not found" });
    }
  
    if (!admin_id) {
      return res.json({ errorMessage: "Invalid user ID" });
    }
  
    if (req.headers && req.headers.authorization) {
      console.log("Hitting winvideourl Token Found");
      var authorization = req.headers.authorization.split(' ')[1],
        decoded;
      try {
        decoded = jwt.verify(authorization, process.env.TOKEN_KEY);
  
        console.log(decoded);
        const adminId = decoded.id;
  
        console.log(adminId);
  
        var query = "UPDATE `admin_url` SET win_video_url = ? WHERE admin_id = ?";
        con.query(query, [winVideoUrl, admin_id], function (error, result, fields) {
          console.log(result);
  
          if (error) {
            return res.json({ errorMessage: error });
          }
  
          const data = result.affectedRows;
  
          return res.status(200).json({ message: "Success win video URL added successfully", data });
        });
      } catch (e) {
        console.log(e);
  
        return res.status(401).json({ errorMessage: 'Unauthorized' });
      }
    } else {
      return res.status(401).json({ errorMessage: 'No Token Found' });
    }
  });
  router.post('/losevideourl', async (req, res) => {
    const admin_id = req.body.user_ID;
    const loseVideoUrl = req.body.loseVideoUrl;
  
    if (!loseVideoUrl) {
      return res.json({ errorMessage: "Lose video URL not found" });
    }
  
    if (!admin_id) {
      return res.json({ errorMessage: "Invalid user ID" });
    }
  
    if (req.headers && req.headers.authorization) {
      console.log("Hitting losevideourl Token Found");
      var authorization = req.headers.authorization.split(' ')[1],
        decoded;
      try {
        decoded = jwt.verify(authorization, process.env.TOKEN_KEY);
  
        console.log(decoded);
        const adminId = decoded.id;
  
        console.log(adminId);
  
        var query = "UPDATE `admin_url` SET lose_video_url = ? WHERE admin_id = ?";
        con.query(query, [loseVideoUrl, admin_id], function (error, result, fields) {
          console.log(result);
  
          if (error) {
            return res.json({ errorMessage: error });
          }
  
          const data = result.affectedRows;
  
          return res.status(200).json({ message: "Success lose video URL added successfully", data });
        });
      } catch (e) {
        console.log(e);
  
        return res.status(401).json({ errorMessage: 'Unauthorized' });
      }
    } else {
      return res.status(401).json({ errorMessage: 'No Token Found' });
    }
  });

router.get('/Firebase', (req, res) => {
    // const sql = 'SELECT `video_url` FROM admin_url WHERE admin_id = 4';
    const sql = 'SELECT `win_video_url`,`video_url`, `lose_video_url` FROM admin_url WHERE admin_id = 4';
    
    con.query(sql, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Unable to retrieve posts' });
        }
        console.log(rows)
        return res.json(rows);
    });
});



router.post('/faqs', verifyToken, function (req, res) {

    const faq_title = req.body.faq_title;
    const description = req.body.faq_description;
    const faq_type = req.body.faq_type;

    if (!faq_title) {
        return res.json({ errorMessage: "Faq Title is Required" });

    }

    if (!description) {
        return res.json({ errorMessage: "Faq Description is Required" });

    }


    // console.log("Hitting faqs");

    if (req.headers && req.headers.authorization) {
        console.log("Hitting faqs Token Found");
        var authorization = req.headers.authorization.split(' ')[1],
            decoded;
        try {
            decoded = jwt.verify(authorization, process.env.TOKEN_KEY);

            console.log(decoded);
            const adminId = decoded.id;

            console.log(adminId);

            var query = "Insert into faqs(faq_title,faq_description,faq_type) values(?,?,?);";

            con.query(query, [faq_title, description, faq_type], function (error, result, feilds) {
                console.log(result);

                if (error) {
                    return res.json({ errorMessage: error });
                }

                const data = result.rowsAffected;

                return res.status(200).json({ message: "Success Faq Added SuccessFully", data });
            });
            // const username = decoded.username;
        } catch (e) {
            console.log(e);

            return res.status(401).json({ errorMessage: 'unauthorized' });
        }

    } else {
        return res.status(401).json({ errorMessage: 'No Token Found' });

    }
});


router.post('/get_payment_history', verifyToken, function (req, res, error) {
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization.split(' ')[1],
            decoded;
        try {
            decoded = jwt.verify(authorization, process.env.TOKEN_KEY);

            const history_type = req.body.history_type;

            if (!history_type) {
                return res.json({ errorMessage: "History type is required" });
            }

            if (history_type == 1) {
                // Get today data
                con.query("SELECT SUM(amount) as total_amount FROM payments WHERE DATE(create_at) = CURDATE()", function (err, result, field) {
                    if (err) {
                        return res.status(500).json({ errorMessage: err.message });
                    }
                    return res.status(200).json({ message: "Success", entries: result })
                });
            } else if (history_type == 2) {
                // Get last 7 days data
                con.query("SELECT SUM(amount) as total_amount FROM payments WHERE create_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)", function (err, result, field) {
                    if (err) {
                        return res.status(500).json({ errorMessage: err.message });
                    }
                    return res.status(200).json({ message: "Success", entries: result })
                });
            } else if (history_type == 3) {
                // Get this year data
                con.query("SELECT SUM(amount) as total_amount FROM payments WHERE YEAR(create_at) = YEAR(NOW())", function (err, result, field) {
                    if (err) {
                        return res.status(500).json({ errorMessage: err.message });
                    }
                    return res.status(200).json({ message: "Success", entries: result })
                });
            } else if (history_type == 4) {
                const fromDate = req.body.fromDate;

                if (!fromDate) {
                    return res.json({ errorMessage: "From date is required" });
                }
                const toDate = req.body.toDate;

                if (!toDate) {
                    return res.json({ errorMessage: "From date is required" });
                }

                // Get custom date data
                var date = new Date(fromDate);
                var year = date.getFullYear();
                var month = ('0' + (date.getMonth() + 1)).slice(-2); // Adding 1 to month since it's zero-based
                var day = ('0' + date.getDate()).slice(-2);

                // Concatenate the year, month, and day with hyphens to form the desired format
                var formattedDate = year + '-' + month + '-' + day;

                var date1 = new Date(toDate);
                var year1 = date1.getFullYear();
                var month1 = ('0' + (date1.getMonth() + 1)).slice(-2); // Adding 1 to month since it's zero-based
                var day1 = ('0' + date1.getDate()).slice(-2);

                // Concatenate the year, month, and day with hyphens to form the desired format
                var formattedDate1 = year1 + '-' + month1 + '-' + day1;

                con.query("SELECT SUM(amount) as total_amount FROM payments WHERE create_at BETWEEN ? AND ?", [formattedDate, formattedDate1], function (err, result, field) {
                    if (err) {
                        return res.status(500).json({ errorMessage: err.message });
                    }
                    return res.status(200).json({ message: "Success", entries: result })
                });
            } else {
                return res.json({ errorMessage: "History type is not what we set" });
            }

        } catch (e) {
            console.log(e);
            return res.status(401).json({ errorMessage: 'unauthorized' });
        }

    } else {
        return res.status(401).json({ errorMessage: 'No Token Found' });

    }

});


router.post('/update_payment_info', verifyToken, function (req, res, error) {
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization.split(' ')[1],
            decoded;
        try {
            decoded = jwt.verify(authorization, process.env.TOKEN_KEY);

            const paytoggle = req.body.paytoggle;
            const payamount = req.body.payamount;
            const pay_thankyou_msg = req.body.pay_thankyou_msg;
            console.log("saadtest");
            if (!paytoggle) {
                return res.json({ errorMessage: "Payment Toggle is required" });
            }
            if (!payamount) {
                return res.json({ errorMessage: "Payment Amount is required" });
            }
            if (!pay_thankyou_msg) {
                return res.json({ errorMessage: "Payment Thank you message is required" });
            }
            console.log("saad");
            con.query("UPDATE `admin` SET `pay_toggle` = ?, `pay_amount` = ?, `pay_thank_you_msg` = ? WHERE `admin`.`id` = 4;",
                [paytoggle, payamount, pay_thankyou_msg], function (err, result, feild) {
                    // console.log(result.affectedRows);
                    if (err) {
                        return res.status(500).json({ errorMessage: err.message });
                    }
                    if (result) {
                        return res.status(200).json({ message: "Success payment setting updated!" });
                    } else {
                        return res.status(500).json({ errorMessage: err });
                    }
                })

        } catch (e) {
            console.log(e);
            return res.status(401).json({ errorMessage: 'unauthorized' });
        }

    } else {
        return res.status(401).json({ errorMessage: 'No Token Found' });

    }

});

router.get('/getUpdateAdminViewEntry/:id', verifyToken, function (req, res, error) {
    const id = req.params.id;
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization.split(' ')[1],
            decoded;
        try {
            con.query(`UPDATE entries SET admin_view = 1 WHERE entry_id = ${id}`, function (err, result, feild) {
                if (result) {
                    return res.status(200).json({ message: "Success" });
                } else {
                    return res.json({ errorMessage: err });
                }
            });
        } catch (e) {
            console.log(e);
            return res.status(401).json({ errorMessage: 'unauthorized' });
        }
    } else {
        return res.status(401).json({ errorMessage: 'No Token Found' });

    }
});

router.post('/update_payment_info', verifyToken, function (req, res, error) {
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization.split(' ')[1],
            decoded;
        try {
            decoded = jwt.verify(authorization, process.env.TOKEN_KEY);

            const paytoggle = req.body.paytoggle;
            const payamount = req.body.payamount;
            const pay_thankyou_msg = req.body.pay_thankyou_msg;
            if (!paytoggle) {
                return res.json({ errorMessage: "Payment Toggle is required" });
            }
            if (!payamount) {
                return res.json({ errorMessage: "Payment Amount is required" });
            }
            if (!pay_thankyou_msg) {
                return res.json({ errorMessage: "Payment Thank you message is required" });
            }

            con.query("UPDATE `admin` SET `pay_toggle` = ?, `pay_amount` = ?, `pay_thank_you_msg` = ? WHERE `admin`.`id` = 4;",
                [paytoggle, payamount, pay_thankyou_msg], function (err, result, feild) {
                    // console.log(result.affectedRows);
                    if (err) {
                        return res.status(500).json({ errorMessage: err.message });
                    }
                    if (result) {
                        return res.status(200).json({ message: "Success payment setting updated!" });
                    } else {
                        return res.status(500).json({ errorMessage: err });
                    }
                })

        } catch (e) {
            console.log(e);
            return res.status(401).json({ errorMessage: 'unauthorized' });
        }

    } else {
        return res.status(401).json({ errorMessage: 'No Token Found' });

    }

});

router.post('/addstartvideo', verifyToken, function (req, res, error) {
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization.split(' ')[1],
            decoded;
        try {
            decoded = jwt.verify(authorization, process.env.TOKEN_KEY);

            const startvideoURL = req.body.startvideoURL;
            const startvideoThumbnail = req.body.startvideoThumbnail;
            const endvideoURL = req.body.endvideoURL;

            if (startvideoURL) {
                con.query("UPDATE `admin` SET `start_video_link` = ?, `start_video_thumbnail` = ? WHERE `admin`.`id` = 4;",
                    [startvideoURL, startvideoThumbnail], function (err, result, feild) {
                        // console.log(result.affectedRows);
                        if (err) {
                            return res.status(500).json({ errorMessage: err.message });
                        }
                        if (result) {
                            return res.status(200).json({ message: "Success Video is upload" });
                        } else {
                            return res.status(500).json({ errorMessage: err });
                        }
                    })
            }
            if (endvideoURL) {
                con.query("UPDATE `admin` SET `end_video_url` = ?, `end_video_thumbnail` = ? WHERE `admin`.`id` = 4;",
                    [endvideoURL, endvideoThumbnail], function (err, result, feild) {
                        // console.log(result.affectedRows);
                        if (err) {
                            return res.status(500).json({ errorMessage: err.message });
                        }
                        if (result) {
                            return res.status(200).json({ message: "Success Video is upload" });
                        } else {
                            return res.status(500).json({ errorMessage: err });
                        }
                    })
            }
        } catch (e) {
            console.log(e);
            return res.status(401).json({ errorMessage: 'unauthorized' });
        }

    } else {
        return res.status(401).json({ errorMessage: 'No Token Found' });

    }


});

router.delete('/deleteendvideo', verifyToken, function (req, res) {
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization.split(' ')[1],
            decoded;
        try {
            decoded = jwt.verify(authorization, process.env.TOKEN_KEY);
            const adminId = decoded.id;

            var query = "UPDATE `admin` SET `end_video_url` = '', `end_video_thumbnail` = '' WHERE `admin`.`id` = 4;";

            con.query(query, function (error, result, feilds) {
                console.log(result);
                if (error) {
                    return res.json({ errorMessage: error });
                }
                return res.status(200).json({ message: "Success Video Deleted SuccessFully" });
            });
            // const username = decoded.username;
        } catch (e) {
            console.log(e);
            return res.status(401).json({ errorMessage: 'unauthorized' });
        }

    } else {
        return res.status(401).json({ errorMessage: 'No Token Found' });

    }
});
router.delete('/deletestartvideo', verifyToken, function (req, res) {
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization.split(' ')[1],
            decoded;
        try {
            decoded = jwt.verify(authorization, process.env.TOKEN_KEY);
            const adminId = decoded.id;

            var query = "UPDATE `admin` SET `start_video_link` = '', `start_video_thumbnail` = '' WHERE `admin`.`id` = 4;";

            con.query(query, function (error, result, feilds) {
                console.log(result);
                if (error) {
                    return res.json({ errorMessage: error });
                }
                return res.status(200).json({ message: "Success Video Deleted SuccessFully" });
            });
            // const username = decoded.username;
        } catch (e) {
            console.log(e);
            return res.status(401).json({ errorMessage: 'unauthorized' });
        }

    } else {
        return res.status(401).json({ errorMessage: 'No Token Found' });

    }
});
router.delete('/faqs/:faq_id', verifyToken, function (req, res) {

    const faqId = req.params.faq_id;
    // console.log("Hitting faqs");

    if (req.headers && req.headers.authorization) {
        console.log("Hitting faqs Token Found");
        var authorization = req.headers.authorization.split(' ')[1],
            decoded;
        try {
            decoded = jwt.verify(authorization, process.env.TOKEN_KEY);

            console.log(decoded);
            const adminId = decoded.id;

            console.log(adminId);

            var query = "DELETE FROM faqs WHERE id  = ?;";

            con.query(query, [faqId], function (error, result, feilds) {
                console.log(result);

                if (error) {
                    return res.json({ errorMessage: error });
                }

                const data = result.rowsAffected;

                return res.status(200).json({ message: "Success Faq Deleted SuccessFully", data });
            });
            // const username = decoded.username;
        } catch (e) {
            console.log(e);

            return res.status(401).json({ errorMessage: 'unauthorized' });
        }

    } else {
        return res.status(401).json({ errorMessage: 'No Token Found' });

    }
});





////Getting Statitics Api End Point 
router.get('/statistics/', verifyToken, function (req, res, next) {

    var query = `
    SELECT * FROM entries
    `;

    const averageTimeQuery = `
    SELECT ifnull(AVG(game_complete_time),0) as average_time ,  ifnull(Count(*),0) as totals_users
    FROM scores where  date_today = CURDate();
   `;




    const viewCountQuery = `SELECT * FROM scores WHERE date_today = CURDATE() ;`;
    //  const completedCountQuery = `SELECT IFNULL(SUM(games_completed),0) AS games_completed_today FROM statistics WHERE date_today = CURDATE() ;`;

    con.query(averageTimeQuery, function (error, result,) {
        if (error) {
            return res.json({ errorMessage: "Error Ouccred" });
        } else {


            const data = result[0].average_time;
            // const entry_id = result[0].entry_id;
            const user_played_total = result[0].totals_users;


            var today = new Date();
            var options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };


            const formattedDate = today.toLocaleDateString("en-US", options);

            con.query("Select * from entries", function (eerors2, result2, fields2) {
                if (eerors2) {
                    return res.json({ errorMessage: eerors2 })
                } else {

                    var entries = [];

                    if (result2.length > 0) {
                        entries = result2;
                    }
                    const query4 = `SELECT Ifnull(COUNT(*),0) AS last_7_days_players
FROM scores
WHERE date_today BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE();`
                    con.query(query4, function (errrorsm3, ress2, feilds22) {

                        if (errrorsm3) {
                            return res.json({ errorMessage: "Error While Fetching Data" });
                        } else {

                            const last_seven_days_players = ress2[0].last_7_days_players;

                            console.log(last_seven_days_players);

                            con.query(`SELECT Ifnull(COUNT(*),0) AS last_30_days_players
                            FROM scores
                            WHERE date_today BETWEEN DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND CURDATE();`, function (errord4, results4) {

                                if (errord4) {
                                    return res.json({ errorMessage: "Errror" });
                                } else {

                                    const last_thirthy_days_players = results4[0].last_30_days_players;

                                    console.log(last_thirthy_days_players);

                                    con.query('SELECT word_phrase from entries where is_upcoming = 1 and upcomming_date = curdate();', function (errsIn3, resultIn3) {
                                        if (errsIn3) {
                                            return res.json({ errorMessage: "Errror While fetching Data" });
                                        } else {

                                            var word_phrase = "No Game Today";

                                            if (resultIn3.length > 0) {

                                                word_phrase = resultIn3[0].word_phrase;
                                            }

                                            con.query(`SELECT ifNull(Count(*),0) as users_count FROM users WHERE DATE(created_at) = CURDATE();`, function (errrorsInUSer, resultsINusers) {
                                                if (errrorsInUSer) {
                                                    return res.json({ errorMessage: errrorsInUSer })
                                                } else {
                                                    const users_count = resultsINusers[0].users_count;

                                                    return res.json({
                                                        message: "Success",
                                                        statistics: {
                                                            word_phrase: word_phrase,
                                                            date_today: formattedDate,
                                                            average_time_today: data,
                                                            last_seven_days_players,
                                                            last_thirthy_days_players,
                                                            new_users_currently: users_count,
                                                            user_played_total,
                                                            data: entries,

                                                        }
                                                    });
                                                }
                                            })



                                        }
                                    })

                                }
                            })







                        }



                    });



                }
            })



        }
    });

});


router.get('/dashboard', verifyToken, function (req, res, next) {


    console.log("Hitting Dashboard");

    ///Get User Entries....
    var entries = `
    SELECT * FROM entries
    `;

    var usersQuery = `
    SELECT * FROM users
    `;

    con.query(entries, function (error, result, feild) {
        const dataToSnet = result;
        if (error) res.json({ errorMessage: error })


        console.log(result.data);
        if (result.length > 0) {
            return res.status(200).json({ message: "Success", entries: dataToSnet })
        } else {
            return res.status(200).json({ message: "Success", entries: [] });

        }
    });

})



///Update the Value of Entry with Given ID in params  as saved or Not 
router.put('/updateEntry/:id', verifyToken, function (req, res, error) {
    const id = req.params.id;

    const value = req.body.updateValue;


    if (!id) {
        return res.status(500).json({ errorMessage: "Id is Required to update feild" });
    }

    if (typeof value !== 'boolean') {
        return res.json({ errorMessage: "Boolean is Required" })
    }


    const isActive = value;

    con.query('UPDATE entries SET saved = ? WHERE entry_id = ?',
        [isActive, id], function (err, result, feild) {
            console.log(result);
            if (result) {
                const messageSuccess = result.affectedRows;
                return res.status(200).json({ message: "Success", "Rows Updated": messageSuccess });
            } else {
                return res.json({ errorMessage: err });
            }
        })
});



///Get User info of particular user with given Id in params
router.get('/userInfo/:id', verifyToken, function (req, res, error) {
    const id = req.params.id;
    if (!id) {
        return res.status(500).json({ errorMessage: "Id is Required" });
    }
    con.query(` Select * From users where id= ${id}`, function (err, result, feild) {
        console.log(result);

        if (result) {
            const data = result[0];
            return res.status(200).json({ message: "Success", data });

        } else {
            return res.json({ errorMessage: err });
        }
    })
});



///Delete Game Entry With ID in params
router.post('/deleteEntry/:id', verifyToken, function (req, res, error) {
    const id = req.params.id;


    if (!id) {
        return res.status(500).json({ errorMessage: "Id is Required to Delete Entry" });
    }


    con.query('DELETE FROM entries WHERE entry_id = ?',
        [id], function (err, result, feild) {
            // console.log(result.affectedRows);

            if (err) {
                return res.status(500).json({ errorMessage: err.message });
            }

            if (result.affectedRows === 0) {
                return res.status(500).json({ errorMessage: "No Entry Found with this ID" });

            }

            if (result) {
                const messageSuccess = result.affectedRows;
                return res.status(200).json({ message: "Success Entry Deleted Successfully", "Affected Rows": messageSuccess });


            } else {
                return res.status(500).json({ errorMessage: err });

            }
        })
});



///Get All Users to Show in Database Section
router.get('/getAllUsers/', verifyToken, function (req, res, error) {
    con.query('Select * From users', function (err, result, feild) {
        console.log(result);

        if (result) {
            const data = result;
            return res.status(200).json({ message: "Success", users: data });

        } else {
            return res.json({ errorMessage: err });
        }
    })
});


///Forgot Reset Admin 



function isBoolean(val) {
    return val === false || val === true;
}

///Deativate User as Active Or Not
router.put('/changeUserStatus', verifyToken, function (req, res, error) {
    const id = req.body.userId;
    const isActive = req.body.active;

    console.log(isActive);

    if (!id) {
        return res.status(501).json({ errorMessage: "User Id is Required" });
    }

    if (!(isBoolean(isActive))) {
        return res.status(501).json({ errorMessage: "Boolean is Required", });

    }

    const query = `UPDATE users SET is_active = ${isActive} WHERE id = ${id}`;

    con.query(query,
        function (err, result, feild) {
            if (err) {
                return res.json({ errorMessage: err.message });
            }

            if (result) {
                const messageSuccess = result.affectedRows;

                if (messageSuccess === 0) {
                    return res.status(200).json({ errorMessage: "No User exists with this id", });

                }
                return res.status(200).json({ message: "Success", "Rows Updated": messageSuccess });

            } else {
                return res.json({ errorMessage: err.message });
            }
        })
});

////Forgot Password for Email 

// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

router.put('/changePassword', (req, res) => {
    const email = req.body.email;
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;

    if (!currentPassword) {
        return res.json({ errorMessage: "Current Password is Missing" });
    }

    if (!newPassword) {
        return res.json({ errorMessage: "New Password is Missing" });

    }

    // Verify that the current password is correct
    con.query('SELECT * FROM admin WHERE email = ?', [email], (err, results) => {
        if (err) throw err;
        if (results.length === 0) {
            // Email not found
            return res.json({ errorMessage: 'Email not found' });
        } else {
            const user = results[0];

            console.log(user.email);

            //   const hashedPassword = bcrypt.hashSync("12345",10);

            //   console.log(hashedPassword);
            if (!(bcrypt.compareSync(currentPassword, user.password))) {
                // Current password is incorrect
                return res.json({ errorMessage: 'Current password is incorrect' });
            } else {
                // Current password is correct, update the password and generate a new JWT
                const newHashedPassword = bcrypt.hashSync(newPassword, 10);

                console.log(newHashedPassword);


                con.query('UPDATE admin SET password = ? WHERE email = ?', [newHashedPassword, user.email], (err) => {
                    if (err) throw err;
                    // Generate a new JWT with the updated information
                    const payload = {
                        id: user.id,
                        email: user.email,
                        username: user.username,
                        // etc.
                    };
                    const options = {
                        expiresIn: '360d'
                    };

                    const newToken = jwt.sign(payload, process.env.TOKEN_KEY, options);
                    return res.json({ token: newToken, userID: user.id });
                });
            }
        }
    });
});


router.put('/addUpcomingEntry', verifyToken, function (req, res) {



    const entryId = req.body.entryId;
    const playDate = req.body.playDate;

    if (!entryId || !playDate) {
        return res.json({ errorMessage: "Incomplete Data required play date and entry id" });
    }

    const upComingQuery = `UPDATE entries
        SET is_upcoming = true , upcomming_date = ?
        WHERE entry_id = ${entryId};
        `

    con.query(upComingQuery, [playDate], function (err, result, feild) {
        if (err) return res.json({ errorMessage: err.message });

        const rowsUpdated = result.affectedRows;
        return res.json({ message: "Success Entry Added to Upcoming Entries", rowsUpdated });
    })



});

router.put('/updateUser', verifyToken, function (req, res) {

    const userId = req.body.user_id;
    const userName = req.body.username;
    const email = req.body.email;
    const tiktok = req.body.tiktok_link;
    const twitter_link = req.body.twitter_link;
    const instagram_link = req.body.instagram_link;
    const facebook_link = req.body.facebook_link;
    const youtube_link = req.body.youtube_link ?? "";


    var query1 = `Update users SET username = ?,email = ?,tiktok_link = ?,twitter_link = ?,instagram_link= ?,facebook_link= ? where id = ?`;

    const query3 = `Update scores SET username = ? where user_id = ?`;
    const query2 = `Update entries SET username = ? where user_id = ?`;
    const query = `SELECT COUNT(*) as count FROM users WHERE username = ?`;


    if (!userId) {
        return res.json({ errorMessage: "User ID is Required to update" })
    }

    if (!userName) {
        var q = `Update users SET email = ?,tiktok_link = ?,twitter_link = ?,instagram_link= ?,facebook_link= ? where id = ?`;

        //   console.log(`User name is ${userName}`);

        con.query(q, [email, tiktok, twitter_link, instagram_link, facebook_link, userId], function (errors, results) {
            console.log(results);

            if (errors) {
                return res.json({ errorMessage: errors });
            }
            console.log(results);

            if (results.affectedRows > 0) {

                con.query('SELECT COUNT(*) as count FROM entries WHERE user_id = ?', [userId], function (errss, resultss) {

                    console.log("CHecking user name in Entries")
                    if (resultss.count > 0) {

                        console.log("Count is Grater than 0")

                        con.query(query2, [userName, userId], function (eers, rees) {
                            if (errss) {
                                con.query('ROLLBACK');
                                return res.json({ errorMessage: errss.message });

                            }
                        });
                    }

                    con.query('SELECT COUNT(*) as count FROM scores WHERE user_id = ?', [userId], function (counerr, countresult) {
                        if (countresult.count > 0) {
                            console.log("Count is Grater than 0 in Scores")

                            con.query(query3, [userName, userId], function (eers, rees) {
                                if (errss) {
                                    console.log("Error in Query 3",)

                                    con.query('ROLLBACK');
                                    return res.json({ errorMessage: errss.message });
                                }
                            });
                        }

                    })

                    console.log("Success Comming Now")
                    con.query('COMMIT', function (userNameCommitErr, userNameCommitResult) {
                        if (userNameCommitErr) {
                            con.query('ROLLBACK');
                            return res.json({ errorMessage: errss.message });
                        }

                        return res.status(200).json({ message: "User Data updated successfully" });

                    });

                })


            } else {
                con.query('ROLLBACK');
                return res.status(200).json({ errorMessage: "Error Updated UserData" });

            }

        });



    } else {

        con.query(query, [userName], function (error, rss, fields) {
            if (error) return res.json({ errorMessage: error });

            if (rss[0].count > 0) {
                console.log('Username is taken');

                return res.json({ errorMessage: "User Name is Already Taken" });

            }
            else {
                console.log('Username is available');
                con.query('START TRANSACTION')


                console.log(`User name is ${userName}`);

                con.query(query1, [userName, email, tiktok, twitter_link, instagram_link, facebook_link, userId], function (errors, results) {
                    console.log(results);

                    if (errors) {
                        return res.json({ errorMessage: errors });
                    }
                    console.log(results);

                    if (results.affectedRows > 0) {

                        con.query('SELECT COUNT(*) as count FROM entries WHERE user_id = ?', [userId], function (errss, resultss) {

                            console.log("CHecking user name in Entries")
                            if (resultss.count > 0) {

                                console.log("Count is Grater than 0")

                                con.query(query2, [userName, userId], function (eers, rees) {
                                    if (errss) {
                                        con.query('ROLLBACK');
                                        return res.json({ errorMessage: errss.message });

                                    }
                                });
                            }

                            con.query('SELECT COUNT(*) as count FROM scores WHERE user_id = ?', [userId], function (counerr, countresult) {
                                if (countresult.count > 0) {
                                    console.log("Count is Greater than 0 in Scores")

                                    con.query(query3, [userName, userId], function (eers, rees) {
                                        if (errss) {
                                            console.log("Error in Query 3",)

                                            con.query('ROLLBACK');
                                            return res.json({ errorMessage: errss.message });
                                        }
                                    });
                                }

                            })

                            console.log("Success Comming Now")
                            con.query('COMMIT', function (userNameCommitErr, userNameCommitResult) {
                                if (userNameCommitErr) {
                                    con.query('ROLLBACK');
                                    return res.json({ errorMessage: errss.message });
                                }

                                // const payload = {
                                //     id: userId,
                                //     username: userName,
                                // };
                                // const options = {
                                //     expiresIn: '365d'
                                // };
                                // const newToken = jwt.sign(payload, process.env.TOKEN_KEY, options);
                                return res.status(200).json({ message: "User Data updated successfully" });

                            });

                        })


                    } else {
                        con.query('ROLLBACK');
                        return res.status(200).json({ errorMessage: "Error Updated UserData" });

                    }

                });
            }
        });

    }

});

router.put('/removeUpcomingEntry', verifyToken, function (req, res) {


    const entryId = req.body.entryId;




    if (!entryId) {
        return res.json({ errorMessage: "Incomplete Data required play date and entry id" });
    }

    const upComingQuery = `UPDATE entries
    SET is_upcoming = false , upcomming_date = ""
    WHERE entry_id = ${entryId};
    `

    con.query(upComingQuery, [entryId], function (err, result, feild) {
        if (err) return res.json({ errorMessage: err.message });

        const rowsUpdated = result.affectedRows;
        return res.json({ message: "Success Entry Removed from Upcoming Entries", rowsUpdated });
    })

});


module.exports = router;