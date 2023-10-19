const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {

	const testservice = await cds.connect.to('z_crud_tst_srv');
	const travelexpservice = await cds.connect.to('travel_exp');

	let { PeopleSet } = this.entities;

	let srv = this;
    
	async function readDestination (sUrl) {
		return await testservice.send({
			method: 'GET',
			path: sUrl
		});
	}

	async function updateDestination (sUrl, data) {
		return await testservice.send({
			method: 'PUT',
			path: sUrl,
			data: data
		})
	}

	async function createDestination (data) {
		return await testservice.send({
			method: 'POST',
			path: "/sap/opu/odata/sap/z_crud_tst_srv/People",
			data: data
		})
	}

	function dateConverter (jsonDate, bBack){
		if (!bBack){
			const content = /\d+/.exec(String(jsonDate));
			const timestamp = content ? Number(content[0]) : 0;
			const date = new Date(timestamp);
			return date;
		} else {
			let iTimeStamp = Date.parse(new Date(jsonDate));
			return "\/Date(" + iTimeStamp.toString() + ")\/";
		}
	}

	this.after('EDIT', 'PeopleSet', async(data) => {
		//check to see if we have the existing record in persistence, if not, create it
		const existingRecord = await SELECT.from(PeopleSet).where({PersonId : data.PersonId});

		if (existingRecord.length == 0){
			let aFilteredItems = [
			"IsActiveEntity",
			"SiblingEntity",
			"DraftAdministrativeData_DraftUUID",
			"DraftAdministrativeData",
			"HasDraftEntity",
			"HasActiveEntity",
			"uuid"];
	
			let aKeys = Object.keys(data);
			let oNewObj = {};
			for (var i in aKeys){
				if (!aFilteredItems.includes(aKeys[i])){
					oNewObj[aKeys[i]] = data[aKeys[i]]
				}
			}
	
			await srv.create(PeopleSet).entries(oNewObj);
		}
	});

	this.on('UPDATE', 'PeopleSet', async (req, next) => {
		let data = req.data;
		const startDate = dateConverter(data.StartDate, true);
		const endDate = dateConverter(data.EndDate, true);
		let oNewObj = {
			FirstName: data.FirstName,
			LastName: data.LastName,
			PersonId: data.PersonId,
			HeightCm: data.HeightCm,
			ImageBase64: data.ImageBase64,
			StartDate: startDate,
			EndDate: endDate
		}

		const sUrl = "/sap/opu/odata/sap/z_crud_tst_srv/People('" + data.PersonId + "')"
		const result = await updateDestination(sUrl, oNewObj);
		return next();
	});

	this.after('UPDATE', 'PeopleSet', async(data) => {
		const existingRecord = await SELECT.from(PeopleSet).where({PersonId : data.PersonId});
		if (existingRecord.length > 0){
			await DELETE.from(PeopleSet).where({PersonId : data.PersonId})
		}
	});

	this.on('READ', 'PeopleSet.drafts', async(req, next) => {
		let persisResults = await SELECT.from(PeopleSet);
		let draftResults = await SELECT.from(PeopleSet.drafts);
		let draftAdminResults = await SELECT.from('DRAFT.DraftAdministrativeData');
		return next();
	});

    this.on('READ', PeopleSet, async (req, next) => {

		let employeeResults = await travelexpservice.send({
			method: 'GET',
			path: "/Employees"
		});
		console.log(employeeResults);

		let sBaseUrl = "/People";
		//let sBaseUrl = "/sap/opu/odata/sap/z_crud_tst_srv/People";
		let oQuery = req.query.SELECT;
		if (typeof(oQuery.from.ref[0]) == 'string' && !oQuery.where){
			sBaseUrl += "?$inlinecount=allpages";
		}
		else if (typeof(oQuery.from.ref[0]) == 'object' && !oQuery.where){
			sBaseUrl += ("('" + oQuery.from.ref[0].where[2].val + "')");
		}
		else if (typeof(oQuery.from.ref[0]) == 'string' && oQuery.where) {
			sBaseUrl += ("('" + oQuery.where[2].val + "')");
		}

		let externalRes = await readDestination(sBaseUrl);

		let bIsArray = Array.isArray(externalRes);

		if (bIsArray){
			
			externalRes = externalRes.map((x) => {
				x.FullName = x.FirstName + " " + x.LastName;
				x.StartDate = dateConverter(x.StartDate);
				x.EndDate = dateConverter(x.EndDate);
				x.StartDateDisp = x.StartDate.toISOString().substring(0,10);
				x.EndDateDisp = x.EndDate.toISOString().substring(0, 10);
				return x;
			});

			externalRes.$count = externalRes.length;
		} else {
			externalRes.FullName = externalRes.FirstName + " " + externalRes.LastName;
			externalRes.StartDate = dateConverter(externalRes.StartDate);
			externalRes.EndDate = dateConverter(externalRes.EndDate);
			externalRes.StartDateDisp = externalRes.StartDate.toISOString().substring(0,10);
			externalRes.EndDateDisp = externalRes.EndDate.toISOString().substring(0, 10);
		}

		return externalRes;
    });
});
