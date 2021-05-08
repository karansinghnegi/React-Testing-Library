import { useOrderDetails } from '../../contexts/OrderDetails';
import Options from './Options';

export default function OrderEntry() {
    const [OrderDetails] = useOrderDetails();
    return (
        <div>
            <Options optionType="scoops" />
            <Options optionType="toppings" />
            <h2>Grand total: {OrderDetails.totals.grandTotal}</h2>
        </div>
    );
}
