import { Card, isShapeCard, Shape } from "../models/Card";
import ExploreCards from "../game-components/ExploreCards";
import { shuffleArray } from "../utils/shuffle";

export default class ExploreDeck {
    cards: Card[] = ExploreCards.slice();
    drawnCards: Card[] = []

    constructor() {
        this.shuffle();
    }

    public shuffle(): void {
        this.cards = shuffleArray(this.cards);
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

    public currentShapeHasCoin(shape: Shape): boolean {
        const currentCard = this.getCurrentCard();
        if (isShapeCard(currentCard) && currentCard.coinIndex !== undefined) {
            if (currentCard.shapes[currentCard.coinIndex] === shape) {
                return true;
            } 
        }
        return false;
    }
}