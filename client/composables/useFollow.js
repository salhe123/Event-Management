import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';

// GraphQL queries and mutations
const GET_FOLLOWERS_BY_EVENT = gql`
  query GetFollowersByEvent($eventId: uuid!) {
    follows(where: { event_id: { _eq: $eventId } }) {
      id
      user_id
      event_id
    }
  }
`;

const GET_FOLLOWER_COUNT_BY_EVENT = gql`
  query GetFollowerCountByEvent($eventId: uuid!) {
    follows_aggregate(where: { event_id: { _eq: $eventId } }) {
      aggregate {
        count
      }
    }
  }
`;

const FOLLOW_EVENT = gql`
  mutation FollowEvent($eventId: uuid!, $userId: uuid!) {
    insert_follows(objects: { event_id: $eventId, user_id: $userId }) {
      returning {
        id
        user_id
        event_id
      }
    }
  }
`;

const UNFOLLOW_EVENT = gql`
  mutation UnfollowEvent($eventId: uuid!, $userId: uuid!) {
    delete_follows(where: { event_id: { _eq: $eventId }, user_id: { _eq: $userId } }) {
      affected_rows
    }
  }
`;

// Composable
export const useFollow = (eventId) => {
  const { loading: loadingFollowers, error: errorFollowers, data: followersData } = useQuery(GET_FOLLOWERS_BY_EVENT, {
    variables: { eventId },
  });

  const { loading: loadingCount, error: errorCount, data: countData } = useQuery(GET_FOLLOWER_COUNT_BY_EVENT, {
    variables: { eventId },
  });

  const [followEvent] = useMutation(FOLLOW_EVENT);
  const [unfollowEvent] = useMutation(UNFOLLOW_EVENT);

  const follow = async (eventId, userId) => {
    try {
      const { data } = await followEvent({ variables: { eventId, userId } });
      return data;
    } catch (err) {
      console.error("Error following event:", err);
      throw err;
    }
  };

  const unfollow = async (eventId, userId) => {
    try {
      const { data } = await unfollowEvent({ variables: { eventId, userId } });
      return data;
    } catch (err) {
      console.error("Error unfollowing event:", err);
      throw err;
    }
  };

  // Combine loading states and errors
  const loading = loadingFollowers || loadingCount;
  const error = errorFollowers || errorCount;

  return {
    loading,
    error,
    followersData,
    followerCount: countData?.follows_aggregate?.aggregate?.count || 0,
    follow,
    unfollow,
  };
};
