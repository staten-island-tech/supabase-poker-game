import { defineStore } from 'pinia'
import { supabase } from '@/plugins/supabase'

export const useRoomStore = defineStore('room', {
  state: () => ({
    currentRoom: null,
    members: [],
  }),
  actions: {
    async createRoom(userId) {
      const code = Math.random().toString(36).substring(2, 8).toUpperCase()
      const { data: room } = await supabase.from('rooms').insert({
        code,
        created_by: userId
      }).select().single()
      this.currentRoom = room
      return code
    },
    async joinRoom(userId, username, money, code) {
      const { data: room } = await supabase.from('rooms').select('*').eq('code', code).single()
      this.currentRoom = room
      await supabase.from('room_members').insert({
        room_id: room.id,
        user_id: userId,
        username,
        money
      })
    },
    async loadMembers(roomId) {
      const { data } = await supabase.from('room_members').select('*').eq('room_id', roomId)
      this.members = data
    }
  }
})
