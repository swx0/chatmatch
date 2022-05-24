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
            }
          }
        }
      }
    }
  }
  }
`;