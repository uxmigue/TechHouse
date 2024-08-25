import { createContext, useState } from "react";

export const CartContext = createContext();

export const Provider = ({children}) => {
    const [items, setItems] = useState([]);

    const addItem = (item) => {
        const productoExistente = items.some(i => i.id == item.id);
        if (productoExistente){
            const convertir = items.map(i => {
                if(i.id === item.id){
                    return {...i, quantity: i.quantity + item.quantity}
                } else {
                    return i;
                }
            });
            setItems(convertir);
        } else{
            setItems(prev => [...prev, {...item}])
        }
    }; 

    const reset = () => {
        setItems([]);
    };
    
    const removeItem = (id) => {
        const remove = items.filter((i) => i.id !== id)
        setItems(remove);
    };

    console.log(items);

    return  (
        <CartContext.Provider value={{items, addItem, reset, removeItem}}>
            {children}
        </CartContext.Provider>
    );
};