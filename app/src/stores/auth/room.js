import { defineStore } from 'pinia'
import { supabase } from '@/plugins/supabase'

export const useRoomStore = defineStore('room', {
  state: () => ({
    currentRoom: null,
    members: [],
  }),
  actions: {
    async createRoom(userId, roomName, code) {
      console.log('Creating room with code:', code)

      const { data: room, error } = await supabase
        .from('rooms')
        .insert({
          code,
          host_id: userId,
          created_at: new Date(),
        })
        .select()
        .single()

      if (error) {
        console.error('Error creating room:', error)
        throw new Error('Failed to create room')
      }

      this.currentRoom = room
      return room
    },
    async joinRoom(userId, username, money, code) {
      const { data: room, error } = await supabase
        .from('rooms')
        .select('*')
        .eq('code', code)
        .single()

      if (error) {
        console.error('Error joining room:', error)
        throw new Error('Room not found')
      }

      this.currentRoom = room

      await supabase.from('room_members').insert({
        room_id: room.id,
        user_id: userId,
        username,
        money,
      })
    },
    async loadMembers(roomId) {
      const { data, error } = await supabase.from('room_members').select('*').eq('room_id', roomId)

      if (error) {
        console.error('Error loading members:', error)
      }

      this.members = data
    },
  },
})
