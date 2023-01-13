import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;

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
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Feed = {
  __typename?: 'Feed';
  content: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  userId: Scalars['Int'];
  username: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  message?: Maybe<Scalars['String']>;
};

export type Lit = {
  __typename?: 'Lit';
  content: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addLit?: Maybe<Scalars['Boolean']>;
  login?: Maybe<SuccessErrorResponse>;
  logout?: Maybe<Scalars['Boolean']>;
  refreshToken?: Maybe<Scalars['Boolean']>;
  register?: Maybe<SuccessErrorResponse>;
};


export type MutationAddLitArgs = {
  content: Scalars['String'];
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


export type QueryProfileArgs = {
  userid: Scalars['String'];
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

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'SuccessErrorResponse', success?: boolean | null, error?: { __typename?: 'FieldError', message?: string | null } | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id?: number | null, email?: string | null, createdAt?: string | null, password?: string | null, updatedAt?: string | null, username?: string | null } | null };
