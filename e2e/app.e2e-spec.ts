import { DepreciationClientPage } from './app.po';

describe('depreciation-client App', () => {
  let page: DepreciationClientPage;

  beforeEach(() => {
    page = new DepreciationClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
