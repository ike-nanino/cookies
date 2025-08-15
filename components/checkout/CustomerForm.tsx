
// components/checkout/CustomerForm.tsx
"use client";
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { CustomerFormData } from '@/types/checkout';

interface CustomerFormProps {
  register: UseFormRegister<CustomerFormData>;
  errors: FieldErrors<CustomerFormData>;
  watchedCity?: string;
  deliveryFee: number;
}

export const CustomerForm = ({ register, errors, watchedCity, deliveryFee }: CustomerFormProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Delivery Information</h2>
      <p className="text-sm text-blue-600 mb-4">
        📍 We currently deliver only in Connecticut
      </p>
      
      <div className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              {...register('name')}
              className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.name && (
              <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              {...register('email')}
              className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Phone Number *
          </label>
          <input
            type="tel"
            {...register('phone')}
            className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.phone && (
            <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Address *
          </label>
          <input
            {...register('address')}
            className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Street address"
          />
          {errors.address && (
            <p className="text-xs text-red-600 mt-1">{errors.address.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              City *
            </label>
            <input
              {...register('city')}
              className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Danbury"
            />
            {errors.city && (
              <p className="text-xs text-red-600 mt-1">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              ZIP Code *
            </label>
            <input
              {...register('zipCode')}
              className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="06810"
            />
            {errors.zipCode && (
              <p className="text-xs text-red-600 mt-1">{errors.zipCode.message}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">
            Special Instructions
          </label>
          <textarea
            {...register('notes')}
            rows={2}
            className="w-full p-2 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Any special requests..."
          />
        </div>
      </div>

      {/* Delivery Fee Display */}
      {watchedCity && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            🚚 Delivery to {watchedCity}: <span className="font-semibold">${deliveryFee}</span>
          </p>
        </div>
      )}
    </div>
  );
};