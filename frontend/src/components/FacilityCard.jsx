import PropTypes from 'prop-types';

const FacilityCard = ({ facility, onBook }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
                src={facility.image} // Now from MongoDB
                alt={facility.name} 
                className="w-full h-48 object-cover" 
            />
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{facility.name}</h3>
                <p className="text-gray-600 mb-2">{facility.description}</p>
                <p className="text-gray-800 font-medium mb-2">₹{facility.pricePerHour}/hour</p>
                <p className="text-gray-600 mb-4">Available: {facility.hours}</p>
                <button
                    onClick={() => onBook(facility)}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                    Book Now
                </button>
            </div>
        </div>
    );
};

FacilityCard.propTypes = {
    facility: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        pricePerHour: PropTypes.number.isRequired,
        hours: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
    }).isRequired,
    onBook: PropTypes.func.isRequired,
};

export default FacilityCard;