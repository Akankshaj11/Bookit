import React, { useEffect, useState } from "react";
import Card from "../components/Card";

interface HomeProps {
  searchQuery: string;
}

interface Experience {
  _id: string; // changed from id → _id
  title: string;
  location: string;
  price: number;
  description: string;
  image: string;
  date?: string; // optional if not always present
}


const Home: React.FC<HomeProps> = ({ searchQuery }) => {
  const [cards, setCards] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ Fetch experiences dynamically from backend API
    fetch("http://localhost:5000/api/experiences")
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  // ✅ Filter experiences based on search query
  const filteredCards = cards.filter(
    (card) =>
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading experiences...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-[120px] py-15">
      <div className="grid grid-cols-4 gap-5">
        {filteredCards.map((card) => (
          <Card
  key={card._id}
  id={card._id}
  title={card.title}
  location={card.location}
  price={card.price.toString()}
  description={card.description}
  image={card.image}
/>

        ))}
      </div>
    </div>
  );
};

export default Home;
