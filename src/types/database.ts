export interface User {
  id: string
  name: string
  email: string
  age?: number
  city?: string
  bio?: string
  avatar?: string
  interests?: string[]
  is_verified?: boolean
  created_at: string
  updated_at: string
}

export interface Thread {
  id: string
  author_id: string
  content: string
  created_at: string
  updated_at: string
  author?: User
  interested_count?: number
}

export interface ConnectionRequest {
  id: string
  sender_id: string
  receiver_id: string
  message: string
  status: 'pending' | 'accepted' | 'rejected'
  created_at: string
  sender?: User
  receiver?: User
}

export interface Chat {
  id: string
  user1_id: string
  user2_id: string
  last_message?: string
  last_message_at?: string
  created_at: string
  updated_at: string
}