const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = false;
const hostname = "localhost";
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    require("appdynamics").profile({
        controllerHostName: 'hopper202411071003226.saas.appdynamics.com',
        controllerPort: 443,

        // If SSL, be sure to enable the next line
        controllerSslEnabled: true,
        accountName: 'hopper202411071003226',
        accountAccessKey: 'hibp470mqw9y',
        applicationName: 'demowebapp.net',
        tierName: 'Front-End',
        nodeName: 'demoapp-fe' // The controller will automatically append the node name with a unique number
    });
    createServer(async (req, res) => {
        try {
            // Be sure to pass `true` as the second argument to `url.parse`.
            // This tells it to parse the query portion of the URL.
            const parsedUrl = parse(req.url, true);
            const { pathname, query } = parsedUrl;
            await handle(req, res, parsedUrl);
        } catch (err) {
            console.error("Error occurred handling", req.url, err);
            res.statusCode = 500;
            res.end("internal server error");
        }
    })
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});