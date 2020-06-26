import axios from 'axios';

export async function toggleCheck(itemId, curVal) {
  const query = `
    mutation {
      updateListItem(input: {
        idPk: "${itemId}",
        patch: {
          checked: ${!curVal}
        }
      }) {
        clientMutationId
      }
    }
  `;

  await axios.post('/query/graphql', { query });
}

export async function addItem(listId, listOrder) {
  const query = `
    mutation {
      createListItem(input: {listItem: {
        listFk: "${listId}",
        text: "",
        checked: false,
        listOrder: ${listOrder}
      }}) {
        clientMutationId
      }
    }
  `;

  await axios.post('/query/graphql', { query });
}

export async function updateListItem(itemId, text) {
  const query = `
    mutation {
      updateListItem(input: {
        idPk: "${itemId}",
        patch: {
          text: "${text}"
        }
      }) {
        clientMutationId
      }
    }
  `;

  await axios.post('/query/graphql', { query });
}

export async function deleteListItem(itemId) {
  const query = `
    mutation {
      deleteListItem(input: {idPk: "${itemId}"}) {
        clientMutationId
      }
    }
  `;

  await axios.post('/query/graphql', { query });
}
