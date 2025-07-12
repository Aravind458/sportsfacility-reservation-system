import { Phone, Mail, MapPin } from 'lucide-react';

const Header = () => {
  return (
    <div className="bg-blue-600 text-white py-2">
      <div className="container mx-auto px-4 flex flex-wrap justify-between items-center text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <Phone size={16} className="mr-2" />
            <span>+91 8519881965</span>
          </div>
          <div className="flex items-center">
            <Mail size={16} className="mr-2" />
            <span>admin@mrusportsfacility.com</span>
            
          </div>
          <div className="flex items-center">
              
              <b><p >Malla Reddy University</p></b>
          </div>
        </div>
        <div className="flex items-center">
          <MapPin size={16} className="mr-2" />
          <span>Malla Reddy University, Maisammaguda, Hyderabad, India</span>
        </div>
      </div>
    </div>
  );
};

export default Header;