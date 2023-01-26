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

export type LitError = {
  __typename?: 'LitError';
  message?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addLit: AddLitResponse;
  removeLit: RemoveLitResponse;
};


export type MutationAddLitArgs = {
  content: Scalars['String'];
};


export type MutationRemoveLitArgs = {
  id: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  feed?: Maybe<Array<Maybe<Feed>>>;
};


export type QueryFeedArgs = {
  offset: Scalars['Int'];
  take: Scalars['Int'];
};

export type RemoveLitResponse = {
  __typename?: 'RemoveLitResponse';
  error?: Maybe<LitError>;
  success: Scalars['Boolean'];
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
  AddLitResponse: ResolverTypeWrapper<AddLitResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Feed: ResolverTypeWrapper<Feed>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  LitError: ResolverTypeWrapper<LitError>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RemoveLitResponse: ResolverTypeWrapper<RemoveLitResponse>;
  String: ResolverTypeWrapper<Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddLitResponse: AddLitResponse;
  Boolean: Scalars['Boolean'];
  Feed: Feed;
  Int: Scalars['Int'];
  LitError: LitError;
  Mutation: {};
  Query: {};
  RemoveLitResponse: RemoveLitResponse;
  String: Scalars['String'];
};

export type AddLitResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['AddLitResponse'] = ResolversParentTypes['AddLitResponse']> = {
  error?: Resolver<Maybe<ResolversTypes['LitError']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FeedResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Feed'] = ResolversParentTypes['Feed']> = {
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LitErrorResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['LitError'] = ResolversParentTypes['LitError']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addLit?: Resolver<ResolversTypes['AddLitResponse'], ParentType, ContextType, RequireFields<MutationAddLitArgs, 'content'>>;
  removeLit?: Resolver<ResolversTypes['RemoveLitResponse'], ParentType, ContextType, RequireFields<MutationRemoveLitArgs, 'id'>>;
};

export type QueryResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  feed?: Resolver<Maybe<Array<Maybe<ResolversTypes['Feed']>>>, ParentType, ContextType, RequireFields<QueryFeedArgs, 'offset' | 'take'>>;
};

export type RemoveLitResponseResolvers<ContextType = IContext, ParentType extends ResolversParentTypes['RemoveLitResponse'] = ResolversParentTypes['RemoveLitResponse']> = {
  error?: Resolver<Maybe<ResolversTypes['LitError']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = IContext> = {
  AddLitResponse?: AddLitResponseResolvers<ContextType>;
  Feed?: FeedResolvers<ContextType>;
  LitError?: LitErrorResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RemoveLitResponse?: RemoveLitResponseResolvers<ContextType>;
};

