import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import { User, Thread, ConnectionRequest } from '@/types/database'

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data as User[]
    }
  })
}

export const useThreads = () => {
  return useQuery({
    queryKey: ['threads'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('threads')
        .select(`
          *,
          author:users(*)
        `)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data as Thread[]
    }
  })
}

export const useConnectionRequests = (userId: string) => {
  return useQuery({
    queryKey: ['connection-requests', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('connection_requests')
        .select(`
          *,
          sender:users!sender_id(*),
          receiver:users!receiver_id(*)
        `)
        .eq('receiver_id', userId)
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data as ConnectionRequest[]
    }
  })
}

export const useCreateThread = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ content, author_id }: { content: string; author_id: string }) => {
      const { data, error } = await supabase
        .from('threads')
        .insert({ content, author_id })
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['threads'] })
    }
  })
}

export const useCreateConnectionRequest = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ 
      sender_id, 
      receiver_id, 
      message 
    }: { 
      sender_id: string; 
      receiver_id: string; 
      message: string 
    }) => {
      const { data, error } = await supabase
        .from('connection_requests')
        .insert({ sender_id, receiver_id, message, status: 'pending' })
        .select()
        .single()
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connection-requests'] })
    }
  })
}