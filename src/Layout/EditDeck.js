import React, { useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
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
  //////////////////
  //HANDLERS BELOW//
  //////////////////

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

  ////////////////
  //RETURN BELOW//
  ////////////////

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <Link to="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                class="bi bi-house-door-fill"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z" />
              </svg>{" "}
              Home
            </Link>
          </li>
          <li class="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
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
    </div>
  );
}

export default EditDeck;
