sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'ns/peopleapp/test/integration/FirstJourney',
		'ns/peopleapp/test/integration/pages/PeopleSetList',
		'ns/peopleapp/test/integration/pages/PeopleSetObjectPage'
    ],
    function(JourneyRunner, opaJourney, PeopleSetList, PeopleSetObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('ns/peopleapp') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onThePeopleSetList: PeopleSetList,
					onThePeopleSetObjectPage: PeopleSetObjectPage
                }
            },
            opaJourney.run
        );
    }
);