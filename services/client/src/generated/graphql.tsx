import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;

export const AddLitDocument = gql`
    mutation AddLit($content: String!) {
  addLit(content: $content) {
    error {
      message
    }
    success
  }
}
    `;
export type AddLitMutationFn = Apollo.MutationFunction<AddLitMutation, AddLitMutationVariables>;

/**
 * __useAddLitMutation__
 *
 * To run a mutation, you first call `useAddLitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddLitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addLitMutation, { data, loading, error }] = useAddLitMutation({
 *   variables: {
 *      content: // value for 'content'
 *   },
 * });
 */
export function useAddLitMutation(baseOptions?: Apollo.MutationHookOptions<AddLitMutation, AddLitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddLitMutation, AddLitMutationVariables>(AddLitDocument, options);
      }
export type AddLitMutationHookResult = ReturnType<typeof useAddLitMutation>;
export type AddLitMutationResult = Apollo.MutationResult<AddLitMutation>;
export type AddLitMutationOptions = Apollo.BaseMutationOptions<AddLitMutation, AddLitMutationVariables>;
export const FollowDocument = gql`
    mutation Follow($followeeId: String!) {
  follow(followeeId: $followeeId) {
    error {
      message
    }
    success
  }
}
    `;
export type FollowMutationFn = Apollo.MutationFunction<FollowMutation, FollowMutationVariables>;

/**
 * __useFollowMutation__
 *
 * To run a mutation, you first call `useFollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [followMutation, { data, loading, error }] = useFollowMutation({
 *   variables: {
 *      followeeId: // value for 'followeeId'
 *   },
 * });
 */
export function useFollowMutation(baseOptions?: Apollo.MutationHookOptions<FollowMutation, FollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<FollowMutation, FollowMutationVariables>(FollowDocument, options);
      }
export type FollowMutationHookResult = ReturnType<typeof useFollowMutation>;
export type FollowMutationResult = Apollo.MutationResult<FollowMutation>;
export type FollowMutationOptions = Apollo.BaseMutationOptions<FollowMutation, FollowMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    error {
      message
    }
    success
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $username: String!) {
  register(email: $email, password: $password, username: $username) {
    error {
      message
    }
    success
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RemoveLitDocument = gql`
    mutation RemoveLit($id: Int!) {
  removeLit(id: $id) {
    error {
      message
    }
    success
  }
}
    `;
export type RemoveLitMutationFn = Apollo.MutationFunction<RemoveLitMutation, RemoveLitMutationVariables>;

/**
 * __useRemoveLitMutation__
 *
 * To run a mutation, you first call `useRemoveLitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveLitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeLitMutation, { data, loading, error }] = useRemoveLitMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveLitMutation(baseOptions?: Apollo.MutationHookOptions<RemoveLitMutation, RemoveLitMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveLitMutation, RemoveLitMutationVariables>(RemoveLitDocument, options);
      }
export type RemoveLitMutationHookResult = ReturnType<typeof useRemoveLitMutation>;
export type RemoveLitMutationResult = Apollo.MutationResult<RemoveLitMutation>;
export type RemoveLitMutationOptions = Apollo.BaseMutationOptions<RemoveLitMutation, RemoveLitMutationVariables>;
export const UnfollowDocument = gql`
    mutation Unfollow($followeeId: String!) {
  unfollow(followeeId: $followeeId) {
    error {
      message
    }
    success
  }
}
    `;
export type UnfollowMutationFn = Apollo.MutationFunction<UnfollowMutation, UnfollowMutationVariables>;

/**
 * __useUnfollowMutation__
 *
 * To run a mutation, you first call `useUnfollowMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnfollowMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unfollowMutation, { data, loading, error }] = useUnfollowMutation({
 *   variables: {
 *      followeeId: // value for 'followeeId'
 *   },
 * });
 */
export function useUnfollowMutation(baseOptions?: Apollo.MutationHookOptions<UnfollowMutation, UnfollowMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnfollowMutation, UnfollowMutationVariables>(UnfollowDocument, options);
      }
export type UnfollowMutationHookResult = ReturnType<typeof useUnfollowMutation>;
export type UnfollowMutationResult = Apollo.MutationResult<UnfollowMutation>;
export type UnfollowMutationOptions = Apollo.BaseMutationOptions<UnfollowMutation, UnfollowMutationVariables>;
export const FeedDocument = gql`
    query Feed($offset: Int!, $take: Int!) {
  feed(offset: $offset, take: $take) {
    content
    createdAt
    updatedAt
    user_id
    username
  }
}
    `;

/**
 * __useFeedQuery__
 *
 * To run a query within a React component, call `useFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      take: // value for 'take'
 *   },
 * });
 */
export function useFeedQuery(baseOptions: Apollo.QueryHookOptions<FeedQuery, FeedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options);
      }
export function useFeedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedQuery, FeedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeedQuery, FeedQueryVariables>(FeedDocument, options);
        }
export type FeedQueryHookResult = ReturnType<typeof useFeedQuery>;
export type FeedLazyQueryHookResult = ReturnType<typeof useFeedLazyQuery>;
export type FeedQueryResult = Apollo.QueryResult<FeedQuery, FeedQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    createdAt
    password
    updatedAt
    username
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ProfileDocument = gql`
    query Profile($userid: String!) {
  profile(userid: $userid) {
    error {
      message
    }
    profile {
      avatar
      content
      lits {
        content
        createdAt
        updatedAt
      }
      username
    }
  }
}
    `;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *      userid: // value for 'userid'
 *   },
 * });
 */
export function useProfileQuery(baseOptions: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddLitResponse = {
  __typename?: 'AddLitResponse';
  error?: Maybe<LitError>;
  success: Scalars['Boolean'];
};

export type Feed = {
  __typename?: 'Feed';
  content: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  user_id: Scalars['Int'];
  username: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  message?: Maybe<Scalars['String']>;
};

export type FollowError = {
  __typename?: 'FollowError';
  message: Scalars['String'];
};

export type FollowResponse = {
  __typename?: 'FollowResponse';
  error?: Maybe<FollowError>;
  success: Scalars['Boolean'];
};

export type Lit = {
  __typename?: 'Lit';
  content: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type LitError = {
  __typename?: 'LitError';
  message?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addLit: AddLitResponse;
  follow: FollowResponse;
  login?: Maybe<SuccessErrorResponse>;
  logout?: Maybe<Scalars['Boolean']>;
  refreshToken?: Maybe<Scalars['Boolean']>;
  register?: Maybe<SuccessErrorResponse>;
  removeLit: RemoveLitResponse;
  unfollow: FollowResponse;
};


export type MutationAddLitArgs = {
  content: Scalars['String'];
};


export type MutationFollowArgs = {
  followeeId: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRemoveLitArgs = {
  id: Scalars['Int'];
};


export type MutationUnfollowArgs = {
  followeeId: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  avatar: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  lits?: Maybe<Array<Maybe<Lit>>>;
  username: Scalars['String'];
};

export type ProfileError = {
  __typename?: 'ProfileError';
  message: Scalars['String'];
};

export type ProfileResponse = {
  __typename?: 'ProfileResponse';
  error?: Maybe<ProfileError>;
  profile?: Maybe<Profile>;
};

export type Query = {
  __typename?: 'Query';
  feed?: Maybe<Array<Maybe<Feed>>>;
  me?: Maybe<User>;
  profile?: Maybe<ProfileResponse>;
};


export type QueryFeedArgs = {
  offset: Scalars['Int'];
  take: Scalars['Int'];
};


export type QueryProfileArgs = {
  userid: Scalars['String'];
};

export type RemoveLitResponse = {
  __typename?: 'RemoveLitResponse';
  error?: Maybe<LitError>;
  success: Scalars['Boolean'];
};

export type SuccessErrorResponse = {
  __typename?: 'SuccessErrorResponse';
  error?: Maybe<FieldError>;
  success?: Maybe<Scalars['Boolean']>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  password?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type AddLitMutationVariables = Exact<{
  content: Scalars['String'];
}>;


export type AddLitMutation = { __typename?: 'Mutation', addLit: { __typename?: 'AddLitResponse', success: boolean, error?: { __typename?: 'LitError', message?: string | null } | null } };

export type FollowMutationVariables = Exact<{
  followeeId: Scalars['String'];
}>;


export type FollowMutation = { __typename?: 'Mutation', follow: { __typename?: 'FollowResponse', success: boolean, error?: { __typename?: 'FollowError', message: string } | null } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'SuccessErrorResponse', success?: boolean | null, error?: { __typename?: 'FieldError', message?: string | null } | null } | null };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout?: boolean | null };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register?: { __typename?: 'SuccessErrorResponse', success?: boolean | null, error?: { __typename?: 'FieldError', message?: string | null } | null } | null };

export type RemoveLitMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type RemoveLitMutation = { __typename?: 'Mutation', removeLit: { __typename?: 'RemoveLitResponse', success: boolean, error?: { __typename?: 'LitError', message?: string | null } | null } };

export type UnfollowMutationVariables = Exact<{
  followeeId: Scalars['String'];
}>;


export type UnfollowMutation = { __typename?: 'Mutation', unfollow: { __typename?: 'FollowResponse', success: boolean, error?: { __typename?: 'FollowError', message: string } | null } };

export type FeedQueryVariables = Exact<{
  offset: Scalars['Int'];
  take: Scalars['Int'];
}>;


export type FeedQuery = { __typename?: 'Query', feed?: Array<{ __typename?: 'Feed', content: string, createdAt: string, updatedAt?: string | null, user_id: number, username: string } | null> | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id?: number | null, email?: string | null, createdAt?: string | null, password?: string | null, updatedAt?: string | null, username?: string | null } | null };

export type ProfileQueryVariables = Exact<{
  userid: Scalars['String'];
}>;


export type ProfileQuery = { __typename?: 'Query', profile?: { __typename?: 'ProfileResponse', error?: { __typename?: 'ProfileError', message: string } | null, profile?: { __typename?: 'Profile', avatar: string, content?: string | null, username: string, lits?: Array<{ __typename?: 'Lit', content: string, createdAt: string, updatedAt: string } | null> | null } | null } | null };
