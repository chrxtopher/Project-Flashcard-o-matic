import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";

function CreateDeck() {
  const [newDeck, setNewDeck] = useState({});
  const history = useHistory();

  const handleDeckNameChange = (event) => {
    setNewDeck({ ...newDeck, name: event.target.value });
  };

  const handleDeckDescChange = (event) => {
    setNewDeck({ ...newDeck, description: event.target.value });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await createDeck(newDeck);
    history.push(`/decks/${response.id}`);
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">Home</a>
          </li>
          <li className="breadcrumb-item active">Create Deck</li>
        </ol>
      </nav>
      <h1 className="display-4">Create Deck</h1>
      <form>
        <div className="form-group">
          <label for="deckName">Name</label>
          <input
            type="text"
            className="form-control"
            id="deckName"
            placeholder="Enter a name for your new deck"
            onChange={handleDeckNameChange}
          />
        </div>
        <div className="form-group">
          <label for="deckDescription">Description</label>
          <textarea
            className="form-control"
            id="deckDescription"
            rows="3"
            placeholder="Brief description of the deck"
            onChange={handleDeckDescChange}
          ></textarea>
        </div>
        <a className="btn btn-danger border border-dark" href="/" role="button">
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

export default CreateDeck;
