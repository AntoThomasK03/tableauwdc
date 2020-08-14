(function() {
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "name",
            alias: "Name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "vote",
            alias: "Vote",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "popularity",
            alias: "popularity",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "releaseDate",
            alias: "release date",
            dataType: tableau.dataTypeEnum.date
        }];

        var tableSchema = {
            id: "movieDatabase",
            alias: "Movies",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        $.getJSON("https://api.themoviedb.org/3/list/5?api_key=6b211f7515937269d952f7bd95fd7920", function(resp) {
            var feat = resp.items,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    "id": feat[i].id,
                    "name": feat[i].original_title,
                    "vote": feat[i].vote_count,
                    "popularity": feat[i].popularity,
                    "releaseDate": feat[i].release_date
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Movie Database"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
