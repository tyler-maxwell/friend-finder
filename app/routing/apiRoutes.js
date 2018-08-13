var friendsData = require("../data/friends");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friendsData);
    });

    app.post("/api/friends", function(req, res) {
        var newFriend = req.body;

        // Get most compatible friend
        var bestFriend = null;
        var bestDifference = null;
        friendsData.forEach(element => {
            var totalDifference = 0;
            for (var i = 0; i < element.scores.length; i++) {
                var difference = Math.abs(newFriend.scores[i] - element.scores[i]);
                totalDifference += difference;
            };
            if (bestDifference == null) {
                bestDifference = totalDifference;
                bestFriend = element;
            } else if (totalDifference <= bestDifference) {
                bestDifference = totalDifference;
                bestFriend = element;
            };
        });
        
        friendsData.push(newFriend);
        res.json(bestFriend);
    });
};
