import { FilterItem } from './filter-item';

describe('FilterItem', () => {
  let obj: FilterItem;
  beforeEach(() => {
    obj = new FilterItem();
  });
  it('should create an instance', () => {
    expect(new FilterItem()).toBeTruthy();
  });
  it('should test init val for FilterItem class', () => {
    // expect(obj.countryId).toBe('');
    // expect(obj.countryName).toBe('');
    // expect(obj.opened).toBeFalsy();
    // expect(obj.restrictedRegulations).toEqual([]);
  });
});
