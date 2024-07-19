import MockAdapter from 'axios-mock-adapter';
import { axiosClient } from '../api/client';
import { fetchTodo, markCompleted, postTodo } from '../api/todoService';

describe('todoService', () => {
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

  test('postTodo should make a POST request and return the response', async () => {
    const description = 'Test Todo';
    const isCompleted = false;
    const responseData = { id: 1, description, isCompleted };

    mock.onPost('todoitems').reply(201, responseData);

    const response = await postTodo(description, isCompleted);

    expect(response.status).toBe(201);
    expect(response.data).toEqual(responseData);
  });

  test('fetchTodo should make a GET request and return the response', async () => {
    const responseData = [
      { id: 1, description: 'Test Todo 1', isCompleted: false },
      { id: 2, description: 'Test Todo 2', isCompleted: true },
    ];

    mock.onGet('todoitems').reply(200, responseData);

    const response = await fetchTodo();

    expect(response.status).toBe(200);
    expect(response.data).toEqual(responseData);
  });

  test('markCompleted should make a PUT request and return the response', async () => {
    const item = { id: 1, description: 'Test Todo', isCompleted: false };
    const updatedItem = { ...item, isCompleted: true };
    const responseData = { ...updatedItem };

    mock.onPut(`todoitems/${item.id}`).reply(200, responseData);

    const response = await markCompleted(updatedItem);

    expect(response.status).toBe(200);
    expect(response.data).toEqual(responseData);
  });
});
