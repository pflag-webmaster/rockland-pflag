module.exports = {
    dennisDev: {
        secret: 'bobsyouruncle',
        appPort: 3000,
        dbPassword: 'Meatl0af!',
        dbHost: 'localhost',
        dbDatabase: 'rocklandpflag',
        dbUser: 'root',
        dbConnectionLimit: 50,
        domain: 'localhost',
        angPort: 4200
    },
    production: {
        secret: 'bobsyouruncle',
        appPort: 80,
        dbPassword: 'Meatl0af!',
        dbHost: 'localhost',
        dbDatabase: 'rocklandpflag',
        dbUser: 'root',
        dbConnectionLimit: 50,
        domain: 'www.rocklandpflag.org',
        angPort: 80

    }
}