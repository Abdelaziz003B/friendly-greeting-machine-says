
import { supabase } from '../lib/supabase';
import { Group, GroupMembership } from '../models/group.types';

export const GroupService = {
  async createGroup(groupData: Omit<Group, 'id' | 'createdAt' | 'memberCount'>): Promise<string | null> {
    try {
      // For demo purposes, we'll use localStorage to simulate database
      const groups = JSON.parse(localStorage.getItem('groups') || '[]');
      const newGroup: Group = {
        ...groupData,
        id: crypto.randomUUID(),
        createdAt: new Date(),
        memberCount: 1,
      };
      
      groups.push(newGroup);
      localStorage.setItem('groups', JSON.stringify(groups));
      
      // Auto-join creator to the group
      await this.joinGroup(newGroup.id, groupData.createdBy);
      
      return newGroup.id;
    } catch (error) {
      console.error('Error creating group:', error);
      return null;
    }
  },

  async getGroups(): Promise<Group[]> {
    try {
      const groups = JSON.parse(localStorage.getItem('groups') || '[]');
      return groups;
    } catch (error) {
      console.error('Error fetching groups:', error);
      return [];
    }
  },

  async getGroupById(groupId: string): Promise<Group | null> {
    try {
      const groups = JSON.parse(localStorage.getItem('groups') || '[]');
      return groups.find((group: Group) => group.id === groupId) || null;
    } catch (error) {
      console.error('Error fetching group:', error);
      return null;
    }
  },

  async joinGroup(groupId: string, userId: string): Promise<boolean> {
    try {
      const memberships = JSON.parse(localStorage.getItem('groupMemberships') || '[]');
      const existingMembership = memberships.find(
        (m: GroupMembership) => m.groupId === groupId && m.userId === userId
      );
      
      if (existingMembership) {
        return true; // Already a member
      }
      
      const newMembership: GroupMembership = {
        id: crypto.randomUUID(),
        groupId,
        userId,
        joinedAt: new Date(),
        role: 'member'
      };
      
      memberships.push(newMembership);
      localStorage.setItem('groupMemberships', JSON.stringify(memberships));
      
      // Update member count
      const groups = JSON.parse(localStorage.getItem('groups') || '[]');
      const groupIndex = groups.findIndex((g: Group) => g.id === groupId);
      if (groupIndex !== -1) {
        groups[groupIndex].memberCount += 1;
        localStorage.setItem('groups', JSON.stringify(groups));
      }
      
      return true;
    } catch (error) {
      console.error('Error joining group:', error);
      return false;
    }
  },

  async getUserGroups(userId: string): Promise<Group[]> {
    try {
      const memberships = JSON.parse(localStorage.getItem('groupMemberships') || '[]');
      const userMemberships = memberships.filter((m: GroupMembership) => m.userId === userId);
      const groups = JSON.parse(localStorage.getItem('groups') || '[]');
      
      return groups.filter((group: Group) => 
        userMemberships.some((m: GroupMembership) => m.groupId === group.id)
      );
    } catch (error) {
      console.error('Error fetching user groups:', error);
      return [];
    }
  },

  async isUserMember(groupId: string, userId: string): Promise<boolean> {
    try {
      const memberships = JSON.parse(localStorage.getItem('groupMemberships') || '[]');
      return memberships.some(
        (m: GroupMembership) => m.groupId === groupId && m.userId === userId
      );
    } catch (error) {
      console.error('Error checking membership:', error);
      return false;
    }
  },

  async initializeDefaultGroups(): Promise<void> {
    try {
      const groups = JSON.parse(localStorage.getItem('groups') || '[]');
      const hasTopSale = groups.some((g: Group) => g.name === 'Top Sale');
      
      if (!hasTopSale) {
        await this.createGroup({
          name: 'Top Sale',
          description: 'Best deals and trending items',
          category: 'General',
          isPublic: true,
          createdBy: 'system'
        });
      }
    } catch (error) {
      console.error('Error initializing default groups:', error);
    }
  }
};
