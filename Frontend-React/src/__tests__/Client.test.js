import MockAdapter from 'axios-mock-adapter';
import { axiosClient } from '../api/client';
import { baseUrl } from '../api/baseUrl';

describe('axiosClient', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(axiosClient);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  test('should create an axios instance with the correct baseURL and headers', () => {
    expect(axiosClient.defaults.baseURL).toBe(baseUrl);
    expect(axiosClient.defaults.timeout).toBe(5000);
    expect(axiosClient.defaults.headers['Content-Type']).toBe('application/json');
  });

  test('should handle successful GET request', async () => {
    const responseData = { data: 'test data' };
    mock.onGet('/test-endpoint').reply(200, responseData);

    const response = await axiosClient.get('/test-endpoint');

    expect(response.status).toBe(200);
    expect(response.data).toEqual(responseData);
  });

  test('should handle timeout error', async () => {
    mock.onGet('/timeout').timeout();

    try {
      await axiosClient.get('/timeout');
    } catch (error) {
      expect(error.code).toBe('ECONNABORTED');
      expect(error.message).toContain('timeout');
    }
  });

  test('should handle network error', async () => {
    mock.onGet('/network-error').networkError();

    try {
      await axiosClient.get('/network-error');
    } catch (error) {
      expect(error.message).toBe('Network Error');
    }
  });

  test('should handle 500 server error', async () => {
    mock.onGet('/server-error').reply(500);

    try {
      await axiosClient.get('/server-error');
    } catch (error) {
      expect(error.response.status).toBe(500);
    }
  });
});
