import { MenuItem } from './restaurant.models';

export const MENU_CATEGORIES = ['All', 'Breakfast', 'Mains', 'Sides', 'Drinks', 'Desserts'];

export const RESTAURANT_MENU: MenuItem[] = [
  { id: 'avocado-toast', name: 'Avocado toast', description: 'Sourdough, whipped feta, chilli oil', category: 'Breakfast', price: 12.5, emoji: '🥑', badge: 'Popular' },
  { id: 'buttermilk-pancakes', name: 'Buttermilk pancakes', description: 'Blueberries, maple butter, toasted pecans', category: 'Breakfast', price: 14, emoji: '🥞' },
  { id: 'eggs-benedict', name: 'Garden eggs benedict', description: 'Poached eggs, greens, lemon hollandaise', category: 'Breakfast', price: 16, emoji: '🍳', badge: 'House favorite' },
  { id: 'crispy-chicken', name: 'Crispy chicken sandwich', description: 'Pickles, slaw, house-made brioche', category: 'Mains', price: 18, emoji: '🍔', badge: 'Popular' },
  { id: 'salmon-bowl', name: 'Citrus salmon bowl', description: 'Market greens, brown rice, sesame dressing', category: 'Mains', price: 21, emoji: '🍣' },
  { id: 'mushroom-pasta', name: 'Wild mushroom pasta', description: 'Parmesan cream, herbs, cracked pepper', category: 'Mains', price: 19.5, emoji: '🍝' },
  { id: 'truffle-fries', name: 'Truffle parmesan fries', description: 'Hand-cut potatoes, herbs, aioli', category: 'Sides', price: 8, emoji: '🍟' },
  { id: 'market-salad', name: 'Little market salad', description: 'Seasonal leaves, cucumber, green goddess', category: 'Sides', price: 9, emoji: '🥗' },
  { id: 'iced-matcha', name: 'Iced vanilla matcha', description: 'Ceremonial matcha, oat milk, vanilla', category: 'Drinks', price: 6.5, emoji: '🍵' },
  { id: 'house-lemonade', name: 'House lemonade', description: 'Fresh lemon, mint, a little sparkle', category: 'Drinks', price: 5, emoji: '🍋' },
  { id: 'chocolate-tart', name: 'Dark chocolate tart', description: 'Sea salt, vanilla bean cream', category: 'Desserts', price: 9, emoji: '🍫', badge: 'Sweet finish' },
  { id: 'berry-cheesecake', name: 'Berry cheesecake', description: 'Baked vanilla cheesecake, berry compote', category: 'Desserts', price: 9.5, emoji: '🍰' },
];
