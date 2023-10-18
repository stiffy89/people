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
annotate service.PeopleSet with @(
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            Label : 'Personal Information',
            ID : 'PersonalInformation',
            Target : '@UI.FieldGroup#PersonalInformation',
        },
    ],
    UI.FieldGroup #PersonalInformation : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Value : StartDate,
                Label : 'Start Date',
            },{
                $Type : 'UI.DataField',
                Value : EndDate,
                Label : 'End Date',
            },{
                $Type : 'UI.DataField',
                Value : HeightCm,
                Label : 'Height',
            },],
    }
);
annotate service.PeopleSet with @(
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : FullName,
        },
        TypeName : '',
        TypeNamePlural : '',
        Description : {
            $Type : 'UI.DataField',
            Value : PersonId,
        },
    }
);
annotate service.PeopleSet with {
    StartDate @Common.Text : {
            $value : StartDateDisp,
            ![@UI.TextArrangement] : #TextOnly,
        }
};
annotate service.PeopleSet with {
    EndDate @Common.Text : {
            $value : EndDateDisp,
            ![@UI.TextArrangement] : #TextOnly,
        }
};
