import React from "react";

function CreateDeck() {
  return (
    <div>
      <h1 className="display-4">Create Deck</h1>
      <form>
        <div className="form-group">
          <label for="deckName">Name</label>
          <input
            type="text"
            className="form-control"
            id="deckName"
            placeholder="Enter a name for your new deck"
          />
        </div>
        <div className="form-group">
          <label for="deckDescription">Description</label>
          <textarea
            className="form-control"
            id="deckDescription"
            rows="3"
            placeholder="Brief description of the deck"
          ></textarea>
        </div>
        <a className="btn btn-outline-danger" href="/" role="button">
          Cancel
        </a>
        <button type="submit" className="btn btn-primary ml-2">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;
