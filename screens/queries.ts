export const getOtherUsers = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
    chatRoomUserList {
      items {
        chatRoom {
          chatRoomUserList {
            items {
              user {
                id
                name
              }
              chatRoomID
            }
          }
        }
      }
    }
  }
  }
`;


export const getMessagesByChatRoom = /* GraphQL */ `
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
        body
        user {
          id
          name
          createdAt
        }
      }
    }
  }
`;
