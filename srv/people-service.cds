using {z_crud_tst_srv as external} from './external/z_crud_tst_srv.csn';

service peopleservice {

    entity PeopleSet {
        key PersonId: String(3);
            FirstName: String(40);
            LastName: String(40);
            StartDate: DateTime;
            EndDate: DateTime;
            HeightCm: Integer;
            ImageBase64: String(1024);
    }

    annotate PeopleSet with @odata.draft.enabled;
}