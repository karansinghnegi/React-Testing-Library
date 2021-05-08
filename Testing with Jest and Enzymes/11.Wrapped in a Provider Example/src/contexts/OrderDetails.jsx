import { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { pricePerItem } from '../constants/index';
import { formatCurrency } from '../utilities/index';

const OrderDetails = createContext();

// create custom hook to check whether we're inside a provider
export function useOrderDetails() {
    const context = useContext(OrderDetails);

    if (!context) {
        throw new Error(
            'userOrderDetails must be used within an OrderDetailsProvider'
        );
    }
    return context;
}

function calculateSubtotal(optionType, optionCounts) {
    let optionCount = 0;
    for (const count of optionCounts[optionType].values()) {
        optionCount += count;
    }

    return optionCount * pricePerItem[optionType];
}

// Creating a Provider

export function OrderDetailsProvider(props) {
    const [optionCounts, setOptionCounts] = useState({
        scoops: new Map(),
        toppings: new Map()
    });

    const zeroCurrency = formatCurrency(0);

    const [totals, setTotals] = useState({
        scoops: zeroCurrency,
        toppings: zeroCurrency,
        grandTotal: zeroCurrency
    });

    useEffect(() => {
        const scoopsSubtotal = calculateSubtotal('scoops', optionCounts);
        const toppingsSubtotal = calculateSubtotal('toppings', optionCounts);
        const grandTotal = scoopsSubtotal + toppingsSubtotal;

        setTotals({
            scoops: formatCurrency(scoopsSubtotal),
            toppings: formatCurrency(toppingsSubtotal),
            grandTotal: formatCurrency(grandTotal)
        });
    }, [optionCounts]);

    const value = useMemo(() => {
        // Setter function for my scoops/toppings
        function updateItemCounts(itemName, newItemCount, optionType) {
            const newOptionCounts = { ...optionCounts };

            // update option count for this item with the new value
            const optionCountsMap = optionCounts[optionType];
            optionCountsMap.set(itemName, parseInt(newItemCount));

            setOptionCounts(newOptionCounts);
        }

        // getter: object containing option counts for scoops and toppings, subtotal and total
        // setter: updateOptionCount
        return [{ ...optionCounts, totals }, updateItemCounts];
    }, [optionCounts, totals]);

    return <OrderDetails.Provider value={value} {...props} />;
}
