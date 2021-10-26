import React, { useEffect } from "react";
import { readDeck } from "../utils/api";
import { useParams } from "react-router-dom";
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

  return (
    <div>
      <h2>{deck.name}: New Card</h2>
      <div className="mt-3">
        <NewCardForm deck={deck} />
      </div>
    </div>
  );
}

export default AddCard;
