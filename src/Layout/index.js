import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import CreateDeck from "./CreateDeck";
import Deck from "./Deck";
import AddCard from "./AddCard";
import EditDeck from "./EditDeck";
import EditCard from "./EditCard";
import Study from "./Study";

function Layout() {
  const [deck, setDeck] = useState();
  const [card, setCard] = useState();

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route exact path="/decks/:deckId/edit">
            <EditDeck deck={deck} setDeck={setDeck} />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <AddCard deck={deck} setDeck={setDeck} />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard
              card={card}
              deck={deck}
              setCard={setCard}
              setDeck={setDeck}
            />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
