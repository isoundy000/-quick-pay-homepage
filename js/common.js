var $ = require('jquery');
global.$ = $;
global.jQuery = $;
require('bootstrap/dist/js/bootstrap.min.js');




module.exports = {
    renderMarkdown: function(id, mkpath){
        var html = require("../markdown/" + mkpath);
        var container = document.getElementById(id);
        container.innerHTML = html;
    }
};