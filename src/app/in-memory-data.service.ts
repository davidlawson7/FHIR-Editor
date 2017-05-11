import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    let Patient = [
      {
        resourceType: "Patient",
        id: 1,
        meta: "2017-05-02T20:39:21.159-04:00",
        language: "es-ES",
        text: "<div>HTML element</div>",
        identifier: "HOSP-CD14D9",
        active: "true",
        name: "Todd G. Lerr",
        telecom: "04758284923",
        gender: "other",
        birthDate: "2017-05-02",
        deceasedBoolean: "false",
        deceasedDateTime: "",
        address: "123 North 102nd Street Apt 4d Harrisburg PA USA",
        maritalStatus: "S",
        multipleBirthBoolean: "false",
        multipleBirthInteger: "",
        photo: "http://url.com",
        contact: "somone stuff",
        animal: "human",
        communication: "blah",
        generalPractitioner: "his doc",
        managingOrganization: "nah",
        link: "no"
      },
      {
        resourceType: "Patient",
        id: 2,
        meta: "2017-05-02T20:39:21.159-04:00",
        language: "es-ES",
        text: "<div>HTML element</div>",
        identifier: "HOSP-CD14D9",
        active: "true",
        name: "Rachel Elms",
        telecom: "04758284923",
        gender: "other",
        birthDate: "2017-05-02",
        deceasedBoolean: "false",
        deceasedDateTime: "",
        address: "123 North 102nd Street Apt 4d Harrisburg PA USA",
        maritalStatus: "S",
        multipleBirthBoolean: "false",
        multipleBirthInteger: "",
        photo: "http://url.com",
        contact: "somone stuff",
        animal: "human",
        communication: "blah",
        generalPractitioner: "his doc",
        managingOrganization: "nah",
        link: "no"
      },
      {
        resourceType: "Patient",
        id: 3,
        meta: "2017-05-02T20:39:21.159-04:00",
        language: "es-ES",
        text: "<div>HTML element</div>",
        identifier: "HOSP-CD14D9",
        active: "true",
        name: "Alex May",
        telecom: "04758284923",
        gender: "other",
        birthDate: "2017-05-02",
        deceasedBoolean: "false",
        deceasedDateTime: "",
        address: "123 North 102nd Street Apt 4d Harrisburg PA USA",
        maritalStatus: "S",
        multipleBirthBoolean: "false",
        multipleBirthInteger: "",
        photo: "http://url.com",
        contact: "somone stuff",
        animal: "human",
        communication: "blah",
        generalPractitioner: "his doc",
        managingOrganization: "nah",
        link: "no"
      }
    ];
    return {Patient};
  }

}
