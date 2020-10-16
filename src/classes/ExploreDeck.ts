import { Card } from "../models/Card";
import ExploreCards from "../models/ExploreCards";

export default class ExploreDeck {
    cards: Card[] = ExploreCards.slice();
    drawnCards: Card[] = []

    constructor() {
        this.shuffle();
        this.draw();
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

    public reset(): void {
        this.cards = this.cards.concat(this.drawnCards);
        this.drawnCards = []
        this.shuffle();
    }

    public getCurrentCard(): Card {
        return this.drawnCards[this.drawnCards.length - 1]
    }

    public getPreviousCards(): Card[] {
        return this.drawnCards.slice(0, this.drawnCards.length - 1);
    }

    public getTotalTime(): number {
        return this.drawnCards.reduce((total: number, card: Card) => total + card.time, 0)
    }
}