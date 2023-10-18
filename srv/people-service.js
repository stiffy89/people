const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {

	const contactsService = await cds.connect.to('contactset');

	let { PeopleSet } = this.entities;

	let srv = this;

    this.on('READ', 'Contacts', async (req, next) => { 
        return next();
    });

	
});
