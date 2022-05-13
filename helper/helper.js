export const helper = context => ({
    toCurrency(n) {
        if (isNaN(n)) {
            return n;
        }
        return `IDR ${n
            .toFixed(2)
            .replace(/\./g, ',')
            .replace(/\d(?=(\d{3})+,)/g, '$&.')}`;
    },
})