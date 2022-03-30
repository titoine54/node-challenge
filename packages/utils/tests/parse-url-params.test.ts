import { getParams } from '../parse-url-params';

describe('[Packages | Core-util | parse-url-params] getParams ', () => {
  test('to generate the correct parameters when empty', () => {
    const results = getParams(null);
    expect(results).toStrictEqual({});
  });

  test('to generate the correct parameters when page and limit are set', () => {
    const results = getParams({page: 2, limit: 15});
    expect(results).toStrictEqual({skip: 30, take: 15});
  });

  test('to generate the correct parameters when filter is set', () => {
    const results = getParams({filter: '{"test_key": "test_value"}'});
    expect(results).toStrictEqual({skip: 0, take: 100, where: {"test_key": "test_value"}});
  });

  test('to generate the correct parameters when sort is set', () => {
    const results = getParams({sort: '{"test_key": "test_value"}'});
    expect(results).toStrictEqual({skip: 0, take: 100, order: {"test_key": "test_value"}});
  });
});
