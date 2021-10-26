import React from "react";
import { useHistory } from "react-router-dom";

function Home() {
  const history = useHistory();

  function handleCreateDeck(event) {
    event.preventDefault();
    history.push("/decks/new");
  }
  //////////
  return (
    <div>
      <button
        type="button"
        className="btn btn-lg btn-primary"
        onClick={handleCreateDeck}
      >
        Create Deck
      </button>
    </div>
  );
}

export default Home;
