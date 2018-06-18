var friendData = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friendData);
        console.log(friendData);
    });

app.post("/api/friends", function(req, res) {
    var totDiff;
    var diffArry = [];
    var newFriend = req.body;

    for (var i = 0; i < friendData.length; i++) {
        totDiff = 0;
        for (var j = 0; j < newFriend.scores.length; j++) {
            totDiff += Math.abs(friendData[i].scores[j] - newFriend.scores[j]);
        } //for j
        diffArry.push(totDiff);
    } //for i

    var match = diffArry.indexOf(Math.min(...diffArry));

    friendData.push(newFriend);
    
    console.log(newFriend);

    fs.readFile(path.join(__dirname, "../data/friends"), "utf8", function (err, data) {
        if (err) throw err;
        var json = JSON.parse(data);
        json.push(newFriend);
        fs.writeFile(path.join(__dirname, "../data/friends"), JSON.stringify(json, null, 2), function (err) {
            if (err) throw err;
        });
    }); //fs.readFile
    res.json(friendData[match]);
});
}