import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFood_list] = useState([]);

  const backendUrl = "https://food-delivery-admin-5xwj.onrender.com/"
  const [token, setToken] = useState("");

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: 1,
      }));
    } else {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] + 1,
      }));
    }
    if (token) {
      await axios.post(backendUrl + "/api/cart/add", { itemId }, { headers: { token } })
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));
    if (token) {
      await axios.post(backendUrl + "/api/cart/remove", { itemId }, { headers: { token } })
    }
  };

  const removeAllItems = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: 0,
    }));
    // if (token) {
    //   await axios.post(backendUrl + "/api/cart/remove", { itemId }, { headers: { token } })
    // }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  }

  const getTotalCartItems = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalCount += cartItems[item];
      }
    }
    return totalCount;
  }

  const fetchFoodList = async () => {
    const response = await axios.get(backendUrl + '/api/food/list');
    setFood_list(response.data.data);
  }

  const loadCartData = async (token) => {
    const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } });
    console.log("cart data " + response)
    setCartItems(response.data.cartData);
  }

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      // console.log("local storage ka token"+localStorage.getItem("token"))
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"))
        await loadCartData(localStorage.getItem("token"));
        console.log("cart data load kar raha hoon"+localStorage.getItem("token"))
      }
    }
    loadData();
  }, [])

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    removeAllItems,
    getTotalCartAmount,
    getTotalCartItems,
    backendUrl,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
