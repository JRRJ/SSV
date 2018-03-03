import { Star } from './star';
import { Planet } from './planet';

export interface SystemDetails {
    star: Star;
    planets: Planet[];
}
