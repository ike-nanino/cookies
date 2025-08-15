// types/checkout.ts
import { z } from 'zod';

export const customerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  zipCode: z.string().min(5, 'ZIP code is required'),
  notes: z.string().optional(),
});

export type CustomerFormData = z.infer<typeof customerSchema>;

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}