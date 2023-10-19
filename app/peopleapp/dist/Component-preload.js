//@ui5-bundle ns/peopleapp/Component-preload.js
jQuery.sap.registerPreloadedModules({
"version":"2.0",
"modules":{
	"ns/peopleapp/Component.js":function(){sap.ui.define(["sap/fe/core/AppComponent"],function(e){"use strict";return e.extend("ns.peopleapp.Component",{metadata:{manifest:"json"}})});
},
	"ns/peopleapp/i18n/i18n.properties":'# This is the resource bundle for ns.peopleapp\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=application for managing people\n\n#YDES: Application description\nappDescription=A Fiori application.',
	"ns/peopleapp/manifest.json":'{"_version":"1.58.0","sap.app":{"id":"ns.peopleapp","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"People App","description":"Application to manage people","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:worklist","version":"1.11.2","toolsId":"a235d8e7-8694-4302-9e07-3e0b1220abaf"},"dataSources":{"mainService":{"uri":"odata/v4/peopleservice/","type":"OData","settings":{"annotations":[],"localUri":"localService/metadata.xml","odataVersion":"4.0"}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.119.1","libs":{"sap.m":{},"sap.ui.core":{},"sap.ushell":{},"sap.fe.templates":{},"sap.f":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"ns.peopleapp.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"synchronizationMode":"None","operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}},"@i18n":{"type":"sap.ui.model.resource.ResourceModel","uri":"i18n/i18n.properties"}},"resources":{"css":[]},"routing":{"routes":[{"pattern":":?query:","name":"PeopleSetList","target":["PeopleSetList"]},{"pattern":"PeopleSet({key}):?query:","name":"PeopleSetObjectPage","target":["PeopleSetList","PeopleSetObjectPage"]}],"targets":{"PeopleSetList":{"type":"Component","id":"PeopleSetList","name":"sap.fe.templates.ListReport","options":{"settings":{"contextPath":"/PeopleSet","variantManagement":"Page","hideFilterBar":true,"navigation":{"PeopleSet":{"detail":{"route":"PeopleSetObjectPage"}}},"initialLoad":"Auto"}},"controlAggregation":"beginColumnPages","contextPattern":""},"PeopleSetObjectPage":{"type":"Component","id":"PeopleSetObjectPage","name":"sap.fe.templates.ObjectPage","options":{"settings":{"editableHeaderContent":false,"contextPath":"/PeopleSet"}},"controlAggregation":"midColumnPages","contextPattern":"/PeopleSet({key})"}},"config":{"flexibleColumnLayout":{"defaultTwoColumnLayoutType":"TwoColumnsMidExpanded","defaultThreeColumnLayoutType":"ThreeColumnsMidExpanded"},"routerClass":"sap.f.routing.Router"}},"extends":{"extensions":{"sap.ui.controllerExtensions":{}}},"rootView":{"viewName":"sap.fe.templates.RootContainer.view.Fcl","type":"XML","async":true,"id":"appRootView"}},"sap.fiori":{"registrationIds":[],"archeType":"transactional"},"sap.cloud":{"public":true,"service":"people.service"}}'
}});
