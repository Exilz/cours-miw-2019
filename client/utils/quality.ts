import { QualityType } from '../components/ProductQualities';
import { IProduct } from '../pages/Product';

// Ces quelques helpers déterminent la qualité des produits insérés dans l'application.
// Les valeurs proviennent directement de l'application Yuka. La notation globale est cependant
// calculée d'une façon beaucoup plus "brute" afin de garder les choses assez simples.

type QualityGrades = 'excellent' | 'good' | 'average' | 'mediocre';
export function getQualityDetails (qualityType: QualityType, value: number): { quality: QualityGrades; label: string } {
    if (qualityType === 'calories') {
        if (value > 560) {
            return {
                quality: 'mediocre',
                label: 'Trop calorique'
            };
        } else  if (value > 360) {
            return {
                quality: 'average',
                label: 'Un peu trop calorique'
            };
        } else if (value > 160) {
            return {
                label:  'Faible impact',
                quality: 'good'
            };
        } else {
            return {
                label:  'Peu calorique',
                quality: 'excellent'
            };
        }
    }
    if (qualityType === 'fibers') {
        if (value > 3.5) {
            return {
                label:  'Excellente quantité',
                quality: 'excellent'
            };
        } else {
            return {
                label:  'Quelques fibres',
                quality: 'good'
            };
        }
    }
    if (qualityType === 'proteins') {
        if (value > 8) {
            return {
                label:  'Excellente quantité',
                quality: 'excellent'
            };
        } else {
            return {
                label:  'Quelques protéines',
                quality: 'good'
            };
        }
    }
    if (qualityType === 'salt') {
        if (value > 1.62) {
            return {
                label:  'Trop salé',
                quality: 'mediocre'
            };
        } else if (value > 0.92) {
            return {
                label:  'Un peu trop salé',
                quality: 'average'
            };
        } else if (value > 0.46) {
            return {
                label:  'Faible impact',
                quality: 'good'
            };
        } else {
            return {
                label:  'Peu de sel',
                quality: 'excellent'
            };
        }
    }
    if (qualityType === 'saturatedFats') {
        if (value > 7) {
            return {
                label:  'Trop gras',
                quality: 'mediocre'
            };
        } else if (value > 4) {
            return {
                label:  'Un peu trop gras',
                quality: 'average'
            };
        } else if (value > 2) {
            return {
                label:  'Quelques graisses sat.',
                quality: 'good'
            };
        } else {
            return {
                label:  'Peu de graisses sat.',
                quality: 'excellent'
            };
        }
    }
    if (qualityType === 'sugar') {
        if (value > 31) {
            return {
                label:  'Trop sucré',
                quality: 'mediocre'
            };
        } else if (value > 18) {
            return {
                label:  'Un peu trop sucré',
                quality: 'average'
            };
        } else if (value > 9) {
            return {
                label:  'Faible impact',
                quality: 'good'
            };
        } else {
            return {
                label:  'Peu de sucre',
                quality: 'excellent'
            };
        }
    }
    return { label: 'N/C', quality: 'excellent' };
};

export function getOverallQuality (product: IProduct): { label: QualityGrades; value: number; } {
    let score = 0;
    Object.keys(product.nutrition).forEach((qualityType: any) => {
        const qualityDetails = getQualityDetails(qualityType, (product.nutrition as any)[qualityType]);
        let scored;
        switch (qualityDetails.quality) {
            case 'excellent': scored = 3; break;
            case 'good': scored = 2; break;
            case 'average': scored = 1; break;
            case 'mediocre': scored = 0; break;
            default: scored = 0;
        }
        score += scored;
    });

    const value = Math.floor((100 * score) / (3 * Object.keys(product.nutrition).length));
    let label: QualityGrades;
    if (value >= 85) {
        label = 'excellent';
    } else if (value >= 70) {
        label = 'good';
    } else if (value >= 50) {
        label = 'average';
    } else {
        label = 'mediocre';
    }
    return { value, label };
}
