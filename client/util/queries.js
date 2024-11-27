// import gql from "graphql-tag"



export const REGISTER_USER_MUTATION = gql`
   mutation MyMutation($email: String!, $password: String!, $username: String!) {
    signup(email: $email, password: $password, username: $username) {
      id
    }
  }
`;
export const LOGIN_MUTATION = gql`
  mutation MyMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      token 
    }
  }
`;

export const GET_USER_BY_ID = gql`
query user ($id:Int!) {
  users_by_pk(id: $id) {
    username
    id
  }
  events {
    address
    created_at
    date
    description
    is_free
    location
    price
    title
    venue
    cover_photo
  }
  imagestore {
    event_id
  }
}

`;


export const upload_image_action = gql`
  mutation uploadImages($base64_str: String!) {
    uploadImages(base64_str: $base64_str) {
      url
    }
  }
`;


export const insert_event = gql`
     mutation Event(
    $title: String!,
    $description: String!,
    $venue: String!,
    $address: String!,
    $price: String!,
    $specific_Price : numeric! ,
    $categories: String!,
    $cover_photo: String!,
    $tags: [String!],
    $date: date!
  
  ) {
    insert_events(
      objects: {
        title: $title,
        description: $description,
        venue: $venue,
        address: $address,
        price: $price,
        specific_Price: $specific_Price,
        categories: $categories,
        tags: $tags,
        cover_photo: $cover_photo,
        date : $date
       
      }
    ) {
      returning {
        id
      }
    }
  }
`;


export const insert_image_imageTable = gql`
  mutation insertImage($url: String!, $event_id: Int!) {
    insert_imagestore(objects: { url: $url, event_id: $event_id }) {
      returning {
        url
      }
    }
  }
`;

export const ADD_BOOK_MARK=gql`
mutation Bookmark($user_id: Int!, $event_id: Int!) {
  insert_bookmarks(objects: {user_id:$user_id,event_id:$event_id}){
    returning{
      id
      user_id
      event_id
    }
    
  }
}`;
export const REMOVE_BOOKMARK_MUTATION = gql`
  mutation RemoveBookmark($user_id: Int!, $event_id: Int!) {
    delete_bookmarks(where: {user_id: {_eq: $user_id}, event_id: {_eq: $event_id}}) {
      returning {
        id
      }
    }
  }
`;

export const Update_Event_ById=gql`
mutation EventUpdate(
    $id: Int!,
    $title: String!,
    $description: String!,
    $venue: String!,
    $address: String!,
    $price: String,
    $specificPrice: numeric,
    $categories: String!,
    $cover_photo: String!,
    $tags: [String!],
 
) {
  update_events(
    where: { id: { _eq: $id } }
    _set: {
        title: $title,
        description: $description,
        venue: $venue,
        address: $address,
        price: $price,
        specific_Price: $specificPrice,
        categories: $categories,
        tags: $tags,
        cover_photo: $cover_photo,
    }
  ) {
    returning {
      id
      title
      description
      venue
      address
      price
      tags
      categories
      location
      specific_Price
      created_at
      updated_at
    }
  }
}
`;

export const GET_USER_BY_HIS_ID=gql`
query{
  users{
    username
    events{
      id
      title
      description
      venue
      address
      price
      specific_Price
      tags
      categories
      location
      cover_photo
    }
   
    }
  }`;

export const DELETE_EVENT_BY_ID=gql`
mutation DeleteEvent($id: Int!) {
  delete_events_by_pk(id: $id){
    id
  }
}`;
export const insert_event_mutation = gql`
mutation Event(
  $title: String!,
  $description: String!,
  $venue: String!,
  $address: String!,
  $price: numeric!,
  $categories: String!,
  $cover_photo: String!,
  $tags: [String!],
  $user_id: Int!
  $is_free: Boolean!
) {
  insert_events(
    objects: {
      title: $title,
      description: $description,
      venue: $venue,
      address: $address,
      price: $price,
      categories: $categories,
      cover_photo: $cover_photo,
      tags: $tags,
      user_id: $user_id
      is_free: $is_free
    }
  ) {
    returning {
      id
    }
  }
}
`;

export const GET_ALL_EVENTS=gql`
query getEvent($search:String!,$limit:Int!,$offset:Int!){
  events(where:{_or:[
    {title:{_ilike:$search}},
    {address:{_ilike:$search}},
    {venue:{_ilike:$search}},
     {description:{_ilike:$search}},
     {categories:{_ilike:$search}},
  ]},
    limit:$limit,
    offset:$offset
  )
  {
    id
    title
    description
    address
    venue
    categories
    price
    cover_photo
    date
    tags
  }
  events_aggregate {
    aggregate {
      count
    }
  }
  
  
}
`;

//this is inorder to get all events for anonymous and for succesful login users.
export const GET_ALL_EVENTS_WTHOUT_FILTER=gql`

query{
  events{
    id
    title
    description
    address
    venue
    price
    date
    cover_photo
    categories
    tags
    users{
      id
    }
    
    
  }
}
`;
export const GET_EVENT_BY_CATEGORY=gql`
query getEvent($categories:String!){
  events(where:{categories:{_eq:$categories}}){
    id
    title
    description
    price
    address
    venue
    cover_photo
    categories
    tags
    date
  }
}`;
// get a single event by its id.
export const GET_EVENT_BY_ID=gql`
query getEventById($id:Int!){
  events_by_pk(id:$id){
      id
    title
    description
    address
    venue
    price
    cover_photo
    date
    imagestore{
      id
      url
      event_id
    }
    categories
    date
    tags
    
  }
}`;
//to make the events bookmark.
export const USER_MAKE_BOOK_MARK=gql`
mutation bookMark($event_id: Int!,$isbookMarked:Boolean!) {
  insert_bookmarks_one(object: {event_id:$event_id,isbookMarked:$isbookMarked}){
    id
  }
}

`;

export const GET_BOOK_MARK_BY_USER_ID=gql`
query{
  bookmarks{
    id
    isbookMarked
    event{
       id
      title
      description
      address
      venue
      tags
      categories
      cover_photo
      price
      date
      
    }
  }
}`;
//this is inorder to make search functionality from the backend.
export const SEARCH_TERMS=gql`
   query searchItems($search: String, $categories: String!, $limit: Int) {
  events_aggregate(where: {
    _and: [
      { categories: { _eq: $categories } },
      {
        _or: [
          { title: { _ilike: $search } },
          { description: { _ilike: $search } },
          { address: { _ilike: $search } },
          { venue: { _ilike: $search } }
        ]
      }
    ]
  }) {
    aggregate {
      count
    }
  }
  
  events(where: {
    _and: [
      { categories: { _eq: $categories } },
      {
        _or: [
          { title: { _ilike: $search } },
          { description: { _ilike: $search } },
          { address: { _ilike: $search } },
          { venue: { _ilike: $search } }
        ]
      }
    ]
  }, limit: $limit) {
    id
    title
    categories
    description
    address
    venue
    tags
    date
    price
    cover_photo

  }
}
`;


//this query is inorder to get single bookmarked event by user and eventid.

export const GET_BOOK_MARKED_EVENT=gql`
query getBookmark($event_id:Int!){
  bookmarks(where:{event_id:{_eq:$event_id}}){
    isbookMarked
  }
    
  }
`;

export const GET_BOOK_MARKED_EVENT_USER=gql`
query getBookmark($event_id:Int!,$user_id:Int!){
  bookmarks(where:{event_id:{_eq:$event_id},user_id:{_eq:$user_id}}){
    isbookMarked
  }
    
  }
`;



// this query is inorder to catch ticket.
export const CATCH_TICKET=gql`
mutation insertTicket($event_id:Int!,$quantity:Int!,$amount:numeric,$phonenumber:String,$checkout_url:String,$catchedticket:Boolean!){
  insert_tickets_one(object:{event_id:$event_id,quantity:$quantity,amount:$amount,phonenumber:$phonenumber,checkout_url:$checkout_url,catchedticket:$catchedticket}){
     id
  }
}
`;

// this query is inorder to get single ticket that a user created in a single event.
export const GET_TICKET_USER=gql`
query getTicket($event_id:Int!){
  tickets(where:{event_id:{_eq:$event_id}}){
    id
    catchedticket
    user_id
    quantity
    event{
      title
      date
      
      
    }
  }
  
}
`;

// this is inorder to get tickets that a user created.
export const GET_TICKET_USER_BY_USER_ID=gql`
query{
  tickets{
    id
    quantity
    catchedticket
    event{
      id
      cover_photo
      title
      description
    address
      venue
      categories
      tags
      price
      date
    }
  }
}

`;

export const REMOVE_BOOKMARK_FROM_FAVOURITE=gql`
mutation deleteBookmark($id: Int!) {
  delete_bookmarks_by_pk(id: $id){
    id
  }
}


`;

export const INSERT_TRANSACTION=gql`
mutation insertTransaction($amount: numeric!, $phonenumber: String!, $checkout_url: String, $tx_rf: String, $event_id: Int!) {
  insert_transactions(objects: {amount: $amount, checkout_url: $checkout_url, event_id: $event_id, phonenumber: $phonenumber, tx_rf: $tx_rf}){
    returning{
      id
    }
  }
}
`;
//   action handler for Transaction
export const ACCEPT_TRANSACTION=gql`
mutation acceptTransaction($amount:String!,$phonenumber:String!){
  acceptPayment(amount:$amount,phonenumber:$phonenumber){
    message
    checkoutUrl
    tx_ref
  }
}
`;

export const GET_USER_FOR_UPLOAD_PROFILE=gql`
query{
  users{
    username
    email
  }

    
  
}
`;

export const UPLOAD_PROFILE=gql`
mutation updateProfile($id:Int!,$username:String,$email:String){
  update_users(where:{id:{_eq:$id}},_set:{username:$username,email:$email}){
    returning{
      id
    }
  }
  
}
`

export const TRANZATION_INSERT=gql`
mutation insertTransaction($event_id: Int!, $amount: numeric, $phonenumber: String, $checkout_url: String) {
  insert_transactions(objects: {amount: $amount,event_id:$event_id,phonenumber:$phonenumber,checkout_url:$checkout_url}){
    returning{
      id
    }
  }
}

`;
export const GET_TRANSACTIONS=gql`
query{
  transactions{
    id
    amount
    checkout_url
    phonenumber
    event{
      date
      
    }
    user{
      username
    }
  }
}
`;
//to get trunsaction by using sinle user
export const GET_TRANSACTIONS_BY_USER = gql`
  query GetTransactionsByUser($userId: Int!) {
    transactions(where: { user_id: { _eq: $userId } }) {
      amount
      checkout_url
      created_at
      event_id
      phonenumber
      tx_rf
      id
    }
  }
`;