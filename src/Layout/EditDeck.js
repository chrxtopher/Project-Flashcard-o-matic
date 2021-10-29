import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

function EditDeck({ deck, setDeck }) {
  const { deckId } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function loadDeck() {
      const currentDeck = await readDeck(deckId);
      setDeck(currentDeck);
    }
    loadDeck();
  }, [deckId, setDeck]);

  if (!deck) {
    return <h1>Loading deck information...</h1>;
  }

  const handleDeckNameChange = (event) => {
    setDeck({ ...deck, name: event.target.value });
  };

  const handleDeckDescChange = (event) => {
    setDeck({ ...deck, description: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateDeck(deck).then(() => history.push(`/decks/${deckId}`));
  };

  return (
    <div>
      <h2 className="display-4">Edit Deck</h2>
      <form>
        <div className="form-group">
          <label for="deckName">Name</label>
          <input
            type="text"
            className="form-control"
            id="deckName"
            value={deck.name}
            onChange={handleDeckNameChange}
          />
        </div>
        <div className="form-group">
          <label for="deckDescription">Description</label>
          <textarea
            className="form-control"
            id="deckDescription"
            rows="3"
            value={deck.description}
            onChange={handleDeckDescChange}
          ></textarea>
        </div>
        <a
          className="btn btn-danger border border-dark"
          href={`/decks/${deckId}`}
          role="button"
        >
          Cancel
        </a>
        <button
          type="submit"
          className="btn btn-primary ml-1 border border-dark"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default EditDeck;
