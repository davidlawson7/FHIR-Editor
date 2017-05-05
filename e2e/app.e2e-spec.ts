import { FhirEditorPage } from './app.po';

describe('fhir-editor App', () => {
  let page: FhirEditorPage;

  beforeEach(() => {
    page = new FhirEditorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
