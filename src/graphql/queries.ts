/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      imageUri
      year
      personalityType
      hobbies
      modules
      chatRoomUserList {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        imageUri
        year
        personalityType
        hobbies
        modules
        chatRoomUserList {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getChatRoomUser = /* GraphQL */ `
  query GetChatRoomUser($id: ID!) {
    getChatRoomUser(id: $id) {
      id
      userID
      chatRoomID
      user {
        id
        name
        imageUri
        year
        personalityType
        hobbies
        modules
        chatRoomUserList {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        chatRoomUserList {
          nextToken
        }
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listChatRoomUsers = /* GraphQL */ `
  query ListChatRoomUsers(
    $filter: ModelChatRoomUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatRoomUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        chatRoomID
        user {
          id
          name
          imageUri
          year
          personalityType
          hobbies
          modules
          createdAt
          updatedAt
        }
        chatRoom {
          id
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getChatRoom = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
      id
      chatRoomUserList {
        items {
          id
          userID
          chatRoomID
          createdAt
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          id
          userID
          chatRoomID
          createdAt
          body
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listChatRooms = /* GraphQL */ `
  query ListChatRooms(
    $filter: ModelChatRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        chatRoomUserList {
          nextToken
        }
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
      id
      userID
      chatRoomID
      createdAt
      body
      user {
        id
        name
        imageUri
        year
        personalityType
        hobbies
        modules
        chatRoomUserList {
          nextToken
        }
        createdAt
        updatedAt
      }
      chatRoom {
        id
        chatRoomUserList {
          nextToken
        }
        messages {
          nextToken
        }
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        chatRoomID
        createdAt
        body
        user {
          id
          name
          imageUri
          year
          personalityType
          hobbies
          modules
          createdAt
          updatedAt
        }
        chatRoom {
          id
          createdAt
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getReportUser = /* GraphQL */ `
  query GetReportUser($id: ID!) {
    getReportUser(id: $id) {
      id
      nameID
      name
      reason
      createdAt
      updatedAt
    }
  }
`;
export const listReportUsers = /* GraphQL */ `
  query ListReportUsers(
    $filter: ModelReportUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReportUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        nameID
        name
        reason
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const messagesByChatRoomByCreatedAt = /* GraphQL */ `
  query MessagesByChatRoomByCreatedAt(
    $chatRoomID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByChatRoomByCreatedAt(
      chatRoomID: $chatRoomID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        chatRoomID
        createdAt
        body
        user {
          id
          name
          imageUri
          year
          personalityType
          hobbies
          modules
          createdAt
          updatedAt
        }
        chatRoom {
          id
          createdAt
          updatedAt
        }
        updatedAt
      }
      nextToken
    }
  }
`;
