const https = require('https');

const url = process.argv[2];

if (!url) {
    console.error('Usage: node verify-deployment.js <YOUR_RENDER_URL>');
    console.error('Example: node verify-deployment.js https://cicd-demo.onrender.com');
    process.exit(1);
}

// Remove trailing slash if present
const baseUrl = url.replace(/\/$/, '');
const loginUrl = `${baseUrl}/login`;

console.log(`Testing API at: ${loginUrl}...`);

const data = JSON.stringify({
    username: 'admin',
    password: '1234'
});

const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = https.request(loginUrl, options, (res) => {
    let body = '';

    res.on('data', (chunk) => {
        body += chunk;
    });

    res.on('end', () => {
        console.log(`Status Code: ${res.statusCode}`);
        console.log(`Response Body: ${body}`);

        if (res.statusCode === 200) {
            console.log('\nSUCCESS: Login successful! Deployment is working.');
        } else {
            console.error('\nFAILURE: Unexpected status code.');
            process.exit(1);
        }
    });
});

req.on('error', (error) => {
    console.error(`Error: ${error.message}`);
    process.exit(1);
});

req.write(data);
req.end();
