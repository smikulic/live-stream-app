const express = require('express'),
    path = require('path'),
    Session = require('express-session'),
    bodyParse = require('body-parser'),
    FileStore = require('session-file-store')(Session),
    flash = require('connect-flash'),
    port = 3333,
    app = express();

const node_media_server = require('./media_server');
 
//  rtmp://127.0.0.1:1935/live
// http://127.0.0.1:8888/api/streams
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static('public'));
app.use(flash());
app.use(require('cookie-parser')());
app.use(bodyParse.urlencoded({extended: true}));
app.use(bodyParse.json({extended: true}));

app.use('/streams', require('./streams'));
 
app.use(Session({
    store: new FileStore({
        path : './server/sessions',
    }),
    secret: '123',
    maxAge : Date().now + (60 * 1000 * 30)
}));
 
app.get('*', (req, res) => {
    res.render('index');
});
 
app.listen(port, () => console.log(`App listening on ${port}!`));


node_media_server.run();