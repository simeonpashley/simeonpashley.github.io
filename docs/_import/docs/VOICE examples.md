
**Feature Messaging for Use Case A**:
```tsx
<section className="bg-gray-50 py-16">
  <div className="container mx-auto px-4 space-y-12">
    {/* Feature 1 */}
    <div className="flex flex-col md:flex-row items-center">
      <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
        <svg className="text-blue-600 w-8 h-8" fill="currentColor">
          {/* OMS Icon */}
        </svg>
      </div>
      <div className="md:ml-8 mt-4 md:mt-0 text-center md:text-left">
        <h3 className="text-2xl font-semibold text-gray-900">
          Multi-Channel Order Management
        </h3>
        <p className="mt-2 text-gray-600">
          Connect Amazon, Etsy, eBay, and more to manage orders, inventory, and fulfilment in one place.
        </p>
      </div>
    </div>

    {/* Feature 2 */}
    <div className="flex flex-col md:flex-row items-center">
      <div className="flex-shrink-0 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
        <svg className="text-green-600 w-8 h-8" fill="currentColor">
          {/* Fulfilment Icon */}
        </svg>
      </div>
      <div className="md:ml-8 mt-4 md:mt-0 text-center md:text-left">
        <h3 className="text-2xl font-semibold text-gray-900">
          Automated Fulfilment
        </h3>
        <p className="mt-2 text-gray-600">
          Automate fulfilment workflows with real-time stock updates and shipping integrations.
        </p>
      </div>
    </div>
  </div>
</section>
```

**Feature Messaging for Use Case B**:
```tsx
<section className="bg-white py-16">
  <div className="container mx-auto px-4 space-y-12">
    {/* Feature 1 */}
    <div className="flex flex-col md:flex-row items-center">
      <div className="flex-shrink-0 w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
        <svg className="text-orange-600 w-8 h-8" fill="currentColor">
          {/* Frontend Icon */}
        </svg>
      </div>
      <div className="md:ml-8 mt-4 md:mt-0 text-center md:text-left">
        <h3 className="text-2xl font-semibold text-gray-900">
          Customisable Storefront
        </h3>
        <p className="mt-2 text-gray-600">
          Build a customer-facing store that reflects your brand, with no coding required.
        </p>
      </div>
    </div>

    {/* Feature 2 */}
    <div className="flex flex-col md:flex-row items-center">
      <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
        <svg className="text-blue-600 w-8 h-8" fill="currentColor">
          {/* Migration Icon */}
        </svg>
      </div>
      <div className="md:ml-8 mt-4 md:mt-0 text-center md:text-left">
        <h3 className="text-2xl font-semibold text-gray-900">
          Effortless Migration
        </h3>
        <p className="mt-2 text-gray-600">
          Transition your data, products, and customers seamlessly from platforms like Shopify / Magento.
        </p>
      </div>
    </div>
  </div>
</section>
```

```tsx
<section className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-8">
  <div className="text-center">
    <h2 className="text-2xl font-bold">Ready to transform your business?</h2>
    <div className="mt-4 flex justify-center space-x-4">
      <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100">
        Start Free Trial
      </button>
      <button className="px-6 py-3 bg-white text-green-600 rounded-lg hover:bg-gray-100">
        Talk to Sales
      </button>
    </div>
  </div>
</section>
```

