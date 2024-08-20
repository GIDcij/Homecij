import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

const Home = () => {
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    const fetchButtons = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'buttons'));
        const buttonsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setButtons(buttonsData);
      } catch (e) {
        console.error("Error fetching buttons: ", e);
        alert('Failed to fetch buttons.');
      }
    };
    fetchButtons();
  }, []);

  return (
    <div className="home-container">
      <div className="button-list">
        {buttons.length > 0 ? (
          buttons.map(button => (
            <div key={button.id} className="button-item" onClick={() => window.open(`http://${button.ip}`, '_blank')}>
              <img src={button.logo || 'default-logo.png'} alt={button.name} />
              <h2>{button.name}</h2>
            </div>
          ))
        ) : (
          <p>No hay botones aun</p>
        )}
      </div>
    </div>
  );
};

export default Home;
