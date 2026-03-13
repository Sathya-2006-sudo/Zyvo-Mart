export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold">ZyvoMart</h3>
            <p className="mt-2 text-sm text-gray-300">
              Your one-stop shop for quality products at great prices.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="mt-2 space-y-2 text-sm text-gray-300">
              <li>
                <a href="/" className="hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-white">
                  Products
                </a>
              </li>
              <li>
                <a href="/cart" className="hover:text-white">
                  Cart
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold">Contact</h3>
            <p className="mt-2 text-sm text-gray-300">Email: support@zuvomart.com</p>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-sm text-gray-300">
          &copy; {new Date().getFullYear()} ZyvoMart. All rights reserved.
        </div>
      </div>
    </footer>
  )
}