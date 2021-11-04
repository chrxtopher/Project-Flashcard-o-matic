import React, { useState, useEffect } from "react";
import { listDecks, deleteDeck } from "../utils/api";
import { Link, useHistory } from "react-router-dom";

function DeckList() {
  const [decks, setDecks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function loadDecks() {
      const allDecks = await listDecks();
      setDecks(allDecks);
    }
    loadDecks();
  }, []);

  //////////////////
  //HANDLERS BELOW//
  //////////////////

  function handleDeleteDeck(deckId) {
    const certain = window.confirm(
      "Are you sure you want to delete this deck?"
    );

    if (certain) {
      deleteDeck(deckId);
      history.push("/");
      window.location.reload(false);
    }
  }

  const deckList = decks.map((deck) => {
    //maps each deck to have its own view and buttons in the list.

    const numberOfCards = () => {
      if (deck.cards.length === 1) {
        return `${deck.cards.length} card`;
      } else {
        return `${deck.cards.length} cards`;
      }
    };

    return (
      <div className="card mb-1">
        <div className="card-body">
          <div className="card-title">
            <h4>{deck.name}</h4>
            <div className="mb-3">
              <p className="float-right">{numberOfCards()}</p>
            </div>
          </div>
          <div className="card-text">{deck.description}</div>
          <div className="mt-1">
            <Link to={`/decks/${deck.id}`}>
              <button
                type="button"
                className="btn btn-secondary btn-sm border border-dark"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-eye-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                </svg>{" "}
                View
              </button>
            </Link>
            <Link to={`/decks/${deck.id}/study`}>
              <button
                type="button"
                className="btn btn-success btn-sm border border-dark ml-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="currentColor"
                  class="bi bi-book-half"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
                </svg>{" "}
                Study
              </button>
            </Link>
            <button
              type="button"
              className="btn btn-danger btn-sm border border-dark float-right ml-1"
              onClick={() => handleDeleteDeck(deck.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                class="bi bi-trash-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  });

  return <div className="my-3">{deckList}</div>;
}

export default DeckList;
