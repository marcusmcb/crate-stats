const fs = require('fs')


fs.readFile('../data/sample_traktor_data/HISTORY 2020-02-15.txt', 'utf8', function(err,data) {
    if(err) throw err;
    console.log(data)
});
