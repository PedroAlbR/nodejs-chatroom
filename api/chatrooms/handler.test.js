'use strict';

const CHATROOM = require('./model'),
  lib = require('./handler');

describe('chatrooms', () => {
  describe('handler', () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });

    describe('getChatrooms', () => {
      it('Should return all chatrooms', () => {
        const mockData = [{ name: 'Chatroom 1', id: 1 }],
          jsonFn = jest.fn((v) => Promise.resolve(v)),
          res = { json: jsonFn };

        CHATROOM.getAll = jest.fn().mockResolvedValue(mockData);

        return lib.getChatrooms({}, res).then(() => {
          expect(CHATROOM.getAll).toBeCalledWith();
          expect(res.json).toBeCalledWith(mockData);
        });
      });

      it('Should send a 400 if there are any errors', () => {
        const mockData = { message: 'Some error', status: 400 },
          jsonFn = jest.fn((v) => Promise.resolve(v)),
          res = { status: jest.fn().mockReturnThis(), json: jsonFn };

        CHATROOM.getAll = jest.fn().mockRejectedValue(mockData);

        return lib.getChatrooms({}, res).then(() => {
          expect(CHATROOM.getAll).toBeCalledWith();
          expect(res.status).toBeCalledWith(400);
          expect(res.json).toBeCalledWith(mockData);
        });
      });
    });

    describe('getChatroom', () => {
      it('Should return specified chatroom', () => {
        const mockData = { name: 'Chatroom 1', id: 1 },
          jsonFn = jest.fn((v) => Promise.resolve(v)),
          req = { params: { id: 1 } },
          res = { status: jest.fn().mockReturnThis(), json: jsonFn };

        CHATROOM.get = jest.fn().mockResolvedValue(mockData);

        return lib.getChatroom(req, res).then(() => {
          expect(CHATROOM.get).toBeCalledWith(1);
          expect(res.json).toBeCalledWith(mockData);
        });
      });

      it('Should send a 404 if there are any errors', () => {
        const mockData = { message: 'Some error', status: 404 },
          jsonFn = jest.fn((v) => Promise.resolve(v)),
          req = { params: { id: 1 } },
          res = { status: jest.fn().mockReturnThis(), json: jsonFn };

        CHATROOM.get = jest.fn().mockRejectedValue(mockData);

        return lib.getChatroom(req, res).then(() => {
          expect(CHATROOM.get).toBeCalledWith(1);
          expect(res.status).toBeCalledWith(404);
          expect(res.json).toBeCalledWith(mockData);
        });
      });
    });

    describe('postChatroom', () => {
      it('Should send a 422 if the chatroom is not valid', () => {
        const mockData = { message: 'Missing chatroom name', status: 422 },
          jsonFn = jest.fn((v) => Promise.resolve(v)),
          req = { body: {} },
          res = { status: jest.fn().mockReturnThis(), json: jsonFn };

        CHATROOM.put = jest.fn();

        return lib.postChatroom(req, res).then(() => {
          expect(CHATROOM.put).not.toBeCalled();
          expect(res.status).toBeCalledWith(422);
          expect(res.json).toBeCalledWith(mockData);
        });
      });

      it('Should return the created chatroom', () => {});
      it('Should send a 400 if there is any errors', () => {
        const mockData = { message: 'Some error', status: 409 },
          jsonFn = jest.fn((v) => Promise.resolve(v)),
          req = { body: { name: 'Chatroom 1' } },
          res = { status: jest.fn().mockReturnThis(), json: jsonFn };

        CHATROOM.put = jest.fn().mockRejectedValue(mockData);

        return lib.postChatroom(req, res).then(() => {
          expect(CHATROOM.put).toBeCalledWith(req.body.name);
          expect(res.status).toBeCalledWith(409);
          expect(res.json).toBeCalledWith(mockData);
        });
      });
    });
  });
});
