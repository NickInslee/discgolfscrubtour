// server/index.js
const path = require("path");
const mariadb = require("mariadb");
const mysqldb = require("mysql");
const express = require("express");
const { response } = require("express");
const dbInfo = require("./dbInfo.json");
const dateFormat = require("date-format");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/get-announcements", (req,res) => {
    //create mysql connection
    mariadb.createConnection({
        host: dbInfo.host, 
        user: dbInfo.user,
        password: dbInfo.password,
        database: dbInfo.database
    }).then(conn => {
        conn.query("SELECT * FROM announcements WHERE expires > now();")
            .then(rows => {
                var objs = [];
                for (var i=0; i < rows.length; i++){
                    objs.push({
                        title: rows[i].title, 
                        date: dateFormat.asString('MM/dd/yyyy', rows[i].date),
                        message: rows[i].message
                    });
                }
                conn.end();
                res.send(JSON.stringify(objs));
            })
            .catch(err => {
                throw err;
            })
        })
    .catch(err => {
        throw err;
    });
});

app.get("/get-events", (req,res) => {
    //create mysql connection
    mariadb.createConnection({
        host: dbInfo.host, 
        user: dbInfo.user,
        password: dbInfo.password,
        database: dbInfo.database
    }).then(conn => {
            conn.query("SELECT * FROM events;")
                .then(rows => {
                    var objs = [];
                    for (var i=0; i < rows.length; i++){
                        objs.push({
                            eventStart: dateFormat.asString('MM / dd / yyyy', rows[i].event_start_date), 
                            eventEnd: dateFormat.asString('MM / dd / yyyy', rows[i].event_end_date),
                            eventName: rows[i].event_name,
                            eventDescription: rows[i].event_description, 
                            eventLocation: rows[i].event_location
                        });
                    }
                    conn.end();
                    res.send(JSON.stringify(objs));
                })
                .catch(err => {
                    throw err;
                })
            })
        .catch(err => {
            throw err;
        });
});

app.get("/get-players", (req,res) => {
    //create mysql connection
    mariadb.createConnection({
            host: dbInfo.host, 
            user: dbInfo.user,
            password: dbInfo.password,
            database: dbInfo.database
        }).then(conn => {
            conn.query("SELECT * FROM scrub_players ORDER BY scrub_tour_rank;")
                .then(rows => {
                    var objs = [];
                    for (var i=0; i < rows.length; i++){
                        objs.push({
                            rank: rows[i].scrub_tour_rank == -1 ? '-' : rows[i].scrub_tour_rank, 
                            name: rows[i].player_name, 
                            year_joined: rows[i].year_joined, 
                            woody: rows[i].woody, 
                            scrub_lord: rows[i].scrub_lord
                        });
                    }
                    conn.end();
                    res.send(JSON.stringify(objs));
                })
                .catch(err => {
                    throw err;
                })
            })
        .catch(err => {
            throw err;
        });
});

app.get("/get-player-stat-info", (req,res) => {
    //create mysql connection
    mariadb.createConnection({
            host: dbInfo.host, 
            user: dbInfo.user,
            password: dbInfo.password,
            database: dbInfo.database
        }).then(conn => {
            conn.query("SELECT * FROM scrub_players ORDER BY scrub_tour_rank;")
                .then(rows => {
                    var objs = [];
                    for (var i=0; i < rows.length; i++){
                        objs.push({
                            rank: rows[i].scrub_tour_rank == -1 ? '-' : rows[i].scrub_tour_rank, 
                            name: rows[i].player_name, 
                            year_joined: rows[i].year_joined, 
                            woody: rows[i].woody, 
                            scrub_lord: rows[i].scrub_lord
                        });
                    }
                    conn.end();
                    res.send(JSON.stringify(objs));
                })
                .catch(err => {
                    throw err;
                })
            })
        .catch(err => {
            throw err;
        });
});

app.get("/get-all-player-info", (req,res) => {
    mariadb.createConnection({
        host: dbInfo.host, 
        user: dbInfo.user,
        password: dbInfo.password,
        database: dbInfo.database
    }).then(conn => {
        conn.query("SELECT player_name, player_photo, scrub_tour_rank, scrub_tour_points, current_tag, average_rating, average_score FROM (SELECT * FROM scrub_players as t1 JOIN (SELECT player_id, AVG(rating) as average_rating, AVG(score_from_par) as average_score FROM scorecards WHERE NOT(player_id = -1) GROUP BY player_id) as t2 USING (player_id)) as t3;")
            .then(rows => {
                var objs = [];
                for (var i=0; i < rows.length; i++){
                    objs.push({
                        player_name: rows[i].player_name,
                        player_photo: rows[i].player_photo,
                        rank: rows[i].scrub_tour_rank == -1 ? 'N/A' : rows[i].scrub_tour_rank,
                        points: rows[i].scrub_tour_points, 
                        tag: rows[i].current_tag,
                        average_rating: rows[i].average_rating,
                        average_score: rows[i].average_score
                    });
                }
                conn.end();
                res.send(JSON.stringify(objs));
            })
            .catch(err => {
                throw err;
            })
        })
    .catch(err => {
        throw err;
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})