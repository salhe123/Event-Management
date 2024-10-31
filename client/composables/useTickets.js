// composables/useTickets.js
import { useQuery, useMutation } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { ref } from 'vue';

// GraphQL queries and mutations
const GET_TICKETS = gql`
  query GetTickets {
    tickets {
      id
      user_id
      event_id
      purchase_date
      quantity
      total_price
    }
  }
`;

const ADD_TICKET = gql`
  mutation AddTicket($user_id: Int!, $event_id: Int!, $purchase_date: date, $quantity: Int!, $total_price: numeric!) {
    insert_tickets_one(object: {
      user_id: $user_id,
      event_id: $event_id,
      purchase_date: $purchase_date,
      quantity: $quantity,
      total_price: $total_price
    }) {
      id
      user_id
      event_id
      purchase_date
      quantity
      total_price
    }
  }
`;

const UPDATE_TICKET = gql`
  mutation UpdateTicket($id: Int!, $quantity: Int, $total_price: numeric) {
    update_tickets_by_pk(pk_columns: { id: $id }, _set: { quantity: $quantity, total_price: $total_price }) {
      id
      quantity
      total_price
    }
  }
`;

const DELETE_TICKET = gql`
  mutation DeleteTicket($id: Int!) {
    delete_tickets_by_pk(id: $id) {
      id
    }
  }
`;

export function useTickets() {
  const tickets = ref([]);
  const { result, loading, error, refetch } = useQuery(GET_TICKETS);

  result.value && (tickets.value = result.value.tickets);

  const addTicket = async (user_id, event_id, purchase_date, quantity, total_price) => {
    const { mutate } = useMutation(ADD_TICKET);
    try {
      const response = await mutate({
        user_id,
        event_id,
        purchase_date,
        quantity,
        total_price,
      });
      tickets.value.push(response.data.insert_tickets_one);
    } catch (err) {
      console.error('Error adding ticket:', err);
    }
  };

  const updateTicket = async (id, quantity, total_price) => {
    const { mutate } = useMutation(UPDATE_TICKET);
    try {
      await mutate({ id, quantity, total_price });
      refetch();
    } catch (err) {
      console.error('Error updating ticket:', err);
    }
  };

  const deleteTicket = async (id) => {
    const { mutate } = useMutation(DELETE_TICKET);
    try {
      await mutate({ id });
      tickets.value = tickets.value.filter((ticket) => ticket.id !== id);
    } catch (err) {
      console.error('Error deleting ticket:', err);
    }
  };

  return {
    tickets,
    loading,
    error,
    addTicket,
    updateTicket,
    deleteTicket,
  };
}
