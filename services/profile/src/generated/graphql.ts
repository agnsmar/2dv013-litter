import { GraphQLResolveInfo } from 'graphql';
import { IContext } from '../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
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
  created_at: Scalars['String'];
  updated_at?: Maybe<Scalars['String']>;
};

export type LitsResponse = {
  __typename?: 'LitsResponse';
  data?: Maybe<Array<Maybe<Lit>>>;
  error?: Maybe<FollowError>;
};

export type Mutation = {
  __typename?: 'Mutation';
  follow: FollowResponse;
  unfollow: FollowResponse;
};


export type MutationFollowArgs = {
  followeeId: Scalars['String'];
};


export type MutationUnfollowArgs = {
  followeeId: Scalars['String'];
};

export type Profile = {
  __typename?: 'Profile';
  avatar: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type ProfileError = {
  __typename?: 'ProfileError';
  message: Scalars['String'];
};

export type ProfileResponse = {
  __typename?: 'ProfileResponse';
  data?: Maybe<Profile>;
  error?: Maybe<ProfileError>;
};

export type Query = {
  __typename?: 'Query';
  isFollowing: Scalars['Boolean'];
  lits: LitsResponse;
  profile: ProfileResponse;
};


export type QueryIsFollowingArgs = {
  userid: Scalars['String'];
};


export type QueryLitsArgs = {
  offset: Scalars['Int'];
  take: Scalars['Int'];
  userid: Scalars['String'];
};


export type QueryProfileArgs = {
  userid: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  FollowError: ResolverTypeWrapper<FollowError>;
  FollowResponse: ResolverTypeWrapper<FollowResponse>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Lit: ResolverTypeWrapper<Lit>;
  LitsResponse: ResolverTypeWrapper<LitsResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  Profile: ResolverTypeWrapper<Profile>;
  ProfileError: ResolverTypeWrapper<ProfileError>;
  ProfileResponse: ResolverTypeWrapper<ProfileResponse>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  FollowError: FollowError;
  FollowResponse: FollowResponse;
  Int: Scalars['Int'];
  Lit: Lit;
  LitsResponse: LitsResponse;
  Mutation: {};
  Profile: Profile;
  ProfileError: ProfileError;
  ProfileResponse: ProfileResponse;
  Query: {};
  String: Scalars['String'];
};

export type FollowErrorResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['FollowError'] = ResolversParentTypes['FollowError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FollowResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['FollowResponse'] = ResolversParentTypes['FollowResponse']> = {
  error?: Resolver<Maybe<ResolversTypes['FollowError']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LitResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Lit'] = ResolversParentTypes['Lit']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  created_at?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updated_at?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LitsResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['LitsResponse'] = ResolversParentTypes['LitsResponse']> = {
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['Lit']>>>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['FollowError']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  follow?: Resolver<ResolversTypes['FollowResponse'], ParentType, ContextType, RequireFields<MutationFollowArgs, 'followeeId'>>;
  unfollow?: Resolver<ResolversTypes['FollowResponse'], ParentType, ContextType, RequireFields<MutationUnfollowArgs, 'followeeId'>>;
};

export type ProfileResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']> = {
  avatar?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProfileErrorResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ProfileError'] = ResolversParentTypes['ProfileError']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProfileResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['ProfileResponse'] = ResolversParentTypes['ProfileResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['ProfileError']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  isFollowing?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryIsFollowingArgs, 'userid'>>;
  lits?: Resolver<ResolversTypes['LitsResponse'], ParentType, ContextType, RequireFields<QueryLitsArgs, 'offset' | 'take' | 'userid'>>;
  profile?: Resolver<ResolversTypes['ProfileResponse'], ParentType, ContextType, RequireFields<QueryProfileArgs, 'userid'>>;
};

export type Resolvers<ContextType = IContext> = {
  FollowError?: FollowErrorResolvers<ContextType>;
  FollowResponse?: FollowResponseResolvers<ContextType>;
  Lit?: LitResolvers<ContextType>;
  LitsResponse?: LitsResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  ProfileError?: ProfileErrorResolvers<ContextType>;
  ProfileResponse?: ProfileResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

