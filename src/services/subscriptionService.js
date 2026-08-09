import { initialSubscriptions } from '../data/mockSubscriptions';

const STORAGE_KEY = 'cosmatic_admin_subscriptions';

const getStoredSubscriptions = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialSubscriptions));
    return initialSubscriptions;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return initialSubscriptions;
  }
};

const saveStoredSubscriptions = (subscriptions) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(subscriptions));
};

export const subscriptionService = {
  async getSubscriptions() {
    await new Promise(resolve => setTimeout(resolve, 150));
    return getStoredSubscriptions();
  },

  async createSubscription(data) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Strict Validation: Discount Cap max 10%
    const discount = Number(data.discountPercent);
    if (isNaN(discount) || discount < 0 || discount > 10) {
      throw new Error('Discount percentage cannot exceed 10% (Maximum Cap: 10%).');
    }

    const subscriptions = getStoredSubscriptions();
    const newSub = {
      ...data,
      id: `sub-${Date.now()}`,
      discountPercent: discount,
      status: data.status || 'Active'
    };
    const updated = [newSub, ...subscriptions];
    saveStoredSubscriptions(updated);
    return newSub;
  },

  async updateSubscription(id, data) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Strict Validation: Discount Cap max 10%
    if (data.discountPercent !== undefined) {
      const discount = Number(data.discountPercent);
      if (isNaN(discount) || discount < 0 || discount > 10) {
        throw new Error('Discount percentage cannot exceed 10% (Maximum Cap: 10%).');
      }
    }

    const subscriptions = getStoredSubscriptions();
    const index = subscriptions.findIndex(s => s.id === id || String(s.id) === String(id));
    if (index === -1) throw new Error('Subscription plan not found');

    const updatedSub = {
      ...subscriptions[index],
      ...data,
      discountPercent: data.discountPercent !== undefined ? Number(data.discountPercent) : subscriptions[index].discountPercent
    };
    subscriptions[index] = updatedSub;
    saveStoredSubscriptions(subscriptions);
    return updatedSub;
  },

  async deleteSubscription(id) {
    await new Promise(resolve => setTimeout(resolve, 150));
    const subscriptions = getStoredSubscriptions();
    const updated = subscriptions.filter(s => s.id !== id && String(s.id) !== String(id));
    saveStoredSubscriptions(updated);
    return true;
  }
};
