const con = require('../db/setup_db')
const router = require('express').Router();
const jwt = require('jsonwebtoken')
require("dotenv").config();
const crypto = require('crypto');
const { verifyToken } = require('../middleware/verify_token');
const { decodeToken } = require('../utils.js');
const { Console } = require('console');

const gameNames = ['quest', 'adventure', 'legend', 'realm', 'saga', 'fortress', 'guild'];



function generateRandomUserName() {
    const randomString = crypto.randomBytes(4).toString('hex');

    // pick a random word from the list
    const randomWord = gameNames[Math.floor(Math.random() * gameNames.length)];

    // generate the game name
    const gameName = `${randomWord}-${randomString}`;
    console.log(gameName);

    return gameName;


}

function generateId() {
    return Math.floor(Date.now() / 10000);
}

function generateRandomNumber() {
    return Math.floor(Math.random() * 1000);
}

router.get('/settingNew', async (req, res, next) => {

    var sql = `SELECT pay_toggle,pay_amount,pay_thank_you_msg FROM admin WHERE id=4`;
    con.query(sql, async function (err, data) {
        if (err) {
            return res.status(500).json({ message: "Error retrieving data" });
        }
        if (data.length > 0) {
            return res.status(200).json({ message: "Success", entries: data });
        } else {
            return res.status(200).json({ message: "No data found" });
        }
    });
});



//Get User ID from Token if available if not Generate New ID and TOKEN
router.get('/getUserId', function (req, res) {
    const authHeader = req.header("Authorization");
    console.log(authHeader);

    if (authHeader) {
        console.log("Auth Header Present");
        var authorization = req.headers.authorization.split(' ')[1],
            decoded;
        try {
            console.log("Token Decoded");
            decoded = jwt.verify(authorization, process.env.TOKEN_KEY);

            console.log(decoded);
            const userId = decoded.id;
            var username = "";

            con.query('select username from users where id = ?;', [userId], (error, userNameResult, feilds) => {

                if (error) {
                    return res.json({ errorMessage: error });
                }
                const query = 'SELECT * FROM scores where user_id = ? and date_today = current_date()';
                con.query(query, [userId], function (error, result, fields) {

                    console.log(result.length);

                    if (result.length === 0) {
                        return res.json({ id: userId, username: username, game_played_today: 0 });

                    } else {
                        console.log(result[0]);
                        if (result[0].game_win_status === 1) {
                            var query2 = "SELECT COUNT(*) as count FROM entries WHERE user_id = ? AND date_today = CURDATE();";
                            con.query(query2, [userId], function (errorIn, resultIn) {
                                if (errorIn) {
                                    return res.json({ errorMessage: errs });
                                }
                                if (resultIn[0].count > 0) {
                                    return res.json({ id: userId, username: username, game_played_today: 4 });

                                } else {
                                    return res.json({ id: userId, username: username, game_played_today: 1 });

                                }
                            });

                        } else {
                            return res.json({ id: userId, username: username, game_played_today: 3 });

                        }

                    }

                })

            });

        } catch (e) {
            return res.status(401).json({ errorMessage: "Invalid token" });
        }

    } else {
        console.log("Headers Not Found Generating New Unique ID");
        var ip = req.socket.remoteAddress;
        var randomName = generateRandomUserName();

        con.query("Insert into users(ip_address,username) values(?, ?)", [ip, randomName], function (err, result, fields) {
            if (err) return res.json({ errorMessage: err.message });

            console.log("Id Not Found Generating New Unique ID");
            console.log(result);

            const uniqueId = result.insertId;
            console.log(uniqueId);

            const payload = {
                id: uniqueId,
                username: randomName,
            };
            const options = {
                expiresIn: '360d'
            };

            const newToken = jwt.sign(payload, process.env.TOKEN_KEY, options);
            return res.status(200).json({
                successMessage: "Logged in successfully",
                userId: uniqueId,
                username: randomName,
                game_played_today: 0,
                token: newToken
            });
        })

    }

});

///get statitics of single user with id
router.get("/getTodaysGame", function (req, res, next) {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;


    console.log(date);
    const query = `
    SELECT * FROM entries 
    WHERE upcomming_date = ?
    `;


    con.query(query, [date], function (err, data, feilds) {
        console.log(data, "data234567");

        if (data.length === 0) {
            return res.status(200).json({ errorMessage: "No Game Today" })
        }
        if (data) {
            // Get Data from database 
            const response = data[0];

            const photo_link = response.link_to_photo;
            const video_link = response.video_link;
            const username = response.username;
            const entry_id = response.entry_id;
            const user_id = response.user_id;

            con.query(
                "SELECT COUNT(*) as totallike FROM likes WHERE entries_id = ?;",
                [entry_id],
                function (errs3, result3, fields3) {
                    // if (errs3) {
                    //     res.json({ errorMessage: errs3 });
                    // }

                    const total_like = result3[0].totallike;
                    var authorization = req.headers.authorization.split(' ')[1];
                    const authuser = decodeToken(authorization);
                    console.log(authuser, "authuser");

                    con.query(
                        "SELECT COUNT(*) as total FROM likes WHERE entries_id = ? AND  user_id = ?;",
                        [entry_id, authuser.id],
                        function (errs3, result3, fields3) {
                            if (errs3) {
                                res.json({ errorMessage: errs3 });
                            }
                            let user_liked; // Declare user_liked here

                            if (result3[0].total > 0) {
                                user_liked = true;
                            } else {
                                user_liked = false;
                            }
                            const todays_game = {
                                photo_link,
                                video_link,
                                username,
                                entry_id,
                                user_id,
                                total_like,
                                user_liked
                            };

                            return res.status(200).json({ message: "Success", todays_game })
                        }
                    )

                }
            )

        } else {
            return res.status(200).json({ errorMessage: "No Game Today" })
        }
    })

});


///Todays Entry
router.post("/statistics/", function (req, res, next) {

    const entry_id = req.body.entry_id;

    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization.split(' ')[1];

        const user = decodeToken(authorization);

        if (!user) {
            return res.json({ errorMessage: "Token is Not Valid" });
        }

        console.log("Verifeid User")

        const query1 = 'SELECT games_played,games_win,current_streak,max_streak FROM users where id = ?';

        con.query(query1, [user.id], function (errs, result, feilds) {

            console.log("Running Query1")
            if (errs) {
                return res.json({ errorMessage: errs.message });
            }

            console.log("Running Query1 Success")


            const data = result[0];
            console.log(data);
            console.log(user.id);


            if (data == undefined) {
                return res.json({ errorMessage: "No Data found is missing" });
            }
            if (entry_id) {
                con.query('SELECT game_complete_time as time from scores where user_id = ?  and entry_id = ?', [user.id, entry_id], function (errInner, resultInner) {
                    if (errInner) {
                        return res.json({ errorMessage: errInner });
                    }
                    console.log(resultInner);
                    if (resultInner.length > 0) {

                        console.log(resultInner);

                        //game Time is greater than 0

                        const time = resultInner[0].time;
                        const statistics = {
                            games_played: data.games_played,
                            games_win: data.games_win,
                            current_streak: data.current_streak,
                            max_streak: data.max_streak,
                            game_complete_time: time
                        }
                        console.log("1")
                        return res.json({ message: "Success", statistics, });
                    } else {
                        const statistics = {
                            games_played: data.games_played,
                            games_win: data.games_win,
                            current_streak: data.current_streak,
                            max_streak: data.max_streak,
                            
                        }
                        console.log("2")

                        return res.json({ message: "Success", statistics, });

                    }

                });

            } else {

                ///NO ENTRY ID ONly Return Statis without Game time
                const statistics = {
                    games_played: data.games_played,
                    games_win: data.games_win,
                    current_streak: data.current_streak,
                    max_streak: data.max_streak,
                    
                }
                console.log("3")

                return res.json({ message: "Success", statistics, });
            }

        });

    } else {
        return res.json({ errorMessage: "No Token Found" });
    }

});


router.post('/updateGameViewCount', (req, res) => {
    const entry_id = req.body.entry_id;


    if (!entry_id) {
        return res.json({ errorMessage: "entry id is required" });
    }


    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization.split(' ')[1];
        const user = decodeToken(authorization);

        if (!user) {
            return res.json({ errorMessage: "Un Authorized User" });
        }

        con.query('START TRANSACTION', (err) => {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            con.query(
                'UPDATE entries SET view_count = view_count + 1 WHERE entry_id = ?',
                [entry_id],
                (error, results) => {
                    if (error) {
                        return con.query('ROLLBACK', function () {
                            console.log(error);
                            return res.sendStatus(500);
                        });
                    }
                    con.query('COMMIT', function (err) {
                        if (err) {
                            return con.query('ROLLBACK', function () {
                                console.log(err);
                                return res.sendStatus(500);
                            });
                        }
                        console.log('View count updated');
                        res.json({ message: 'View count updated' });
                    });
                }
            );
        });

        console.log(user.id);
    } else {
        return res.json({ errorMessage: "TOKEN IS REQUIRED" });
    }


});







///Get Drawn By 
router.get('/top30Players', (request, response) => {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    const query = 'SELECT * FROM scores where date_today = ? ORDER BY game_complete_time ASC LIMIT 30;    ';


    // Execute the SELECT query and send the results as the response
    con.query(query, [date], (error, results) => {
        if (error) {
            console.error(error);

            return response.json({ error: 'Error retrieving top players' });
        }


        return response.json({ message: "Success", scores: results });
    });
});



///Get List of Top 30 Players
router.put('/updateUsername', (req, res) => {
    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization.split(' ')[1],
            decoded;
        try {
            decoded = jwt.verify(authorization, process.env.TOKEN_KEY);
        } catch (e) {
            return res.status(401).json({ errorMessage: "Token is Not Valid" });
        }

        try {

            const userName = req.body.username;
            if (!userName) {
                return res.json({ errorMessage: "Username is Required to update" })
            }

            const userId = decoded.id;
            const decodedName = decoded.username;

            con.query(`select Count(*) as users_count from users where username = ?`, [userName], function (userNameError, userNameResult) {
                if (userNameError) {
                    return res.json({ errorMessage: userNameError });
                } else {
                    console.log(userNameResult);

                    if (userNameResult[0].users_count > 0) {
                        return res.json({ errorMessage: "UserName Already Taken" });
                    }

                    console.log("Begining Transaction");
                    con.query('START TRANSACTION')

                    console.log("Started Transaction");



                    const query1 = `Update users SET username = ? where id = ?`;
                    const query3 = `Update scores SET username = ? where user_id = ?`;
                    const query2 = `Update entries SET username = ? where user_id = ?`;



                    con.query(query1, [userName, userId], function (errors, results) {
                        console.log(results);

                        if (errors) {
                            return res.json({ errorMessage: errors });
                        }


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

                            });

                            con.query('COMMIT', function (userNameCommitErr, userNameCommitResult) {
                                if (userNameCommitErr) {
                                    con.query('ROLLBACK');
                                    return res.json({ errorMessage: errss.message });

                                }

                                const payload = {
                                    id: userId,
                                    username: userName,
                                };
                                const options = {
                                    expiresIn: '365d'
                                };
                                const newToken = jwt.sign(payload, process.env.TOKEN_KEY, options);
                                return res.status(200).json({ message: "Username updated successfully", newToken });

                            });




                        });
                    });
                }
            });

        } catch (e) {
            return res.status(401).json({ errorMessage: e.message });
        }

    } else {
        ///Token is Not Passed
        return res.json({ errorMessage: "Token Not Found" });

    }
});

router.post('/getDrawnBy', verifyToken, (request, response) => {

    const entry_id = request.body.entry_id;
    const user_id = request.body.user_id;

    if (!entry_id && !user_id) {
        return response.json({ errorMessage: "Invalid Data User Id and enrty id required", });

    }

    const query = 'SELECT twitter_link,snapchat_link,instagram_link,tiktok_link FROM users where id = ?';


    // Execute the SELECT query and send the results as the response
    con.query(query, [user_id], (error, results) => {
        if (error) {
            console.error(error);
            response.send({ error: 'Error retrieving top players' });
            return;
        }

        if (results.length === 0) {
            return response.json({ errorMessage: 'No user found' });

        }
        const data = results[0];




        return response.json({ message: "Success", userData: data });
    });
});

// uploadTextFileToCloudinary(fileName, (error, url) => {
//     if (error) {
//         console.error(error);
//         return res.json({ message: 'Error uploading file to Cloudinary' });
//     }

//     console.log("Uploading File to Cloudinary");
//     console.log(url);

//     return res.json({ message: "Success", url });
// });

router.post('/submitEntry', async (req, res) => {
    const userId = req.body.user_id;
    const userName = req.body.username;
    const email = req.body.email;
    const tiktok = req.body.tiktok_link;
    const twitter_link = req.body.twitter_link;
    const instagram_link = req.body.instagram_link;
    const facebook_link = req.body.facebook_link;
    const youtube_link = req.body.youtube_link ?? "";
    if (req.headers && req.headers.authorization) {
        const { word_phrase, photo_link, video_link, email, tiktok_username, twitter_username, instagram_username, facebook_username, youtube_username, share_my_username, share_social_media_account } = req.body;
        console.log(req.body, "saad");

        if (!word_phrase) {
            return res.status(401).json({ errorMessage: "No Word Phrase Found" })
        }

        if (!email) {
            return res.status(401).json({ errorMessage: "No Email Added" })
        }

        if (!photo_link) {
            return res.status(401).json({ errorMessage: "No Photo Added" })
        }

        if (!video_link) {
            return res.status(401).json({ errorMessage: "No Video Added" })
        }

        var authorization = req.headers.authorization.split(' ')[1],
            decoded;

        try {
            decoded = jwt.verify(authorization, process.env.TOKEN_KEY);

            const userId = decoded.id;
            const username = decoded.username;

            con.query('SELECT * from users where id = ?', [userId], async function (err, data) {
                if (err) throw err;

                if (data.length > 0) {
                    const updateData = {
                        "email": email,
                        "twitter_link": twitter_username,
                        "instagram_link": instagram_username,
                        "tiktok_link": tiktok_username,
                        "facebook_link": facebook_username,
                        "youtube_link": youtube_username,
                        "share_social": share_social_media_account,
                        "share_user": share_my_username
                    };

                    var sqlInner = `Update users SET email = ?,tiktok_link = ?,twitter_link = ?,instagram_link= ?,facebook_link= ? where id = ?`;

                    con.query('START TRANSACTION');

                    const query2 = 'Insert into entries (user_id,word_phrase,day_of_week,date_today,link_to_photo,video_link,username) values (?,?,DAYNAME(CURDATE()), CURRENT_DATE(),?,?,?) ';
                    con.query(sqlInner,[email, tiktok, twitter_link, instagram_link, facebook_link, userId], function (errors, results) {
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
                    
                    con.query(query2, [userId, word_phrase, photo_link, video_link, username], function (err, reslt, fields) {
                        if (err) {
                            con.query('ROLLBACK');
                            return res.json({ errorMessage: err.message });
                        }

                      
                    });

                } else {
                    return res.status(401).json({ errorMessage: "User not Found" });
                }
            });
        } catch (e) {
            return res.status(401).json({ errorMessage: "Token is Not Valid" });
        }
    } else {
        return res.json({ errorMessage: "Token Not Found" });
    }
});



// router.post('/submitEntry', async (req, res, next) => {


//     if (req.headers && req.headers.authorization) {

//         const { word_phrase, photo_link, video_link, email, tiktok_username, twitter_username, instagram_username, facebook_username, youtube_username, share_my_username, share_social_media_account } = req.body;
//         console.log(req.body, "saad");
//         // const files = req.files;


//         if (!word_phrase) {
//             return res.status(401).json({ errorMessage: "No Word Phrase Found" })
//         }

//         if (!email) {
//             return res.status(401).json({ errorMessage: "No Email Added" })
//         }

//         if (!photo_link) {
//             return res.status(401).json({ errorMessage: "No Photo Added" })
//         }

//         if (!video_link) {
//             return res.status(401).json({ errorMessage: "No Video Added" })

//         }



//         var authorization = req.headers.authorization.split(' ')[1],
//             decoded;


//         try {
//             decoded = jwt.verify(authorization, process.env.TOKEN_KEY);

//             const userId = decoded.id;
//             const username = decoded.username;

//             con.query('SELECT * from users where id = ?', [userId], async function (err, data) {
//                 if (err) throw err;

//                 if (data.length > 0) {
//                     ///USer Found
//                     var sqlInner = `UPDATE users SET ? WHERE id= ?`;

//                     const updateData = {
//                         "email": email,
//                         "twitter_link": twitter_username,
//                         "instagram_link": instagram_username,
//                         "tiktok_link": tiktok_username,
//                         "facebook_link": facebook_username,
//                         "youtube_link": youtube_username,
//                         "share_social": share_social_media_account,
//                         "share_user": share_my_username
//                     }


//                     con.query('START TRANSACTION')

//                     const query2 = 'Insert into entries (user_id,word_phrase,day_of_week,date_today,link_to_photo,video_link,username) values (?,?,DAYNAME(CURDATE()), CURRENT_DATE(),?,?,?) ';


//                     con.query(query2, [userId, word_phrase, photo_link, video_link, username,], function (err, reslt, fields) {
//                         if (err) {
//                             con.query('ROLLBACK');
//                             return res.json({ errorMessage: err.message });
//                         }
//                         con.query(sqlInner, [updateData, userId], function (error, result,) {

//                             if (error) {
//                                 con.query('ROLLBACK');
//                                 return res.json({ errorMessage: error.message });
//                             }

//                             con.query('COMMIT', function (commitErr, commitResult, commitFIelds) {
//                                 if (commitErr) {
//                                     con.query('ROLLBACK');
//                                 }

//                                 return res.json({ message: "Success Entry Added Successfully" });

//                             });



//                         });

//                     });

//                 } else {
//                     //user Not Found
//                     return res.status(401).json({ errorMessage: "User not Found" });
//                 }

//             })


//         } catch (e) {
//             return res.status(401).json({ errorMessage: "Token is Not Valid" });
//         }

//     } else {
//         return res.json({
//             errorMessage: "Token Not Found"
//         });
//     }

// });


router.post("/checkGameWord", async function (req, res) {
    const keyword = req.body.keyword;
    const entry_id = req.body.entry_id;
    const game_time = req.body.game_complete_time;
    const username = req.body.username;

    // if (!keyword) {
    //     return res.json({ errorMessage: "Keyword is Missing" });
    // }

    if (!entry_id) {
        return res.json({ errorMessage: "Entry ID is Missing" });
    }

    if (!game_time) {
        return res.json({ errorMessage: "Game Completed Time is Missing" });

    }
    if (!username) {
        return res.json({ errorMessage: "User Name is Missing" });
    }



    if (req.headers && req.headers.authorization) {


        var authorization = req.headers.authorization.split(' ')[1],
            decoded;

        try {
            decoded = jwt.verify(authorization, process.env.TOKEN_KEY);

            const userId = decoded.id;
            con.query('SELECT COUNT(*) as count FROM scores WHERE user_id = ? AND date_today = CURDATE();', [userId], function (errs, results, feilds) {
                console.log(results);

                if (results[0].count > 0) {
                    return res.json({ errorMessage: "You have already submitted todays game" })
                } else {

                    con.query('select word_phrase from entries where entry_id = ? LIMIT 1;', [entry_id], function (err, result, feilds) {
                        console.log(result);
                        const matched = keyword.toLowerCase().localeCompare(result[0].word_phrase.toLowerCase());
                        if (matched === 0) {
                            con.query('START TRANSACTION');
                            con.query('Insert into scores(entry_id,user_id,username,game_complete_time,date_today,game_win_status) values (?,?,?,?,CURDATE(),?)',
                                [entry_id, userId, username, game_time, true],
                                function (errs2, result2, feidls2) {
                                    if (!errs2) {
                                        con.query(
                                            'UPDATE users SET games_played = games_played +1, games_win =games_win + 1    WHERE id = ?;', [userId],
                                            function (eers3, results3, feidls3) {
                                                if (!eers3) {
                                                    // con.query('COMMIT', function (errTrasaction, resultTransaction) {
                                                    //     if (!errTrasaction) {
                                                    //         return res.json({ message: "You Win" });
                                                    //     }
                                                    // })
                                                    con.query(
                                                        "SELECT word_phrase FROM entries WHERE entry_id = ?;",
                                                        [entry_id],
                                                        function (errs4, results4, fields4) {
                                                            if (errs4) {
                                                                console.log(results4[0].word_phrase, "saad");
                                                                return res.json({ errorMessage: errs4 });
                                                            }
                                                            return res.json({ message: "You Win", word: results4[0].word_phrase });
                                                        })

                                                    con.query('ROLLBACK');
                                                }


                                            }

                                        )

                                    }

                                    if (errs2) {
                                        con.query('ROLLBACK');
                                        return res.json({ errorMessage: errs2 });
                                    }
                                    console.log(result2);
                                }

                            )
                        } else {

                            con.query('START TRANSACTION');
                            con.query('Insert into scores(entry_id,user_id,username,game_complete_time,date_today,game_win_status) values (?,?,?,?,CURDATE(),?)',
                                [entry_id, userId, username, game_time, false],
                                function (errs2, result2, feidls2) {
                                    if (!errs2) {
                                        con.query(
                                            'UPDATE users SET games_played = games_played +1    WHERE id = ?;', [userId],
                                            function (eers3, results3, feidls3) {
                                                if (!eers3) {
                                                    // con.query('COMMIT', function (errTrasaction, resultTransaction) {
                                                    //     if (!errTrasaction) {
                                                    //         return res.json({ message: "You Loose Try better luck tommorrow" });
                                                    //     }
                                                    // })
                                                    // con.query('ROLLBACK');
                                                    con.query(
                                                        "SELECT word_phrase FROM entries WHERE entry_id = ?;",
                                                        [entry_id],
                                                        function (errs4, results4, fields4) {
                                                            if (errs4) {
                                                                console.log(results4[0].word_phrase, "saad");
                                                                return res.json({ errorMessage: errs4 });
                                                            }
                                                            return res.json({ message: "You Loose Try better luck tommorrow"});
                                                        })

                                                    con.query('ROLLBACK');

                                                }

                                                con.query('COMMIT', function (errTrasaction, resultTransaction) {
                                                    if (!errTrasaction) {
                                                        return res.json({ errorMessage: "Not matched try Again Better Luck next Time" });

                                                    }

                                                    con.query('ROLLBACK');
                                                })
                                            }

                                        )

                                    } else {
                                        con.query('ROLLBACK');
                                        return res.json({ errorMessage: errs2 });
                                    }


                                }
                            );
                        }

                    });

                }
            });

        } catch (e) {
            return res.json({ errorMessage: "Unauthorized Token" });
        }
    } else {
        return res.json({ errorMessage: "No Token Found" })
    }
});




router.post("/checkGameWordEnter", async function (req, res) {
    const keyword = req.body.keyword;
    const entry_id = req.body.entry_id;
    const game_time = req.body.game_complete_time;
    const username = req.body.username;

    // if (!keyword) {
    //     return res.json({ errorMessage: "Keyword is Missing" });
    // }

    if (!entry_id) {
        return res.json({ errorMessage: "Entry ID is Missing" });
    }

    if (!game_time) {
        return res.json({ errorMessage: "Game Completed Time is Missing" });

    }
    if (!username) {
        return res.json({ errorMessage: "User Name is Missing" });
    }



    if (req.headers && req.headers.authorization) {


        var authorization = req.headers.authorization.split(' ')[1],
            decoded;
        try {
            decoded = jwt.verify(authorization, process.env.TOKEN_KEY);

            const userId = decoded.id;
            con.query('SELECT COUNT(*) as count FROM scores WHERE user_id = ? AND date_today = CURDATE();', [userId],
                function (errs, results, feilds) {
                    con.query('select word_phrase from entries where entry_id = ? LIMIT 1;', [entry_id],
                        function (err, result, feilds) {
                            // console.log(result, "matched12");
                            const matched = keyword.toLowerCase();
                            console.log(result[0].word_phrase, "matched");
                            if (result[0].word_phrase.toLowerCase() == matched) {
                                con.query('START TRANSACTION');
                                con.query('Insert into scores(entry_id,user_id,username,game_complete_time,date_today,game_win_status) values (?,?,?,?,CURDATE(),?)',
                                    [entry_id, userId, username, game_time, true],
                                    function (errs2, result2, feidls2) {
                                        if (!errs2) {
                                            con.query(
                                                'UPDATE users SET games_played = games_played +1, games_win =games_win + 1    WHERE id = ?;', [userId],
                                                function (eers3, results3, feidls3) {
                                                    if (!eers3) {

                                                        // con.query('COMMIT', function (errTrasaction, resultTransaction) {
                                                        //     if (!errTrasaction) {

                                                        //         return res.json({ message: "You Win" });
                                                        //     }
                                                        // });
                                                        con.query(
                                                            "SELECT word_phrase FROM entries WHERE entry_id = ?;",
                                                            [entry_id],
                                                            function (errs4, results4, fields4) {
                                                                if (errs4) {
                                                                    console.log(results4[0].word_phrase, "saad");
                                                                    return res.json({ errorMessage: errs4 });
                                                                }
                                                                return res.json({ message: "You Win", word: results4[0].word_phrase });
                                                            })
                                                    }
                                                })


                                        } else {
                                            con.query('ROLLBACK');
                                            return res.json({ errorMessage: errs2 });
                                        }
                                        // return res.json({ message: "You Win" })
                                    }
                                );
                            } else {
                                con.query(
                                    "SELECT word_phrase FROM entries WHERE entry_id = ?;",
                                    [entry_id],
                                    function (errs4, results4, fields4) {
                                        if (errs4) {
                                            console.log(results4[0].word_phrase, "saad");
                                            return res.json({ errorMessage: errs4 });
                                        }
                                        return res.json({ message: "Try again !!!"});
                                    })

                                con.query('ROLLBACK');
                                // return res.json({ message: "Try again !!!" });
                            }
                        });
                }
            );
        } catch (e) {
            return res.json({ errorMessage: "Unauthorized Token" });
        }

    } else {
        return res.json({ errorMessage: "No Token Found" })
    }
});



// router.post("/addLike", async function (req, res) {
//     const entry_id = req.body.entry_id;
//     // const user_id = req.body.user_id;
//     // console.log(user_id, "saad");


//     if (!entry_id) {
//         return res.json({ errorMessage: "Entry ID is Missing" });
//     }

//     if (req.headers && req.headers.authorization) {
//         var authorization = req.headers.authorization.split(" ")[1],
//             decoded;
//         try {
//             decoded = jwt.verify(authorization, process.env.TOKEN_KEY);

//             const userId = decoded.id;


//             con.query(
//                 "SELECT id, COUNT(*) as count FROM likes WHERE user_id = ? AND entries_id = ?",
//                 [userId, entry_id],
//                 function (errs, results, fields) {
//                     if (errs) {
//                         console.error(errs);
//                         return res.json({ errorMessage: "Error querying database" });
//                     }

//                     console.log(results[0].count > 0, "data");
//                     if (results[0].count > 0) {
//                         con.query(
//                             "SELECT COUNT(*) as totallike FROM likes WHERE entries_id = ?",
//                             [entry_id],
//                             function (errs3, result3, fields3) {
//                                 if (errs3) {
//                                     console.error(errs3);
//                                     return res.json({ errorMessage: "Error querying database" });
//                                 }

//                                 con.query(
//                                     "DELETE FROM likes WHERE entries_id = ? AND user_id = ?",
//                                     [entry_id, userId],
//                                     function (err, result, fields) {
//                                         if (err) {
//                                             console.error(err);
//                                             return res.json({ errorMessage: "Error deleting like from database" });
//                                         }
//                                         return res.json({ total_like: result3[0].totallike - 1, status: "Dislike" });
//                                     }
//                                 )
//                             }
//                         )
//                     } else {
//                         console.log(userId, "userid");
//                         console.log(entry_id, "entry_id");
//                         con.query(

//                             "SELECT COUNT(*) as totallike FROM likes WHERE entries_id = ?",
//                             [entry_id],
//                             function (errs1, result1, fields1) {
//                                 if (errs1) {
//                                     console.error(errs1);
//                                     return res.json({ errorMessage: "Error querying database" });
//                                 }

//                                 con.query(
//                                     "INSERT INTO likes (user_id, entries_id) VALUES (?, ?)",
//                                     [userId, entry_id],
//                                     function (errs2, result2, fields2) {
//                                         if (errs2) {
//                                             console.error(errs2);
//                                             return res.json({ errorMessage: "Error inserting like into database" });
//                                         }
//                                         console.log(result2);
//                                         let totalLikes = result1[0].totallike;
//                                         console.log(totalLikes, "totalLikes");
//                                         return res.json({ total_like: totalLikes + 1, status: "Like" });
//                                     }
//                                 );
//                             }
//                         );
//                     }

//                 })
//         } catch (err) {
//             console.error(err);
//             return res.json({ errorMessage: "Error decoding JWT token" });
//         }

//     } else {
//         return res.json({ errorMessage: "Token Not Found" });
//     }
// });


router.post("/addLike", async function (req, res) {
    const entry_id = req.body.entry_id;
    // const user_id = req.body.user_id;
    // console.log(user_id, "saad");

    if (!entry_id) {
        return res.json({ errorMessage: "Entry ID is Missing" });
    }

    if (req.headers && req.headers.authorization) {
        var authorization = req.headers.authorization.split(" ")[1],
            decoded;
        try {
            decoded = jwt.verify(authorization, process.env.TOKEN_KEY);

            const userId = decoded.id;

            con.query(
                "SELECT id, COUNT(*) as count FROM likes WHERE user_id = ? AND entries_id = ?",
                [userId, entry_id],
                function (errs, results, fields) {
                    if (errs) {
                        console.error(errs);
                        return res.json({ errorMessage: "Error querying database" });
                    }

                    console.log(results[0].count > 0, "data");
                    if (results[0].count > 0) {
                        con.query(
                            "SELECT COUNT(*) as totallike FROM likes WHERE entries_id = ?",
                            [entry_id],
                            function (errs3, result3, fields3) {
                                if (errs3) {
                                    console.error(errs3);
                                    return res.json({ errorMessage: "Error querying database" });
                                }

                                con.query(
                                    "DELETE FROM likes WHERE entries_id = ? AND user_id = ?",
                                    [entry_id, userId],
                                    function (err, result, fields) {
                                        if (err) {
                                            console.error(err);
                                            return res.json({ errorMessage: "Error deleting like from database" });
                                        }
                                        let totalLikes = result3[0].totallike - 1;
                                        return res.json({ total_like: totalLikes, status: "Dislike" });
                                    }
                                )
                            }
                        )
                    } else {
                        console.log(userId, "userid");
                        console.log(entry_id, "entry_id");
                        con.query(

                            "SELECT COUNT(*) as totallike FROM likes WHERE entries_id = ?",
                            [entry_id],
                            function (errs1, result1, fields1) {
                                if (errs1) {
                                    console.error(errs1);
                                    return res.json({ errorMessage: "Error querying database" });
                                }

                                con.query(
                                    "INSERT INTO likes (user_id, entries_id) VALUES (?, ?)",
                                    [userId, entry_id],
                                    function (errs2, result2, fields2) {
                                        if (errs2) {
                                            console.error(errs2);
                                            return res.json({ errorMessage: "Error inserting like into database" });
                                        }
                                        let totalLikes = result1[0].totallike + 1;
                                        console.log(totalLikes, "totalLikes");
                                        return res.json({ total_like: totalLikes, status: "Like" });
                                    }
                                );
                            }
                        );
                    }

                })
        } catch (err) {
            console.error(err);
            return res.json({ errorMessage: "Error decoding JWT token" });
        }

    } else {
        return res.json({ errorMessage: "Token Not Found" });
    }
});




// router.post("/checkGameWord", async function (req, res) {
//     const keyword = req.body.keyword;
//     const entry_id = req.body.entry_id;
//     const game_time = req.body.game_complete_time;
//     const username = req.body.username;

//     if (!keyword) {
//         return res.json({ errorMessage: "Keyword is Missing" });
//     }

//     if (!entry_id) {
//         return res.json({ errorMessage: "Entry ID is Missing" });
//     }

//     if (!game_time) {
//         return res.json({ errorMessage: "Game Completed Time is Missing" });
//     }

//     if (!username) {
//         return res.json({ errorMessage: "User Name is Missing" });
//     }

//     if (req.headers && req.headers.authorization) {
//         var authorization = req.headers.authorization.split(" ")[1],
//             decoded;
//         try {
//             decoded = jwt.verify(authorization, process.env.TOKEN_KEY);

//             const userId = decoded.id;

//             con.query(
//                 "SELECT COUNT(*) as count FROM scores WHERE user_id = ? AND date_today = CURDATE();",
//                 [userId],
//                 function (errs, results, fields) {
//                     if (errs) {
//                         return res.json({ errorMessage: errs });
//                     }
//                     console.log(results);
//                     if (results[0].count > 0) {
//                         return res.json({
//                             errorMessage: "You have already submitted today's game",
//                         });
//                     } else {
//                         con.query(
//                             "SELECT word_phrase FROM entries WHERE entry_id = ? LIMIT 1;",
//                             [entry_id],
//                             function (err, result, fields) {
//                                 if (err) {
//                                     return res.json({ errorMessage: err });
//                                 }
//                                 console.log(result);
//                                 const matched = keyword
//                                     .toLowerCase()
//                                     .localeCompare(result[0].word_phrase.toLowerCase());
//                                 if (matched === 0) {
//                                     con.query("START TRANSACTION");
//                                     con.query(
//                                         "INSERT INTO scores (entry_id, user_id, username, game_complete_time, date_today, game_win_status) VALUES (?, ?, ?, ?, CURDATE(), ?);",
//                                         [entry_id, userId, username, game_time, true],
//                                         function (errs2, result2, fields2) {
//                                             if (errs2) {
//                                                 con.query("ROLLBACK");
//                                                 return res.json({ errorMessage: errs2 });
//                                             }
//                                             console.log(result2);
//                                             con.query(
//                                                 "UPDATE users SET games_played = games_played + 1, games_win = games_win + 1 WHERE id = ?;",
//                                                 [userId],
//                                                 function (errs3, results3, fields3) {
//                                                     if (errs3) {
//                                                         con.query("ROLLBACK");
//                                                         return res.json({ errorMessage: errs3 });
//                                                     }
//                                                     console.log(results3);
//                                                     con.query("COMMIT", function (
//                                                         errTransaction,
//                                                         resultTransaction
//                                                     ) {
//                                                         if (errTransaction) {
//                                                             con.query("ROLLBACK");
//                                                             return res.json({ errorMessage: errTransaction });
//                                                         }
//                                                         con.query(
//                                                             "SELECT word_phrase FROM entries WHERE entry_id = ?;",
//                                                             [entry_id],
//                                                             function (errs4, results4, fields4) {
//                                                                 if (errs4) {
//                                                                     return res.json({ errorMessage: errs4 });
//                                                                 }
//                                                                 return res.json({ message: "You Win", word: results4[0].word_phrase });
//                                                             }
//                                                         )
//                                                     });
//                                                 }
//                                             );
//                                         }
//                                     );
//                                 } else {
//                                     return res.json({ message: "Wrong word" });

//                                     //     con.query("START TRANSACTION");
//                                     //     con.query(
//                                     //         "INSERT INTO scores (entry_id, user_id, username, game_complete_time, date_today, game_win_status) VALUES (?, ?, ?, ?, CURDATE(), ?);",
//                                     //         [entry_id, userId, username, game_time, false],
//                                     //         function (errs2, result2, fields2) {
//                                     //             if (errs2) {
//                                     //                 con.query("ROLLBACK");
//                                     //                 return res.json({ errorMessage: errs2 });
//                                     //             }
//                                     //             console.log(result2);
//                                     //             con.query(
//                                     //                 "UPDATE users SET games_played = games_played + 1, games_win = games_win + 1 WHERE id = ?;",
//                                     //                 [userId],
//                                     //                 function (errs3, results3, fields3) {
//                                     //                     if (errs3) {
//                                     //                         con.query("ROLLBACK");
//                                     //                         return res.json({ errorMessage: errs3 });
//                                     //                     }
//                                     //                     console.log(results3);
//                                     //                     con.query("COMMIT", function (
//                                     //                         errTransaction,
//                                     //                         resultTransaction
//                                     //                     ) {
//                                     //                         if (errTransaction) {
//                                     //                             con.query("ROLLBACK");
//                                     //                             return res.json({ errorMessage: errTransaction });
//                                     //                         }
//                                     //                         console.log(resultTransaction);
//                                     //                         return res.json({ message: "You Loose Try Again Tommorrow" });
//                                     //                     });
//                                     //                 }
//                                     //             );
//                                     //         }
//                                     //     );

//                                 }
//                             })
//                     }
//                 })
//         } catch (e) {
//             return res.json({ errorMessage: "Token is Not Valid" });
//         }
//     } else {
//         return res.json({ errorMessage: "Token Not Found" });
//     }
// });


module.exports = router;