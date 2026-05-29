import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState("")
    const [food_list, setFoodList] = useState([])
    const url = "https://food-del-backend-dfop.onrender.com"

    const handleCartItems = async (authToken) => {
        try {
            const response = await axios.get(`${url}/api/cart/`, { headers: { token: authToken } })
            if (response.data.success) {
                setCartItems(response.data.CartItems || {})
            }
        } catch (error) {
            console.error(error)
        }
    }

    const addToCart = async (id) => {
        const activeToken = token || localStorage.getItem("token");
        if (!activeToken) return;
        
        setCartItems((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));

        try {
            const response = await axios.post(url + "/api/cart/add", { item_id: id }, { headers: { token: activeToken } })
            if (response.data.success && response.data.CartItems) {
                setCartItems(response.data.CartItems)
            }
        } catch (error) {
            console.error("Error adding to cart:", error)
        }
    }

    const removeFromCart = async (id) => {
        const activeToken = token || localStorage.getItem("token");
        if (!activeToken) return;

        setCartItems((prev) => {
            const updated = { ...prev };
            if (updated[id] > 0) updated[id] -= 1;
            return updated;
        });

        try {
            const response = await axios.post(url + "/api/cart/remove", { item_id: id }, { headers: { token: activeToken } })
            if (response.data.success && response.data.CartItems) {
                setCartItems(response.data.CartItems)
            }
        } catch (error) {
            console.error("Error removing from cart:", error)
        }
    }

    const fetchFoodList = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`)
            if (response.data.success) {
                setFoodList(response.data.data)
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const loadData = async () => {
            await fetchFoodList();
            const localToken = localStorage.getItem("token")
            if (localToken) {
                setToken(localToken)
                await handleCartItems(localToken);
            }
        }
        loadData();
    }, [])

    const totalPriceOfItems = () => {
        let total = 0;
        if (!Array.isArray(food_list) || food_list.length === 0) return total;

        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let food_info = food_list.find((product) => product._id === item);
                if (food_info && food_info.price) {
                    total += (food_info.price * cartItems[item]);
                }
            }
        }
        return total;
    }

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        totalPriceOfItems,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
