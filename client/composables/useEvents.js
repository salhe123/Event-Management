import { useMutation, useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

// GraphQL queries and mutations
const GET_ALL_EVENTS = gql`
  query GetAllEvents {
    events {
      id
      title
      venue
      address
      price
      event_date
      created_at
      updated_at
      created_by
    }
  }
`;

const GET_USER_EVENTS = gql`
  query GetUserEvents($userId: uuid!) {
    events(where: { user_id: { _eq: $userId } }) {
      id
      title
      location
      venue
      address
      price
      event_date
      user_id
    }
  }
`;

const GET_EVENT_BY_ID = gql`
  query GetEventById($eventId: uuid!) {
    events(where: { id: { _eq: $eventId } }) {
      id
      featured_image
      title
      location
      venue
      address
      price
      event_date
      created_at
      updated_at
      created_by
    }
  }
`;

const GET_EVENTS_WITH_FOLLOWER_COUNT = gql`
  query GetEventsWithFollowerCount {
    events {
      id
      title
      follows_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;

const GET_EVENT_FOLLOWERS = gql`
  query GetEventFollowers($eventId: uuid!) {
    follows(where: { event_id: { _eq: $eventId } }) {
      id
      user_id
      event_id
      user {
        id
        username
      }
    }
  }
`;

const GET_EVENTS_BY_DATE = gql`
  query GetEventsByDate($date: date!) {
    events(where: { event_date: { _eq: $date } }) {
      id
      title
      location
      venue
      address
      price
      event_date
    }
  }
`;

const ADD_EVENT = gql`
  mutation AddEvent($title: String!, $location: String!, $venue: String!, $address: String!, $price: Float!, $event_date: date!, $created_by: String!) {
    insert_events(objects: { title: $title, location: $location, venue: $venue, address: $address, price: $price, event_date: $event_date, created_by: $created_by }) {
      returning {
        id
        title
        created_at
      }
    }
  }
`;

const UPDATE_EVENT = gql`
  mutation UpdateEvent($eventId: uuid!, $title: String, $location: String, $venue: String, $address: String, $price: Float, $event_date: date) {
    update_events(where: { id: { _eq: $eventId } }, _set: { title: $title, location: $location, venue: $venue, address: $address, price: $price, event_date: $event_date }) {
      returning {
        id
        title
        updated_at
      }
    }
  }
`;

const DELETE_EVENT = gql`
  mutation DeleteEvent($eventId: uuid!) {
    delete_events(where: { id: { _eq: $eventId } }) {
      affected_rows
    }
  }
`;

const FOLLOW_EVENT = gql`
  mutation FollowEvent($userId: uuid!, $eventId: uuid!) {
    insert_follows(objects: { user_id: $userId, event_id: $eventId }) {
      returning {
        id
        user_id
        event_id
      }
    }
  }
`;

const UNFOLLOW_EVENT = gql`
  mutation UnfollowEvent($userId: uuid!, $eventId: uuid!) {
    delete_follows(where: { user_id: { _eq: $userId }, event_id: { _eq: $eventId } }) {
      affected_rows
    }
  }
`;

// Custom hook
export const useEvents = () => {
  const { loading: loadingEventUserId, error: errorEventUserId, data: eventsDataUserId } = useQuery(GET_USER_EVENTS);
  const { loading: loadingEvents, error: errorEvents, data: eventsData } = useQuery(GET_ALL_EVENTS);
  const { loading: loadingEventById, error: errorEventById, data: eventsDataById } = useQuery(GET_EVENT_BY_ID);
  const { data: eventsWithFollowerCount, loading: loadingFollowerCount } = useQuery(GET_EVENTS_WITH_FOLLOWER_COUNT);
  
  const [addEvent] = useMutation(ADD_EVENT);
  const [updateEvent] = useMutation(UPDATE_EVENT);
  const [deleteEvent] = useMutation(DELETE_EVENT);
  const [followEvent] = useMutation(FOLLOW_EVENT);
  const [unfollowEvent] = useMutation(UNFOLLOW_EVENT);

  const createEvent = async (eventDetails) => {
    try {
      const { data } = await addEvent({ variables: eventDetails });
      return data;
    } catch (err) {
      console.error("Error adding event:", err);
      throw err;
    }
  };

  const editEvent = async (eventId, eventDetails) => {
    try {
      const { data } = await updateEvent({ variables: { eventId, ...eventDetails } });
      return data;
    } catch (err) {
      console.error("Error updating event:", err);
      throw err;
    }
  };

  const removeEvent = async (eventId) => {
    try {
      const { data } = await deleteEvent({ variables: { eventId } });
      return data;
    } catch (err) {
      console.error("Error deleting event:", err);
      throw err;
    }
  };

  const followAnEvent = async (userId, eventId) => {
    try {
      const { data } = await followEvent({ variables: { userId, eventId } });
      return data;
    } catch (err) {
      console.error("Error following event:", err);
      throw err;
    }
  };

  const unfollowAnEvent = async (userId, eventId) => {
    try {
      const { data } = await unfollowEvent({ variables: { userId, eventId } });
      return data;
    } catch (err) {
      console.error("Error unfollowing event:", err);
      throw err;
    }
  };

  return {
    eventsDataUserId,
    errorEventUserId,
    loadingEventUserId,
    eventsDataById,
    errorEventById,
    loadingEventById,
    loadingEvents,
    errorEvents,
    eventsData,
    loadingFollowerCount,
    eventsWithFollowerCount,
    createEvent,
    editEvent,
    removeEvent,
    followAnEvent,
    unfollowAnEvent,
  };
};
