const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "SRE ITB API",
        version: "1.0.0",
        description: "SRE ITB API Information",
        contact: {
          name: "SRE ITB",
          url: "https://sreitb.com",
          email: "sre@km.itb.ac.id"
        }
      },
      servers: [
        {
          url: "http://localhost:3000"
        }
      ]
    },
    apis: ["./api/activity/*.js"]
  };

  module.exports = options;