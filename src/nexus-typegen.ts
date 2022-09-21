/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./context"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  changePasswordInput: { // input type
    currentPassword: string; // String!
    newPassword: string; // String!
  }
  createUserInputType: { // input type
    email: string; // String!
    firstName: string; // String!
    lastName: string; // String!
    password: string; // String!
  }
  loginUserInputType: { // input type
    email: string; // String!
    password: string; // String!
  }
  updateCompanyInputType: { // input type
    name: string; // String!
  }
  updateUserInputType: { // input type
    firstName: string; // String!
    lastName: string; // String!
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Company: { // root type
    id: string; // String!
    name: string; // String!
  }
  Employee: { // root type
    email: string; // String!
    firstName: string; // String!
    id: string; // String!
    lastName: string; // String!
  }
  Mutation: {};
  Project: { // root type
    id: string; // String!
    name: string; // String!
  }
  Query: {};
  Task: { // root type
    description: string; // String!
    id: string; // String!
    name: string; // String!
  }
  Team: { // root type
    id: string; // String!
    name: string; // String!
  }
  User: { // root type
    email: string; // String!
    firstName: string; // String!
    id: string; // String!
    lastName: string; // String!
    password: string; // String!
  }
  accessToken: { // root type
    accessToken: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  Company: { // field return type
    employees: Array<NexusGenRootTypes['Employee'] | null>; // [Employee]!
    id: string; // String!
    name: string; // String!
    projects: Array<NexusGenRootTypes['Project'] | null>; // [Project]!
    teams: Array<NexusGenRootTypes['Team'] | null>; // [Team]!
  }
  Employee: { // field return type
    email: string; // String!
    firstName: string; // String!
    id: string; // String!
    lastName: string; // String!
  }
  Mutation: { // field return type
    changePassword: boolean; // Boolean!
    createUser: NexusGenRootTypes['User']; // User!
    signInUser: NexusGenRootTypes['accessToken']; // accessToken!
    updateCompany: NexusGenRootTypes['Company']; // Company!
    updateUser: NexusGenRootTypes['User']; // User!
  }
  Project: { // field return type
    id: string; // String!
    name: string; // String!
    tasks: Array<NexusGenRootTypes['Task'] | null>; // [Task]!
  }
  Query: { // field return type
    me: NexusGenRootTypes['User'] | null; // User
    myCompany: NexusGenRootTypes['Company']; // Company!
  }
  Task: { // field return type
    description: string; // String!
    id: string; // String!
    name: string; // String!
  }
  Team: { // field return type
    id: string; // String!
    name: string; // String!
  }
  User: { // field return type
    email: string; // String!
    firstName: string; // String!
    id: string; // String!
    lastName: string; // String!
    password: string; // String!
  }
  accessToken: { // field return type
    accessToken: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  Company: { // field return type name
    employees: 'Employee'
    id: 'String'
    name: 'String'
    projects: 'Project'
    teams: 'Team'
  }
  Employee: { // field return type name
    email: 'String'
    firstName: 'String'
    id: 'String'
    lastName: 'String'
  }
  Mutation: { // field return type name
    changePassword: 'Boolean'
    createUser: 'User'
    signInUser: 'accessToken'
    updateCompany: 'Company'
    updateUser: 'User'
  }
  Project: { // field return type name
    id: 'String'
    name: 'String'
    tasks: 'Task'
  }
  Query: { // field return type name
    me: 'User'
    myCompany: 'Company'
  }
  Task: { // field return type name
    description: 'String'
    id: 'String'
    name: 'String'
  }
  Team: { // field return type name
    id: 'String'
    name: 'String'
  }
  User: { // field return type name
    email: 'String'
    firstName: 'String'
    id: 'String'
    lastName: 'String'
    password: 'String'
  }
  accessToken: { // field return type name
    accessToken: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    changePassword: { // args
      data: NexusGenInputs['changePasswordInput']; // changePasswordInput!
    }
    createUser: { // args
      data: NexusGenInputs['createUserInputType']; // createUserInputType!
    }
    signInUser: { // args
      data: NexusGenInputs['loginUserInputType']; // loginUserInputType!
    }
    updateCompany: { // args
      data: NexusGenInputs['updateCompanyInputType']; // updateCompanyInputType!
    }
    updateUser: { // args
      data: NexusGenInputs['updateUserInputType']; // updateUserInputType!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}