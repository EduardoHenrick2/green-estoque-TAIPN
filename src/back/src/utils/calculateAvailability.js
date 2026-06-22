function calculateAvailability(currentQuantity, minimumQuantity) {
    const current = Number(currentQuantity) || 0;
    const minimum = Number(minimumQuantity) || 0;

    if (current <= 0) {
        return 'Sem estoque';
    }

    if (current <= minimum) {
        return 'Baixo';
    }

    return 'Disponivel';
}

module.exports = calculateAvailability;
