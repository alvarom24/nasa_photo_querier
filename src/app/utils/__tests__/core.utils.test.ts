import { buildUrlParams, stripNullAndUndefinedProperties } from '../core.utils';

describe('core.utils.tests', () => {
  it('should return object without empty or null properties stripNullAndUndefinedProperties', () => {
    const strippedObject = stripNullAndUndefinedProperties({
      name: '',
      age: 0,
      height: undefined,
      weight: null,
    });

    expect(strippedObject).toEqual({ age: 0 });
  });

  it('should return query parameters for querying NASAs API buildUrlParams with all parameters buildUrlParams', () => {
    const url = buildUrlParams({
      rover: 'curiosity',
      camera: 'HZL',
      sol: '100',
      earth_date: '',
      page: '1',
    });

    expect(url).toEqual('/curiosity/photos?camera=HZL&sol=100&page=1');
  });

  it('should return query parameters for querying NASAs API buildUrlParams for required  parameters buildUrlParams', () => {
    const url = buildUrlParams({
      rover: 'curiosity',
      camera: '',
      sol: '100',
      earth_date: '',
      page: '1',
    });

    expect(url).toEqual('/curiosity/photos?sol=100&page=1');
  });
});
