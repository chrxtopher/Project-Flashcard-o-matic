import React from "react";
import { useHistory } from "react-router-dom";
import DeckList from "./DeckList";

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
        className="btn btn-lg btn-primary border border-dark"
        onClick={handleCreateDeck}
      >
        Create New Deck
      </button>
      <DeckList />
    </div>
  );
}

export default Home;
