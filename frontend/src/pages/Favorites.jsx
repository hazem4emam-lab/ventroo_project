import React, { useState } from "react";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  return (
    <div className="favorites-container">
      <h2>My Favorite Professionals</h2>

      {favorites.length === 0 ? (
        <p>You haven't added any favorites yet.</p>
      ) : (
        <div className="favorites-list">
          {favorites.map((favorite) => (
            <div key={favorite._id} className="favorite-card">
              <h3>
                {favorite.professional?.name || "Professional"}
              </h3>
              <p>
                {favorite.professional?.serviceCategory}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;