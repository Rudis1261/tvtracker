import { TVTrackerPage } from './app.po';

describe('tvtracker App', () => {
  let page: TVTrackerPage;

  beforeEach(() => {
    page = new TVTrackerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
