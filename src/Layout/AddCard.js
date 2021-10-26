import React, { useEffect } from "react";
import { readDeck } from "../utils/api";
import { useParams, Link } from "react-router-dom";
import NewCardForm from "./NewCardForm";

function AddCard({ deck, setDeck }) {
  const { deckId } = useParams();

  useEffect(() => {
    async function loadDeck() {
      const loadedDeck = await readDeck(deckId);
      setDeck(loadedDeck);
    }
    loadDeck();
  }, [deckId, setDeck]);

  if (!deck) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href={`/decks/${deck.id}`}>{deck.name}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Data
          </li>
        </ol>
      </nav>
      <h2>{deck.name}: New Card</h2>
      <div className="mt-3">
        <NewCardForm deck={deck} />
      </div>
    </div>
  );
}

export default AddCard;
