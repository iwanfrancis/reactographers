import { Card } from "../constants/Card";
import ShapeCards from "../constants/ShapeCards";

export default class ExploreDeck {
    cards: Card[] = ShapeCards.slice();
    drawnCards: Card[] = []

    constructor() {
        this.shuffle();
    }

    public shuffle(): void {
        const cards = this.cards;
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
    }

    public draw(): Card {
        const drawnCard = this.cards.pop();
        if (drawnCard) {
            this.drawnCards.push(drawnCard);
            return drawnCard
        } else {
            return this.drawnCards[this.drawnCards.length - 1];
        }
        
    }
}