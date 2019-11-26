export interface IRepository{
  id?: string
  name?: string
  nameWithOwner?: string
  description?: string
  createdAt?: Date
  owner?:{
    avatarUrl?: string
    login?: string
    url?: string
  }
  issues?:{
  totalCount?: number
  }
  forks?:{
    totalCount?: number
  }
  defaultBranchRef?:{
    name?: string
  }
}