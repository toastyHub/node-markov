/** Command-line tool to generate Markov text. */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

/** Make Markov machine from text and generate text from it. */
function generateText(text) {
    // Create a new MarkovMachine instance using the input 'text'
    let mm = new markov.MarkovMachine(text);
    // Generate and print random text using the MarkovMachine instance
    console.log(mm.makeText());
}

/** Read file and generate text from it. */
function makeText(path) {
    // Read the file asynchronously using fs.readFile with encoding "utf8"
    fs.readFile(path, "utf8", function cb(err, data) {
    // If there is an error reading the file, display an error message and exit the process with code 1
        if (err) {
        console.error(`Cannot read file: ${path}: ${err}`);
        process.exit(1);
        } else {
        // If reading the file is successful, call the generateText function with the file content
        generateText(data);
        }
    });
}

/** Read URL and generate text from it. */
async function makeURLText(url) {
    let resp;
    try {
        // Make an HTTP GET request to the given URL using axios
        resp = await axios.get(url);
    } catch (err) {
        // If there is an error with the HTTP request, display an error message and exit the process with code 1
        console.error(`Cannot read URL: ${url}: ${err}`);
        process.exit(1);
    }
    // If the HTTP request is successful, call the generateText function with the response data
    generateText(resp.data);
}

/** Interpret cmdline to decide what to do. */
// Extract the command-line arguments after the first two elements (node path and script path)
let [method, path] = process.argv.slice(2);

// Check the 'method' provided in the command-line arguments and execute the corresponding function
if (method === "file") {
    // If 'method' is "file", call the makeText function with the 'path'
    makeText(path);
    } else if (method === "url") {
    // If 'method' is "url", call the makeURLText function with the 'path'
    makeURLText(path);
    } else {
    // If 'method' is not recognized, display an error message and exit the process with code 1
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}
