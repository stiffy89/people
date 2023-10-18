using {sap} from '@sap/cds/common';
using {z_crud_tst_srv as external} from '../srv/external/z_crud_tst_srv.csn';

namespace contactbook;

entity Contacts {
    key ContactGuid: UUID;
        FirstName: String(40);
        LastName: String(40);
        Sex: String (1);
        PhoneNumber: String(30);
        EmailAddress: String(255);
}