import React from "react";
import Card from "../components/Card";
import sampleImg from "../assets/pic.png";

interface HomeProps {
  searchQuery: string;
}

const Home: React.FC<HomeProps> = ({ searchQuery }) => {
  const cards = [
    { id: "1", title: "Malpe Beach", location: "Udupi", price: "999", description: "A serene beach with golden sands and calm waters.", image: sampleImg },
    { id: "2", title: "St. Mary's Island", location: "Udupi", price: "1299", description: "Famous for its unique hexagonal basalt rock formations.", image: sampleImg },
    { id: "3", title: "Kaup Lighthouse", location: "Udupi", price: "799", description: "A stunning lighthouse with panoramic coastal views.", image: sampleImg },
    { id: "4", title: "Delta Point", location: "Udupi", price: "899", description: "Beautiful river meeting point with scenic backwaters.", image: sampleImg },
    { id: "5", title: "Kodi Bengre", location: "Udupi", price: "1099", description: "A peaceful estuary with beautiful sunset views.", image: sampleImg },
    { id: "6", title: "Maravanthe Beach", location: "Udupi", price: "1199", description: "Where the beach meets the highway — a scenic marvel.", image: sampleImg },
    { id: "7", title: "Manipal Lake", location: "Udupi", price: "699", description: "Relaxing lakeside spot with greenery all around.", image: sampleImg },
    { id: "8", title: "End Point Park", location: "Udupi", price: "499", description: "A calm viewpoint offering stunning valley views.", image: sampleImg },
  ];

  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    card.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen px-[120px] py-15">
      <div className="grid grid-cols-4 gap-5">
        {filteredCards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            title={card.title}
            location={card.location}
            price={card.price}
            description={card.description}
            image={card.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
