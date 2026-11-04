import { Injectable } from '@angular/core';
import { addDoc, collection, doc, getDocs, onSnapshot, Unsubscribe, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { NewRestaurantOrder, OrderStatus, RestaurantOrder } from './restaurant.models';

const ordersCollection = collection(db, 'orders');

@Injectable({ providedIn: 'root' })
export class RestaurantService {
  async getOrders(): Promise<RestaurantOrder[]> {
    const snapshot = await getDocs(ordersCollection);
    return snapshot.docs.map(document => this.mapOrder(document));
  }

  watchOrders(onOrders: (orders: RestaurantOrder[]) => void, onError: (error: Error) => void): Unsubscribe {
    return onSnapshot(
      ordersCollection,
      snapshot => onOrders(snapshot.docs.map(document => this.mapOrder(document))),
      onError
    );
  }

  async placeOrder(order: NewRestaurantOrder): Promise<void> {
    await addDoc(ordersCollection, {
      ...order,
      status: 'New',
      createdAt: new Date().toISOString(),
    });
  }

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
    await updateDoc(doc(db, 'orders', orderId), { status });
  }

  private mapOrder(document: { id: string; data: () => Record<string, unknown> }): RestaurantOrder {
    const data = document.data();
    return {
      id: document.id,
      customerName: String(data['customerName'] ?? ''),
      table: String(data['table'] ?? 'Takeaway'),
      items: Array.isArray(data['items']) ? data['items'] as RestaurantOrder['items'] : [],
      subtotal: Number(data['subtotal'] ?? 0),
      tax: Number(data['tax'] ?? 0),
      total: Number(data['total'] ?? 0),
      status: data['status'] as OrderStatus,
      createdAt: String(data['createdAt'] ?? ''),
    };
  }
}
