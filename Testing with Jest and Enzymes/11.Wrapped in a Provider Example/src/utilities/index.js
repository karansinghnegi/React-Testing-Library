// format number as currency
export function formatCurrency(amount) {
    return new Intl.NumberFormat('en-Us', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(amount);
}
