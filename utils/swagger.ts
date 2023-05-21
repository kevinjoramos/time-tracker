import swaggerAutogen from 'swagger-autogen';
const doc = {
    info: {
        title: 'Time Tracker API',
        description: 'Track the time you spend.',
    },
    host: 'time-tracker-591z.onrender.com',
    schemes: ['http', 'https'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['../routes/router.ts'];

/* NOTE: if you use the express Router, you must pass in the
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen()(outputFile, endpointsFiles, doc).then(async () => {
    await import('../server.js');
});