const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {

	const testservice = await cds.connect.to('z_crud_tst_srv');

	let { People } = this.entities;

	let srv = this;

    //filters out all the additional columns that CAP implements that is not apart of our destination
    function RequestSanitizer(req) {
        if (req.query.SELECT) {
			if (!req.query.SELECT.columns) {
				req.query.SELECT.columns = [];
				for (const el in req.target.elements) {
					req.query.SELECT.columns.push({ ref: [el] });
				}
			}
		}

		req.query.SELECT.columns = req.query.SELECT.columns.filter((c) =>
			!([
				"IsActiveEntity",
				"SiblingEntity",
				"DraftAdministrativeData_DraftUUID",
				"DraftAdministrativeData",
				"HasDraftEntity",
				"HasActiveEntity",
				"uuid"
			].includes(c.ref?.[0]))
		);

		if (req.query.SELECT.orderBy) {
			req.query.SELECT.orderBy = req.query.SELECT.orderBy.filter((x) => !([
				"uuid"
			]).includes(x.ref?.[0]));
		}

		return req;
    }

    this.on('READ', 'People', async (req, next) => {
        const sanitisedreq = RequestSanitizer(req); 
        let results = await testservice.run(sanitisedreq);
        console.log(results);
        return next();
    });
});
