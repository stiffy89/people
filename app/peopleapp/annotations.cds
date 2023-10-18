using peopleservice as service from '../../srv/people-service';

annotate service.PeopleSet with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Value : LastName,
            Label : 'LastName',
        },
        {
            $Type : 'UI.DataField',
            Value : FirstName,
            Label : 'FirstName',
        },
    ]
);
