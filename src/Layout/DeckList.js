import React, { useState, useEffect } from "react";
import { listDecks } from "../utils/api";
import { useHistory } from "react-router-dom";

function DeckList() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    async function loadDecks() {
      const allDecks = await listDecks();
      setDecks(allDecks);
    }
    loadDecks();
  }, []);

  const handleViewClick = () => {
    ///
  };

  const deckList = decks.map((deck) => {
    return (
      <div className="card mb-1">
        <div className="card-body">
          <div className="card-title">
            <h4>{deck.name}</h4>
          </div>
          <div className="card-text">{deck.description}</div>
          <div className="mt-1">
            <button
              type="button"
              className="btn btn-secondary btn-sm border border-dark"
            >
              View
            </button>
            <button
              type="button"
              className="btn btn-success btn-sm border border-dark ml-1"
            >
              Study
            </button>
            <button
              type="button"
              className="btn btn-danger btn-sm border border-dark float-right ml-1"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  });
  return <div className="mt-3">{deckList}</div>;
}

export default DeckList;
