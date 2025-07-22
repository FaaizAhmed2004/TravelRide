import Link from "next/link"

const footerLinks = {
  destinations: ["Canada", "Alaska", "France", "Iceland"],
  activities: ["Northern Lights", "Cruising & sailing", "Multi-activities", "Kayaking"],
  blogs: ["Bali Travel Guide", "Sri Lanka Travel Guide", "Peru Travel Guide", "Bali Travel Guide"],
  about: ["Our Story", "Work with us"],
  contact: ["Our Story", "Work with us"],
}

export function Footer() {
  return (
    <footer className="bg-[#8dd3bb] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold text-gray-900 mb-4">golobe</div>
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">f</span>
              </div>
              <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">t</span>
              </div>
              <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">in</span>
              </div>
              <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">@</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Our Destinations</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              {footerLinks.destinations.map((link, index) => (
                <li key={index}>
                  <Link href="#" className="hover:text-gray-900">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Our Activities</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              {footerLinks.activities.map((link, index) => (
                <li key={index}>
                  <Link href="#" className="hover:text-gray-900">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Travel Blogs</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              {footerLinks.blogs.map((link, index) => (
                <li key={index}>
                  <Link href="#" className="hover:text-gray-900">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">About Us</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              {footerLinks.about.map((link, index) => (
                <li key={index}>
                  <Link href="#" className="hover:text-gray-900">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-semibold text-gray-900 mb-4 mt-6">Contact Us</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              {footerLinks.contact.map((link, index) => (
                <li key={index}>
                  <Link href="#" className="hover:text-gray-900">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default Footer