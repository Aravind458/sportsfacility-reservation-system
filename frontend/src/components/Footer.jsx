import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-300">
              We provide top-quality sports facilities for athletes and fitness enthusiasts.
              Our mission is to promote health and wellness through sports.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/facilities" className="text-gray-300 hover:text-white">Facilities</a></li>
              <li><a href="/bookings" className="text-gray-300 hover:text-white">My Bookings</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-white">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Operating Hours</h3>
            <ul className="text-gray-300">
              <li>Monday - Friday: 6:00 AM - 10:00 PM</li>
              <li>Saturday: 7:00 AM - 9:00 PM</li>
              <li>Sunday: 8:00 AM - 8:00 PM</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400"><Facebook /></a>
              <a href="#" className="hover:text-blue-400"><Twitter /></a>
              <a href="#" className="hover:text-blue-400"><Instagram /></a>
              <a href="#" className="hover:text-blue-400"><Youtube /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2025 Sports Facility Reservation System. <br />All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;